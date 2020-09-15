export interface UsuariosResponse {
  usuarios: Usuario[];
}

export class Usuario {
  id: number;
  username: string;
  administrador: boolean;
}