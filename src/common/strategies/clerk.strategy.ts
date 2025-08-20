import { verifyToken } from '@clerk/backend';
import { Inject,Injectable,UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { ClerkClient } from '@clerk/backend';
import { EnvService } from 'src/shared/env/env.service';
import { UsersService } from 'src/modules/users/users.service';
import { User } from '@prisma/client';


@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  constructor(
    @Inject('ClerkClient')
    private readonly clerkClient: ClerkClient,
    private readonly env: EnvService,
    @Inject(UsersService)
    private readonly usersService: UsersService
  ) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const token = req.headers.authorization?.split(' ').pop();

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const enviroment = this.env.get('NODE_ENV');
      if(enviroment === 'test') {
        const userInfo = await this.usersService.getUserInfo('user_31XpMiCLzDOcNZnq8EPRgLI2p3J');
        return userInfo;
      }
      const tokenPayload = await verifyToken(token, {
        secretKey: this.env.get('CLERK_SECRET_KEY'),
      });

      const user = await this.clerkClient.users.getUser(tokenPayload.sub);
      const userInfo = await this.usersService.getUserInfo(user.id);
      return userInfo;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}