import { ArrayMinSize, IsArray, IsDecimal, IsNotEmpty, IsPositive, MaxLength, ValidateNested } from "class-validator";
import { CaracteristicaProdutoDTO } from "./caracteristicaProduto.dto";
import { ImagemProdutoDTO } from "./imagemProduto.dto";
import { Type } from "class-transformer";

export class CriaProdutoDTO {
    
    @IsNotEmpty({ message: 'O nome não pode ser vazio'})
    nome: string;
    
    @IsDecimal(undefined, { message: 'O valor deve ter formato decimal' })
    @IsPositive({ message: 'O valor deve ser um número maior que zero' })
    valor: number;

    @IsPositive({ message: 'A quantidade deve ser um número maior que zero' })
    quantidadeDisponivel: number;
    
    @IsNotEmpty({ message: 'A descrição não pode ser vazia'})
    @MaxLength(1000, { message: 'Descrição deve ter no máximo 1000 caracteres'})
    descricao: string;

    @ValidateNested()
    @IsArray() 
    @Type(() => CaracteristicaProdutoDTO)
    @ArrayMinSize(3, { message: 'Deve ter pelo menos 3 características' })
    caracteristicas: CaracteristicaProdutoDTO[];
    
    @ValidateNested()
    @IsArray() 
    @Type(() => ImagemProdutoDTO)
    @ArrayMinSize(1, { message: 'Deve ter pelo menos 1 imagem' })
    imagens: ImagemProdutoDTO[];
    
    @IsNotEmpty({ message: 'A categoria não pode ser vazia'})
    categoria: string;
  }
