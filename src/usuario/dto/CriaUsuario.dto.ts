import { IsEmail, IsNotEmpty, MinLength, isNotEmpty } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class CriaUsuarioDto {

    @IsNotEmpty({ message: 'O nome não pode ser vazio'})
    nome: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido'})
    @EmailUnico( {message: 'Já existe um usuario com este e-mail' })
    email:string;
    
    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres'})
    senha: string;
}