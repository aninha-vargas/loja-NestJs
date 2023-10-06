import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Injectable } from "@nestjs/common";
import { AtualizaProdutoDto } from "./dto/atualizaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) {}

    async criaProduto(produtoEntity: ProdutoEntity) {
        await this.produtoRepository.save(produtoEntity)
    }

    async listaProdutos(){
        const produtosSalvos = await this.produtoRepository.find();
        // const produtosLista = produtosSalvos.map(
        //     (produto) => new ListaProdutoDto(produto.id, produto.nome)
        // );

        // return produtosLista;
        return produtosSalvos;
    }

    async atualizaProduto(id: string, produtoEntity: AtualizaProdutoDto) {
        await this.produtoRepository.update(id, produtoEntity);
    }

    async deletaProduto(id: string) {
        await this.produtoRepository.delete(id);
    }
}