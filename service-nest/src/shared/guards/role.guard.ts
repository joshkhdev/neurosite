import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtFastifyRequest } from '../../auth/dto/auth.dto';
import { userHasAccess } from '../../users/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get('role', context.getHandler());
    const request = context.switchToHttp().getRequest<JwtFastifyRequest>();
    return userHasAccess(request.user.role, role);
  }
}
