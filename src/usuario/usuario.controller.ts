import { Controller, Post, Body, Get, Put, Param, Delete } from "@nestjs/common";
import { UsuarioRepository } from './usuario.repository';
import { UsuarioService } from './usuario.service';
import { CriaUsuarioDto } from "./dto/criaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import {v4 as uuid} from 'uuid';
import { ListaUsuarioDto } from "./dto/listaUsuario.dto";
import { AtualizaUsuarioDto } from "./dto/atualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(
        private usuarioRepository: UsuarioRepository,
        private usuarioService: UsuarioService
    ) {}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
        const usuarioEntity = new UsuarioEntity;
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity);

        return {
            usuario: new ListaUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
            menssage: 'usuario criado com sucesso'
        }
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioService.listaUsuarios();

        return usuariosSalvos;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDto ) {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);

        return {
            usuario: usuarioAtualizado,
            mensagem: 'usuario atualizado com sucesso',
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioRepository.remove(id);

        return {
            usuario: usuarioRemovido,
            mensagem: 'usuário removido com sucesso'
        }
    }
}