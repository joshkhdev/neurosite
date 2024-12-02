import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  @IsOptional()
  public readonly content?: string = '';

  @IsBoolean()
  @IsOptional()
  public readonly isPublic?: boolean = false;
}
