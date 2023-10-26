import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getMyDetails() {
    return 'user';
  }
}
