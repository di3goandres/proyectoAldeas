import { PresupuestoAnioDatum } from "../presupuestoanio/anio.response";

export interface VersionesResponse {
    actual: PresupuestoAnioDatum;
    versiones: PresupuestoAnioDatum[];
}
