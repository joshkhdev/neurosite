import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsOptional()
  public content?: string = '';

  @IsBoolean()
  @IsOptional()
  public isPublic?: boolean = false;
}
