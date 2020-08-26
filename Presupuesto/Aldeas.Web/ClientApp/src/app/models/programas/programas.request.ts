import { Ceco } from "./programas.response";

export class ProgramaRequest {
    constructor(
        public Nombre: string,
        public Cecos: Ceco[]) {
    }


}
