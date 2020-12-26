export interface UsuariosResponse {
  usuarios: Usuario[];
}

export class Usuario {
  id: number;
  username: string;
  perfil: string;

  administrador: boolean;
  idPerfil: number;
}