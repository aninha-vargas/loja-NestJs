import { Controller, Post, Body, Get, Put, Param, Delete } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/criarProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import {v4 as uuid} from 'uuid';
import { AtualizaProdutoDto } from "./dto/atualizaProduto.dto";


@Controller('/produtos')
export class ProdutoController {

    constructor(private produtoRepository: ProdutoRepository) {}

    @Post()
    async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity;
        produtoEntity.id = uuid();
        produtoEntity.usuarioId = dadosDoProduto.usuarioId;
        produtoEntity.nome = dadosDoProduto.nome;
        produtoEntity.valor = dadosDoProduto.valor;
        produtoEntity.quantidadeDisponivel = dadosDoProduto.quantidadeDisponivel;
        produtoEntity.descricao = dadosDoProduto.descricao;
        produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
        produtoEntity.imagens = dadosDoProduto.imagens;
        produtoEntity.categoria = dadosDoProduto.categoria;
        produtoEntity.dataCriacao = dadosDoProduto.dataCriacao;
        produtoEntity.dataAtualizacao = dadosDoProduto.dataAtualizacao;
        
        
        this.produtoRepository.salvar(produtoEntity);
        return {
            produto: produtoEntity,
            mensagem: 'produto criado com sucesso'
        }
    }

    @Get()
    async listaProdutos() {
        return this.produtoRepository.listar();
    }

    @Put('/:id')
    async atualizaProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDto ) {
        const produtoAtualizado = await this.produtoRepository.atualiza(id, novosDados);

        return {
            produto: produtoAtualizado,
            mensagem: 'produto atualizado com sucesso',
        }
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id: string) {
        const produtoRemovido = await this.produtoRepository.remove(id);

        return {
            produto: produtoRemovido,
            mensagem: 'produto removido com sucesso'
        }
    }
}