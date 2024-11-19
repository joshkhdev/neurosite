import { SetMetadata } from '@nestjs/common';
import { SkipAuthGuard } from '../../shared/guards/skip-auth.guard';

export const Public = () => SetMetadata(SkipAuthGuard, true);
