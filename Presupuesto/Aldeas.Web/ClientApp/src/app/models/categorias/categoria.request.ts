import { Puc } from "./categoria.response";

export class CategoriaRequest {
    constructor(
        public Nombre: string,
        public pucs: Puc[]) {
    }


}
