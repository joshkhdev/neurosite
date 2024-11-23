import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../shared/guards/role.guard';
import { UserRole } from '../../users/entities/user.entity';
import { JwtGuard } from '@shared/guards';

export const Role = (role: UserRole) =>
  applyDecorators(UseGuards(JwtGuard, RoleGuard), SetMetadata('role', role));
