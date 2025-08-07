import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, //busca os usuários no banco
    private jwtService: JwtService, //vai gerar os tokens
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } }); //encontra o usuário através de seu email

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password); //compara a senha fornecida com a do banco

    if (!passwordMatch) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    return user;
  }

  async login(data: LoginDto) {
    const user = await this.validateUser(data.email, data.password); //valida para saber se email e senha estão corretos

    const payload = { sub: user.id, role: user.role, name: user.name, email: user.email };

    return { //aqui eu retorno as infos do usuário autenticado
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    };
  }
}
