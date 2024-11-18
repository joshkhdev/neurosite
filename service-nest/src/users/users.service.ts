import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { from, map, Observable, switchMap } from 'rxjs';
import { ICreateUser } from 'src/auth/dto/auth.dto';
import { UpdateUserDto } from './contracts/update-user.dto';
import { v4 } from 'uuid';

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

  public findByEmailOrNull(email: string): Observable<User | null> {
    return from(this.usersRepository.findOne({ email }));
  }

  public findOne(id: string): Observable<User> {
    return from(this.usersRepository.findOne(id)).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException(`User with id=${id} was not found`);
        }

        return user;
      }),
    );
  }

  public create(createUser: ICreateUser): Observable<User> {
    const user = new User();
    user.id = v4();

    wrap(user).assign(createUser, { em: this.em });

    return from(this.em.persistAndFlush(user)).pipe(map(() => user));
  }

  public update(id: string, updateUserDto: UpdateUserDto): Observable<void> {
    return this.findOne(id).pipe(
      switchMap((user) => {
        wrap(user).assign(updateUserDto);

        return from(this.em.persistAndFlush(user));
      }),
    );
  }

  public changeIsBlocked(id: string, isBlocked: boolean): Observable<void> {
    return this.findOne(id).pipe(
      switchMap((user) => {
        user.isBlocked = isBlocked;
        return from(this.em.persistAndFlush(user));
      }),
    );
  }
}
