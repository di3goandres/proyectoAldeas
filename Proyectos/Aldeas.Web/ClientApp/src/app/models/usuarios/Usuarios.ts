export class Usuarios {
    id: number;
    username: string;
    idPerfil: number;
    perfil: string;

}

export interface UsuariosResponse{
    itemsUsarios:  Usuarios[]
}
