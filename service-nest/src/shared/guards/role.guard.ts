import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtFastifyRequest } from '../../auth/dto/auth.dto';
import { userHasAccess, UserRole } from '../../users/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const role: UserRole = this.reflector.get<UserRole>(
      'role',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest<JwtFastifyRequest>();
    return userHasAccess(request.user.role, role);
  }
}
