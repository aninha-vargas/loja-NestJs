import { ArrayMinSize, IsArray, IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, IsUrl, MaxLength, ValidateNested } from "class-validator";
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
    quantidade: number;
    
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

  export class ImagemProdutoDTO {

    @IsUrl(undefined, { message: 'URL para imagem inválida' })
    url: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
    descricao: string;
  }

  export class CaracteristicaProdutoDTO {
  
    @IsString()
    @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
    nome: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
    descricao: string;
  }