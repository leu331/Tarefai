import { 
    IsOptional, 
    IsString, MinLength, 
    MaxLength, 
    IsBoolean 
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: "O título deve ser uma string." })
  @MinLength(3, { message: "O título deve ter pelo menos 3 caracteres." })
  @MaxLength(100, { message: "O título pode ter no máximo 100 caracteres." })
  title?: string;

  @IsOptional()
  @IsBoolean({ message: "O campo 'done' deve ser verdadeiro ou falso." })
  done?: boolean;
}
