import { FastifyRequest } from 'fastify';
import { UserRole } from '@/users/models/user.interfaces';

export interface JwtPayload {
  readonly sub: string;
  readonly name: string;
  readonly role: UserRole;
}

export interface JwtPayloadExtended extends JwtPayload {
  readonly refreshToken: string;
}

export interface JwtFastifyRequest extends FastifyRequest {
  readonly user: JwtPayloadExtended;
}
