import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Chat) private readonly chatRepository: typeof Chat ) {}

  async createMessage(msgDto: MessageDto): Promise<Chat> {
    const { username, msg } = msgDto;

    const new_msg = await this.chatRepository.create({ username, msg });
    return new_msg;
  }

  async getMessages(): Promise<Chat[]> {
    return await this.chatRepository.findAll();
  }
}
