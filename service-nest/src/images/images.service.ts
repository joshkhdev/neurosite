import { Injectable } from '@nestjs/common';
import { UploadImageDto } from './models/upload-image.dto';
import { Image } from './models/image.entity';
import { v4 } from 'uuid';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: EntityRepository<Image>,
    private readonly em: EntityManager,
  ) {}

  public findAll(): Observable<Image[]> {
    return from(this.imagesRepository.findAll());
  }

  public findAllByEntityId(entityId: string): Observable<Image[]> {
    return from(this.imagesRepository.find({ entityId }));
  }

  public findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  public create(uploadImageDto: UploadImageDto, filename: string) {
    const image = new Image();
    image.imageUuid = v4();
    image.filename = filename;

    wrap(image).assign(uploadImageDto, { em: this.em });

    return from(this.em.persistAndFlush(image)).pipe(map(() => image));
  }

  public remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
