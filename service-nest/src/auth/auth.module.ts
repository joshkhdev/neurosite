import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './strategy/supabase-strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  providers: [AuthService, SupabaseStrategy],
  exports: [AuthService, SupabaseStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
