import { ArrayMinSize, IsArray, IsDecimal, IsNotEmpty, IsPositive, MaxLength, ValidateNested } from "class-validator";
import { CaracteristicaProdutoDTO } from "./caracteristicaProduto.dto";
import { ImagemProdutoDTO } from "./imagemProduto.dto";
import { Type } from "class-transformer";
import { kMaxLength } from "buffer";

export class CriaProdutoDTO {
    
    @IsNotEmpty({ message: 'O nome não pode ser vazio'})
    nome: string;
    
    @IsDecimal()
    @IsPositive({ message: 'O valor deve ser um número maior que zero' })
    valor: number;

    @IsPositive({ message: 'A quantidade deve ser um número maior que zero' })
    quantidade: number;
    
    @IsNotEmpty({ message: 'A descrição não pode ser vazia'})
    @MaxLength(1000)
    descricao: string;

    @ValidateNested()
    @IsArray() 
    @Type(() => CaracteristicaProdutoDTO)
    @ArrayMinSize(3, { message: 'Deve ter pelo menos 3 características' })
    caracteristicas: CaracteristicaProdutoDTO[];
    
    @IsArray() 
    @ArrayMinSize(1, { message: 'Deve ter pelo menos 1 imagem' })
    imagens: ImagemProdutoDTO[];
    
    @IsNotEmpty({ message: 'A categoria não pode ser vazia'})
    categoria: string;
  }
