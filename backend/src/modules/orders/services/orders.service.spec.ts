import { BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ORDER_STATUS, ROLE } from '../../../common/constants/enums';

describe('OrdersService escrow state machine', () => {
  const baseOrder = {
    id: 'order-1',
    buyerId: 'buyer-1',
    sellerId: 'seller-1',
    title: 'Desain identitas merek',
    amount: 500000,
    fee: 25000,
    totalAmount: 525000,
    status: ORDER_STATUS.WAITING_REVIEW,
    escrowStatus: 'AWAITING_APPROVAL',
    workSubmission: JSON.stringify({
      note: 'Semua file final telah dilampirkan.',
      attachments: ['/api/uploads/work-proofs/proof.pdf'],
    }),
    workSubmittedAt: new Date(),
    workSubmissionDate: new Date(),
    workSubmissionFiles: JSON.stringify([
      '/api/uploads/work-proofs/proof.pdf',
    ]),
    timeline: '[]',
    fundsReleasedAt: null,
  };

  function setup(order = { ...baseOrder }) {
    const repo = {
      findById: jest.fn().mockResolvedValue(order),
      update: jest.fn(async (_id, data) => ({ ...order, ...data })),
    };
    const tx = {
      order: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        findUniqueOrThrow: jest
          .fn()
          .mockResolvedValue({ ...order, status: ORDER_STATUS.COMPLETED }),
      },
      user: { update: jest.fn().mockResolvedValue({}) },
    };
    const prisma = {
      $transaction: jest.fn((callback) => callback(tx)),
    };
    const notifications = {
      notify: jest.fn().mockResolvedValue({ id: 'notification-1' }),
    };
    const service = new OrdersService(
      repo as any,
      {} as any,
      {} as any,
      notifications as any,
      prisma as any,
      {} as any,
    );
    return { service, repo, prisma, tx, notifications };
  }

  it('releases escrow once only after submitted work is approved', async () => {
    const { service, tx } = setup();

    const result = await service.approveWork(
      baseOrder.id,
      baseOrder.buyerId,
      ROLE.USER,
    );

    expect(result.status).toBe(ORDER_STATUS.COMPLETED);
    expect(tx.order.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ fundsReleasedAt: null }),
      }),
    );
    expect(tx.user.update).toHaveBeenCalledWith({
      where: { id: baseOrder.sellerId },
      data: { balance: { increment: baseOrder.amount } },
    });
  });

  it('does not release escrow without a work submission', async () => {
    const { service } = setup({
      ...baseOrder,
      workSubmission: null,
      workSubmittedAt: null,
      workSubmissionDate: null,
    });

    await expect(
      service.approveWork(baseOrder.id, baseOrder.buyerId, ROLE.USER),
    ).rejects.toThrow('sebelum penjual mengirim bukti kerja');
  });

  it('requires at least one uploaded proof', async () => {
    const { service } = setup({
      ...baseOrder,
      status: ORDER_STATUS.PAID,
      workSubmission: null,
      workSubmittedAt: null,
      workSubmissionDate: null,
    });

    await expect(
      service.submitWork(baseOrder.id, baseOrder.sellerId, ROLE.USER, {
        note: 'Pekerjaan sudah selesai seluruhnya.',
        attachments: [],
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('moves rejected work to REJECTED while keeping escrow funded', async () => {
    const { service, repo } = setup();

    await service.rejectWork(baseOrder.id, baseOrder.buyerId, ROLE.USER, {
      reason: 'Warna halaman utama belum sesuai brief.',
    });

    expect(repo.update).toHaveBeenCalledWith(
      baseOrder.id,
      expect.objectContaining({
        status: ORDER_STATUS.REJECTED,
        escrowStatus: 'FUNDED',
      }),
    );
  });
});