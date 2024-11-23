import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string = '';

  @IsBoolean()
  @IsOptional()
  public?: boolean = false;
}
