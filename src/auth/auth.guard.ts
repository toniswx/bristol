import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { SessionService } from '../session/session.service';

export interface CustomRequest {
  userId?: any; // or whatever type your userId is
  cookies?: {
    set?: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly SessionService: SessionService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();

    const sessionToken = request.cookies?.set;

    if (!sessionToken) return false;
    try {
      const isValidJWT: JwtPayload =
        await this.JwtService.verifyAsync<JwtPayload>(sessionToken, {
          ignoreExpiration: true,
        });

      if (!isValidJWT) return false;

      const isValid = await this.SessionService.verifySessionTokenInCache(
        isValidJWT.sub!,
      );

      if (!isValid) return false;
      request.userId = isValidJWT.sub;

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
