import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard, RefreshTokenGuard } from '@shared/guards';

export const AuthRequired = () =>
  applyDecorators(ApiBearerAuth(), UseGuards(JwtGuard));

export const AuthRequiredRefresh = () =>
  applyDecorators(ApiBearerAuth(), UseGuards(RefreshTokenGuard));
