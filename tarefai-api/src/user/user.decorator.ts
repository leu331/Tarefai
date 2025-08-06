import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data]; // se passar 'userId' ou 'role', retorna só essa propriedade
    }
    return request.user; // se não passar, retorna o objeto todo
  },
);
