import { Controller, Post, Body, Get } from "@nestjs/common";
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDto } from "./dto/CriaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}
    // private usuarioRepository = new UsuarioRepository();

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
        this.usuarioRepository.salvar(dadosDoUsuario);
        return dadosDoUsuario;
    }

    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }
}