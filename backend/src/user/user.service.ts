import { Injectable } from '@nestjs/common';
import type { User as TelegramUser } from '@tma.js/init-data-node';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(user: TelegramUser) {
    let userInDb = await this.prisma.user.findUnique({
      where: { telegram_id: String(user.id) },
    });

    if (!userInDb) {
      console.log(`Пользователь с id ${user.id} не найден`);

      userInDb = await this.prisma.user.create({
        data: {
          telegram_id: String(user.id),
          username: user.username || null,
          first_name: user.first_name || null,
          last_name: user.last_name || null,
          language: user.language_code || 'en',
          avatar: user.photo_url || null,
        },
      });
    } else {
      console.log(`Пользователь с tg: ${user.id} в базе по id: ${userInDb.id}`);
    }
    return userInDb;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
