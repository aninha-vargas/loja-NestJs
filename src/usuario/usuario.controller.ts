import { Controller, Post, Body, Get } from "@nestjs/common";
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDto } from "./dto/criaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import {v4 as uuid} from 'uuid';
import { ListaUsuarioDto } from "./dto/listaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}
    // private usuarioRepository = new UsuarioRepository();

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
        // return { 
        //     id: usuarioEntity.id, 
        //     message: 'usuario criado com sucesso'
        // }
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDto(
                usuario.id,
                usuario.nome
            )
        );

        return usuariosLista;
        // return this.usuarioRepository.listar();
    }
}