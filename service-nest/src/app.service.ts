import { Injectable } from '@nestjs/common';
import { AppInfoDto } from './shared/models/app-info.dto';

@Injectable()
export class AppService {
  public getInfo(): AppInfoDto {
    return new AppInfoDto('0.0.1');
  }
}
