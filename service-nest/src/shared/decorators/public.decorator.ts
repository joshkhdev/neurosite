import { SetMetadata } from '@nestjs/common';
import { JwtGuard } from '@shared/guards';

export const Public = () => SetMetadata(JwtGuard.IsPublicKey, true);
