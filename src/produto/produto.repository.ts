import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutoRepository {
    private produtos: ProdutoEntity[] = [];

    salvar(produto: ProdutoEntity) {
        this.produtos.push(produto);
    }

    async listar() {
        return this.produtos;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>) {
        const produto = this.buscaPorId(id);

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === 'id' || chave === 'usuarioId') {
                return;
            }
            produto[chave] = valor;
        });

        return produto;
    }

    private buscaPorId(id:string) {
        const possivelProduto = this.produtos.find(
            produtoSalvo => produtoSalvo.id === id
        );

        if (!possivelProduto) {
            throw new Error('Este produto não existe');
        }
        return possivelProduto;
    }

    async remove(id: string) {
        const produto = this.buscaPorId(id);
        this.produtos = this.produtos.filter(
            produtoSalvo => produtoSalvo.id !== id
        );
        return produto
    }
}