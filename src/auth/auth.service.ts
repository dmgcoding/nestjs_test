import { ForbiddenException, Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);

    try {
      // const user = await this.prisma.user.create({
      //   data: {
      //     name: dto.name,
      //     username: dto.email,
      //     storeName: dto.storeName,
      //     hash,
      //   },
      // });
      // delete user.hash;
      return 'user';
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw error;
      }
      throw error;
    }
  }

  async signin(dto: SigninDto) {
    return dto;
  }
}
