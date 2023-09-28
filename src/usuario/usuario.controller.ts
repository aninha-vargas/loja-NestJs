import { Controller, Post, Body, Get } from "@nestjs/common";
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDto } from "./dto/criaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import {v4 as uuid} from 'uuid';

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
            id: usuarioEntity.id, 
            message: 'usuario criado com sucesso'
        }
    }

    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }
}