import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '../types/AccessTokenPayload';
import { UsersService } from '../../users/users.service';
import { AuthenticatedUser } from '../../users/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: AccessTokenPayload) {
    const user = await this.usersService.findOneByIdWithRoles(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(payload);
    console.log(user);
    const roles = user.roles.map(role => role.name);

    const authenticatedUser: AuthenticatedUser = {
      ...user,
      roles,
      hasRole: (role: string) => roles.includes(role),
    };

    return authenticatedUser;
  }
}