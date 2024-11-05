import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/common/services/encrypt.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService
  ) {}

  private generateToken(user: any): string {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload)
  }

  async registerUser(registerDto: RegisterDto): Promise<RegisterDto> {
    return this.userService.createUser(registerDto)
  }

  async loginUser({ email, password }: LoginDto) {
    const findUser = await this.userService.findUserWithPassword(email)

    if (!findUser) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isMatch = await this.bcryptService.comparePasswords(password, findUser.password)
  
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = this.generateToken(findUser);
    return { accessToken }
  }
}
