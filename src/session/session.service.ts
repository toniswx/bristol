import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
export interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class SessionService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly jwtService: JwtService,
  ) {}

  createSession(userId: string) {
    const sessionToken = this.createSessionToken(userId);
    const refreshToken = this.createRefreshToken(userId);

    return {
      sessionToken: sessionToken,
      refreshToken: refreshToken,
    };
  }

  createSessionToken(userId: string) {
    const JWT_SECRET = process.env.JWT_SECRET;

    const payload = {
      sub: userId,
      jti: randomUUID(),
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: JWT_SECRET,
    });

    return token;
  }
  createRefreshToken(userId: string) {
    const JWT_SECRET = process.env.JWT_SECRET;

    const payload = {
      sub: userId,
      jti: randomUUID(),
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: JWT_SECRET,
    });

    return token;
  }

  verifyToken(token: string) {
    const isValidToken = this.jwtService.verify<JwtPayload>(token, {
      ignoreExpiration: false,
    });
    return isValidToken;
  }
}
