import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getMyDetails(user: User) {
    return user;
  }

  async editUser(userId: number, body: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...body,
      },
    });
    delete user.hash;
    return user;
  }
}
