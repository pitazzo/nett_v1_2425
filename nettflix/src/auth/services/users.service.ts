import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { User } from 'src/auth/models/user.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDto } from 'src/auth/dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const existingUser = await this.usersRepository.findOneBy({
      email: dto.email,
    });

    if (existingUser) {
      throw new BadRequestException(`Email ${dto.email} is already in use`);
    }

    const user = this.usersRepository.create({
      email: dto.email,
      name: dto.name,
      passwordHash: await bcrypt.hash(dto.password, 10),
    });

    const savedUser = await this.usersRepository.save(user);

    return {
      id: savedUser.id,
      email: user.email,
    };
  }

  async signIn(dto: SignInDto) {
    const user = await this.usersRepository.findOneBy({
      email: dto.email,
    });

    if (!user) {
      throw new UnauthorizedException(`Email ${dto.email} is unknown`);
    }

    const matches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!matches) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
