import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(telegram_id: number = 0) {
    const user = await this.prisma.user.findUnique({
      where: { telegram_id: String(telegram_id) },
    });

    if (!user) {
      throw new NotFoundException(`Пользователь ${telegram_id} не найден`);
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
