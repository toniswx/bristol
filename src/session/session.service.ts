import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
export interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

export interface SessionData {
  sessionToken: string;
  refreshToken: string;
}

@Injectable()
export class SessionService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly jwtService: JwtService,
  ) {}

  async verifySessionTokenInCache(userId: string) {
    const sessionToken = await this.cache.get(`key::${userId}`);
    console.log(sessionToken);

    return sessionToken;
  }
  async revokeSessionToken(userId: string) {
    const sessionToken = await this.cache.del(`key::${userId}`);
    return sessionToken;
  }
  async storeSession(userId: string, jti: string) {
    const storedSession = await this.cache.set(
      `key::${userId}`,
      jti,
      604800000,
    );

    return storedSession;
  }

  async createSession(userId: string) {
    const sessionToken = this.createSessionToken(userId);
    const refreshToken = this.createRefreshToken(userId);

    await this.storeSession(userId, sessionToken);

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
}
