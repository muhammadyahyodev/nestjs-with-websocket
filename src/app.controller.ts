import { Controller, Render, Get, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/chat')
  @Render('model')
  Home() {
    return { message: 'Hello world!' };
  }

  @Get('/api/chat')
  async Chat(@Res({ passthrough: true }) res) {
    return await this.appService.getMessages();
  }

  @Get('public/*')
  async GetStaticContent(@Res({ passthrough: true }) res, @Req() req) {
    return res.sendFile(req.url, { root: 'public' });
  }
}
