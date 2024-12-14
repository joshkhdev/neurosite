import { IsEnum, IsUUID } from 'class-validator';
import { ImageType } from './image.interfaces';

export class UploadImageDto {
  @IsUUID()
  public readonly entityId: string;

  @IsEnum(ImageType)
  public readonly type: ImageType;
}
