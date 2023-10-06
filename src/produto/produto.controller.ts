import { Controller, Post, Body, Get, Put, Param, Delete } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/criarProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import {v4 as uuid} from 'uuid';
import { AtualizaProdutoDto } from "./dto/atualizaProduto.dto";
import { randomUUID } from "crypto";
import { ProdutoService } from "./produto.service";


@Controller('/produtos')
export class ProdutoController {

    constructor(
        private produtoRepository: ProdutoRepository,
        private readonly produtoService: ProdutoService
    ) {}

    @Post()
    async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
        const produto = new ProdutoEntity;

        produto.id = randomUUID();
        produto.usuarioId = dadosDoProduto.usuarioId;
        produto.nome = dadosDoProduto.nome;
        produto.valor = dadosDoProduto.valor;
        produto.quantidade = dadosDoProduto.quantidade;
        produto.descricao = dadosDoProduto.descricao;
        produto.categoria = dadosDoProduto.categoria;
        produto.caracteristicas = dadosDoProduto.caracteristicas;
        produto.imagens = dadosDoProduto.imagens;
        
        const produtoCadastrado = this.produtoService.criaProduto(produto);
        return {
            produto: produtoCadastrado,
            mensagem: 'produto criado com sucesso'
        }
    }

    @Get()
    async listaProdutos() {
        // return this.produtoRepository.listar();
        return this.produtoService.listaProdutos();
    }

    @Put('/:id')
    async atualizaProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDto ) {
        const produtoAtualizado = await this.produtoService.atualizaProduto(id, novosDados);

        return {
            produto: produtoAtualizado,
            mensagem: 'produto atualizado com sucesso',
        }
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id: string) {
        const produtoRemovido = await this.produtoService.deletaProduto(id);

        return {
            produto: produtoRemovido,
            mensagem: 'produto removido com sucesso'
        }
    }
}