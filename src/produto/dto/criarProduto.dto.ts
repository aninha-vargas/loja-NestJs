import { ArrayMinSize, IsArray, IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import { CaracteristicaProdutoDTO } from "./caracteristicaProduto.dto";
import { ImagemProdutoDTO } from "./imagemProduto.dto";
import { Type } from "class-transformer";

export class CriaProdutoDTO {

    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    usuarioId: string;
    
    @IsString()
    @IsNotEmpty({ message: 'O nome não pode ser vazio'})
    nome: string;
    
    // @IsDecimal(undefined, { message: 'O valor deve ter formato decimal' })
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @IsPositive({ message: 'O valor deve ser um número maior que zero' })
    valor: number;

    @IsPositive({ message: 'A quantidade deve ser um número maior que zero' })
    quantidadeDisponivel: number;
    
    @IsNotEmpty({ message: 'A descrição não pode ser vazia'})
    @MaxLength(1000, { message: 'Descrição deve ter no máximo 1000 caracteres'})
    descricao: string;

    @ValidateNested()
    @IsArray() 
    // @ArrayMinSize(3, { message: 'Deve ter pelo menos 3 características' })
    @ArrayMinSize(3)
    @Type(() => CaracteristicaProdutoDTO)
    caracteristicas: CaracteristicaProdutoDTO[];
    
    @ValidateNested()
    @IsArray() 
    // @ArrayMinSize(1, { message: 'Deve ter pelo menos 1 imagem' })
    @ArrayMinSize(1)
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];
    
    @IsNotEmpty({ message: 'A categoria não pode ser vazia'})
    categoria: string;

    @IsDateString()
    dataCriacao: Date;

    @IsDateString()
    dataAtualizacao: Date;  
  }
