import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { UploadImageDto } from './models/upload-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  public create(@Body() createImageDto: UploadImageDto) {
    // return this.imagesService.create(createImageDto);
  }

  @Get()
  public findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
