
export class ProdutoEntity {
    id: string;
    usuarioId: string;
    nome: string;
    valor: number;
    quantidadeDisponivel: number;
    descricao: string;
    caracteristicas: CaracteristicaProduto[];
    imagens: ImagemProduto[];
    categoria: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
}

class ImagemProduto {
    url: string;
    descricao: string;
}

class CaracteristicaProduto {
    nome: string;
    descricao: string;
}