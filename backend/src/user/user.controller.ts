import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ReqUser, type TUser } from './user.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findOne(@ReqUser() user: TUser) {
    return this.userService.findOne(user.telegramId);
  }

  @Patch()
  update(@ReqUser() user: TUser, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }
}
