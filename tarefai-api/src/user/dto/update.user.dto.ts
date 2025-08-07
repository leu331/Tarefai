import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  @MinLength(8, { message: 'O nome deve ter pelo menos 8 caracteres.' })
  @MaxLength(50, { message: 'O nome pode ter no máximo 50 caracteres.' })
  @Matches(/^[A-Za-zÀ-ÿ\s]+$/, {
    message: 'O nome deve conter apenas letras e espaços.',
  })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  @MaxLength(100, { message: 'O e-mail pode ter no máximo 100 caracteres.' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  @MaxLength(16, { message: 'A senha deve ter no máximo 16 caracteres.' })
  @Matches(/[A-Z]/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula.',
  })
  @Matches(/[a-z]/, {
    message: 'A senha deve conter pelo menos uma letra minúscula.',
  })
  @Matches(/[0-9]/, {
    message: 'A senha deve conter pelo menos um número.',
  })
  @Matches(/[\W_]/, {
    message: 'A senha deve conter pelo menos um caractere especial.',
  })
  @Matches(/^\S*$/, {
    message: 'A senha não pode conter espaços.',
  })
  @Matches(/^(?!.*(.)\1{3,}).*$/, {
    message: 'A senha não pode ter caracteres repetidos em sequência.',
  })
  password?: string;
}
