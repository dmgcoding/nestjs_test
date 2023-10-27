import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMyDetails(@GetUser() user: User) {
    return this.userService.getMyDetails(user);
  }

  @Patch('edit')
  editUser(@GetUser('id') id: number, @Body() dto: EditUserDto) {}
}
