import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaModule } from './prisma.module';
import { AuthController } from './auth/auth.controller';
import { ImovelController } from './imovel/imovel.controller';
import { ImovelService } from './imovel/imovel.service';
import { SessionService } from './session/session.service';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController, AuthController, ImovelController],
  providers: [AuthService, UserService, ImovelService, SessionService],
  imports: [
    PrismaModule,
    CacheModule.register({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use environment variable
    }),
  ],
})
export class AppModule {}
