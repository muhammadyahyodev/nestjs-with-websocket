import { SubscribeMessage, WebSocketGateway, OnGatewayInit, 
         WebSocketServer, OnGatewayConnection, OnGatewayDisconnect,
         MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private appService: AppService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendmessage')
  async handleSendMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket ) {
    await this.appService.createMessage(data);
    this.server.emit('recMessage', data);
  }

  afterInit(server: Server) {
    console.log('Server has been initialized.');
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }
}
