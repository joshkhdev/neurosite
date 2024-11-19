import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../shared/guards/role.guard';
import { UserRole } from '../../users/entities/user.entity';

export const Role = (role: UserRole) =>
  applyDecorators(UseGuards(RoleGuard), SetMetadata('role', role));
