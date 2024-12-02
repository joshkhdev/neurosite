import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtFastifyRequest } from '@/auth/models/auth.interfaces';
import { userHasAccess, UserRole } from '@/users/models/user.interfaces';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<UserRole | undefined>('role', context.getHandler());
    const request = context.switchToHttp().getRequest<JwtFastifyRequest>();

    return userHasAccess(request.user.role, role);
  }
}
