import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from '@shared/guards';
import { UserRole } from '@/users/models/user.interfaces';

export const Role = (role?: UserRole) =>
  applyDecorators(UseGuards(RoleGuard), SetMetadata('role', role));
