import { Injectable, UnauthorizedException } from "@nestjs/common";           // |
import { PassportStrategy } from '@nestjs/passport'; //   ------- estratégia de passaporte com jwt
import { ExtractJwt, Strategy } from 'passport-jwt';  //  |
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as dotenv from "dotenv"

dotenv.config() //carrega a partir das variáveis de ambiente

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, 
            secretOrKey: process.env.JWT_SECRET as string, 
        });
    }

    async validate(payload: {sub: string}): Promise<User> { //metodo validate é chamado quando o token é validado
        const user = await this.prisma.user.findUnique({where: {id: payload.sub}})

        if (!user) {
            throw new UnauthorizedException("Usuário não encontrado.")
        }

         return user;
    }
}