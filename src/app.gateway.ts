import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { AppService } from './app.service';
import { Chat } from './chat.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private appService: AppService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendmessage')
  async handleSendMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const payload: Chat = JSON.parse(data);
    console.log('payload: ', payload);
    await this.appService.createMessage(payload);
    this.server.emit('recMessage', payload);
  }

  afterInit(server: Server) {
    console.log('Server has been initialized.');
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }
}
