import { Enum, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { ImageType } from './image.interfaces';

export class Image {
  @PrimaryKey({ type: 'uuid' })
  public imageUuid: string;

  @Index()
  @Property({ type: 'uuid' })
  public entityId: string;

  @Enum({ items: () => ImageType })
  public type: ImageType;

  @Index()
  @Property()
  public filename: string;
}
