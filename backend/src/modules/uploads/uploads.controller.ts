import {
  BadRequestException,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import * as path from 'path';
import { promises as fs } from 'fs';

const UPLOAD_ROOT = path.resolve(process.cwd(), 'uploads');
const ALLOWED_FOLDERS = new Set([
  'avatars',
  'services',
  'work-proofs',
  'kyc',
  'chat',
  'portfolio',
  'general',
]);
const EXTENSIONS: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
};
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;

function hasValidSignature(buffer: Buffer, mime: string): boolean {
  if (mime === 'image/jpeg') return buffer[0] === 0xff && buffer[1] === 0xd8;
  if (mime === 'image/png')
    return buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    );
  if (mime === 'image/webp')
    return (
      buffer.subarray(0, 4).toString() === 'RIFF' &&
      buffer.subarray(8, 12).toString() === 'WEBP'
    );
  if (mime === 'application/pdf')
    return buffer.subarray(0, 5).toString() === '%PDF-';
  return false;
}

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (_req, _file, cb) => {
          const tmpDir = path.join(UPLOAD_ROOT, '_tmp');
          try {
            await fs.mkdir(tmpDir, { recursive: true });
            cb(null, tmpDir);
          } catch (error) {
            cb(error as Error, tmpDir);
          }
        },
        filename: (_req, file, cb) => {
          const extension = EXTENSIONS[file.mimetype];
          if (!extension) return cb(new Error('Unsupported file type'), '');
          cb(null, randomUUID() + extension);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (EXTENSIONS[file.mimetype]) return cb(null, true);
        cb(
          new BadRequestException(
            'Format file harus JPG, PNG, WebP, atau PDF',
          ),
          false,
        );
      },
      limits: { fileSize: MAX_DOCUMENT_BYTES, files: 1 },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder = 'general',
  ) {
    if (!file) throw new BadRequestException('File wajib dipilih');
    if (!ALLOWED_FOLDERS.has(folder)) {
      await fs.unlink(file.path).catch(() => undefined);
      throw new BadRequestException('Folder upload tidak valid');
    }

    const pdfAllowed = ['work-proofs', 'chat', 'kyc', 'general'].includes(folder);
    if (file.mimetype === 'application/pdf' && !pdfAllowed) {
      await fs.unlink(file.path).catch(() => undefined);
      throw new BadRequestException('Folder ini hanya menerima gambar');
    }
    if (file.mimetype !== 'application/pdf' && file.size > MAX_IMAGE_BYTES) {
      await fs.unlink(file.path).catch(() => undefined);
      throw new BadRequestException('Ukuran gambar maksimal 5 MB');
    }

    const handle = await fs.open(file.path, 'r');
    const signature = Buffer.alloc(12);
    try {
      await handle.read(signature, 0, signature.length, 0);
    } finally {
      await handle.close();
    }
    if (!hasValidSignature(signature, file.mimetype)) {
      await fs.unlink(file.path).catch(() => undefined);
      throw new BadRequestException('Isi file tidak sesuai dengan formatnya');
    }

    const finalDir = path.join(UPLOAD_ROOT, folder);
    await fs.mkdir(finalDir, { recursive: true });
    const finalPath = path.join(finalDir, file.filename);
    await fs.rename(file.path, finalPath).catch(async () => {
      await fs.copyFile(file.path, finalPath);
      await fs.unlink(file.path).catch(() => undefined);
    });

    const fileUrl = '/api/uploads/' + folder + '/' + file.filename;
    return {
      url: fileUrl,
      filename: file.filename,
      originalName: path.basename(file.originalname),
      size: file.size,
      mimetype: file.mimetype,
      folder,
    };
  }
}