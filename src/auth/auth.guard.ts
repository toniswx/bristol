import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface CustomRequest {
  cookies?: {
    set?: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly JwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();

    const sessionToken = request.cookies?.set;

    if (!sessionToken) return false;
    try {
      const isValidJWT = await this.JwtService.verifyAsync(sessionToken, {
        ignoreExpiration: true,
      });

      console.log(isValidJWT);
      if (isValidJWT) return true;
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
