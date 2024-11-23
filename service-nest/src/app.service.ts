import { Injectable } from '@nestjs/common';
import { AppInfoDto } from './shared/models/app-info.dto';

@Injectable()
export class AppService {
  public getInfo(): AppInfoDto {
    return {
      version: '0.0.1',
    };
  }
}
