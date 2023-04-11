import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Chat) private readonly chatRepository: typeof Chat,
  ) {}

  async createMessage(chat: Chat): Promise<Chat> {
    console.log('chat: ', chat);
    const msg = await this.chatRepository.create(chat);
    return msg;
  }

  async getMessages(): Promise<Chat[]> {
    return await this.chatRepository.findAll();
  }
}
