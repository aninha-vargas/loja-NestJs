import { ArrayMinSize, IsArray, IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, IsUrl, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CaracteristicaProdutoDTO, ImagemProdutoDTO } from "./criarProduto.dto";

export class AtualizaProdutoDto {

    // @IsUUID(undefined, { message: 'ID do produto inválido' })
    // id: string;
    
    // @IsUUID(undefined, { message: 'ID de usuário inválido' })
    // usuarioId: string;
    
    @IsString()
    @IsNotEmpty({ message: 'O nome não pode ser vazio'})
    @IsOptional()
    nome: string;
    
    // @IsDecimal(undefined, { message: 'O valor deve ter formato decimal' })
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @IsPositive({ message: 'O valor deve ser um número maior que zero' })
    @IsOptional()
    valor: number;

    @IsPositive({ message: 'A quantidade deve ser um número maior que zero' })
    @IsOptional()
    quantidadeDisponivel: number;
    
    @IsNotEmpty({ message: 'A descrição não pode ser vazia'})
    @MaxLength(1000, { message: 'Descrição deve ter no máximo 1000 caracteres'})
    @IsOptional()
    descricao: string;

    @ValidateNested()
    @IsArray() 
    // @ArrayMinSize(3, { message: 'Deve ter pelo menos 3 características' })
    @ArrayMinSize(3)
    @Type(() => CaracteristicaProdutoDTO)
    @IsOptional()
    caracteristicas: CaracteristicaProdutoDTO[];
    
    @ValidateNested()
    @IsArray() 
    // @ArrayMinSize(1, { message: 'Deve ter pelo menos 1 imagem' })
    @ArrayMinSize(1)
    @Type(() => ImagemProdutoDTO)
    @IsOptional()
    imagens: ImagemProdutoDTO[];
    
    @IsNotEmpty({ message: 'A categoria não pode ser vazia'})
    @IsOptional()
    categoria: string;

    @IsDateString()
    @IsOptional()
    dataCriacao: Date;

    @IsDateString()
    @IsOptional()
    dataAtualizacao: Date;  
  }
  