import { Controller, Post, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../../common/security/jwt.service';
import { GuestGuard } from '../../common/security';
import { UserInput } from '../../user/model';
import { Role } from '../../tokens';
import { UserService } from '../../user/service';
import { LoggerService } from '../../common';

@Controller('authorization')
export class AuthorizationController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  @UseGuards(GuestGuard)
  async login(@Body() body: UserInput) {
    
    const payload = { 
        username: body.email, 
        sub: body.email, 
        password: body.password,
        role: Role.RESTRICTED
    };

    const user = await this.userService.findEmailAndPassword(body.email, body.password);

    if (user?.id) {
      
      const token = this.jwtService.generateToken(payload);
      this.logger.info(`Token generated: ${token}`);
      
      return { 
        access_token: token,
        user: user
      };
    }
    else {
      
      this.logger.error(`User ${body.email} or password is not valid`);
      throw new UnauthorizedException(`User ${body.email} or password is not valid`);
    }
  }
}