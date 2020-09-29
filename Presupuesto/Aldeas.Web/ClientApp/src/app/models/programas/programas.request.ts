import { Ceco } from "./programas.response";
import { Tipo } from '../categorias/categoria.response';

export class ProgramaRequest {
    constructor(
        public Nombre: string,
        public Tipo: any,
        public Cecos: Ceco[]) {
    }


}
