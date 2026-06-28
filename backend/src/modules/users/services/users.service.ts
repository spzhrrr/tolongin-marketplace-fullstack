import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly repo: UsersRepository,
    private readonly prisma: PrismaService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getPublicProfile(id: string) {
    const u = await this.repo.findById(id);
    if (!u) throw new NotFoundException('User not found');

    let skillsArray: string[] = [];
    try {
      if (typeof u.skills === 'string') {
        skillsArray = JSON.parse(u.skills);
      } else if (Array.isArray(u.skills)) {
        skillsArray = u.skills;
      }
    } catch (e) {
      skillsArray = [];
    }

    const { password, emailOtpHash, phoneOtpHash, ...rest } = u as any;

    return {
      ...rest,
      skills: skillsArray,
<<<<<<< HEAD
=======
      email: isOwner ? rest.email : undefined,
      phone: isOwner ? rest.phone : undefined,
      balance: isOwner ? rest.balance : undefined,
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
    };
  }
  async update(userId: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.update(userId, dto);
  }

  async getServices(id: string) {
    const services = await this.repo.findServices(id);
    return services.map((s) => {
      let imagesArray: string[] = [];
      try {
        if (typeof s.images === 'string') {
          imagesArray = JSON.parse(s.images);
        } else if (Array.isArray(s.images)) {
          imagesArray = s.images;
        }
      } catch (e) {
        imagesArray = [];
      }

      return {
        ...s,
        images: imagesArray,
        image: imagesArray[0] || null,
      };
    });
  }

  async getReviews(id: string) {
    const reviews = await this.repo.findReviews(id);
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    return {
      reviews: reviews.map((r) => {
        let imagesArray: string[] = [];
        try {
          if (typeof r.images === 'string') {
            imagesArray = JSON.parse(r.images);
          } else if (Array.isArray(r.images)) {
            imagesArray = r.images;
          }
        } catch (e) {
          imagesArray = [];
        }

        return {
          ...r,
          images: imagesArray,
        };
      }),
      rating: avgRating,
      reviewCount: reviews.length,
    };
  }

  async getUserJobs(userId: string) {
    return this.repo.findJobsByUserId(userId);
  }

  async getCompleteProfile(id: string) {
    const userData = await this.repo.findUserWithAllData(id);
    if (!userData) throw new NotFoundException('User not found');

    const reviews = userData.reviews || [];
    const totalRating = reviews.reduce(
      (sum: number, r: any) => sum + r.rating,
      0,
    );
    const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    return {
      ...userData,
      rating: avgRating,
      reviewCount: reviews.length,
      services: userData.services || [],
      jobs: userData.jobs || [],
      reviews: reviews.map((r: any) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
        reviewer: r.reviewer,
        serviceTitle: r.order?.service?.title || null,
      })),
    };
  }
}
