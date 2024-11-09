import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get app info' })
  @ApiOkResponse({
    description: 'App info',
    type: String,
  })
  public getInfo(): string {
    return this.appService.getInfo();
  }
}
