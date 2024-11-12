import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppInfoDto } from './shared/dto/app-info.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get app info' })
  public getInfo(): AppInfoDto {
    return this.appService.getInfo();
  }
}
