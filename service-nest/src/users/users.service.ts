import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { from, map, Observable, switchMap } from 'rxjs';
import { v4 } from 'uuid';
import { CreateUserDto } from './contracts/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  public findAll(): Observable<User[]> {
    return from(this.usersRepository.findAll());
  }

  public findByUuid(uuid: string): Observable<User> {
    return from(this.usersRepository.findOne(uuid)).pipe(
      map(user => {
        if (!user) {
          throw new NotFoundException(`User with id=${uuid} was not found`);
        }

        return user;
      }),
    );
  }

  public findByName(name: string): Observable<User> {
    return from(this.usersRepository.findOne({ name })).pipe(
      map(user => {
        if (!user) {
          throw new NotFoundException(`User with name=${name} was not found`);
        }

        return user;
      }),
    );
  }

  public findByEmailOrNull(email: string): Observable<User | null> {
    return from(this.usersRepository.findOne({ email }));
  }

  public create(createUser: CreateUserDto): Observable<User> {
    const user = new User();
    user.id = v4();

    wrap(user).assign(createUser, { em: this.em });

    return from(this.em.persistAndFlush(user)).pipe(map(() => user));
  }

  public update(id: string, userData: Partial<User>): Observable<void> {
    return this.findByUuid(id).pipe(
      switchMap(user => {
        wrap(user).assign(userData);

        return from(this.em.persistAndFlush(user));
      }),
    );
  }

  public changeIsBlocked(id: string, isBlocked: boolean): Observable<void> {
    return this.findByUuid(id).pipe(
      switchMap(user => {
        user.isBlocked = isBlocked;
        return from(this.em.persistAndFlush(user));
      }),
    );
  }
}
