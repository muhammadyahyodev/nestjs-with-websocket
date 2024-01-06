import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Chat) private readonly chatRepository: typeof Chat ) {}

  async createMessage(messageDto: MessageDto): Promise<Chat> {
    
    const msg = await this.chatRepository.create(messageDto);
    return msg;
  }

  async getMessages(): Promise<Chat[]> {
    return await this.chatRepository.findAll();
  }
}
