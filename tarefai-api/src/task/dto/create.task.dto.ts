import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Matches
} from "class-validator"

export class CreateTaskDto {
   
    @IsString({message: "O título deve ser uma string."})
    @MinLength(3, {message: "O título deve ter pelo menos 3 caracteres."})
    @MaxLength(100, {message: "O título pode ter no máximo 100 caracteres."})
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, {
    message: 'O nome deve conter apenas letras e espaços.',})
     @IsNotEmpty({message: "Informe o título da tarefa."})
  
    title: string //obrigatório ficar no final para a validação acima saber o tipo
}