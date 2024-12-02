import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtGuard, RoleGuard } from '@shared/guards';
import { UserRole } from '@/users/models/user.interfaces';

export const Role = (role: UserRole) =>
  applyDecorators(UseGuards(JwtGuard, RoleGuard), SetMetadata('role', role));
