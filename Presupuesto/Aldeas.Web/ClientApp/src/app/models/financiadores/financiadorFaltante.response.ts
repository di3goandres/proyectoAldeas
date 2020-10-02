export interface FinanciadorFaltanteResponse {
    cecos: FinanciadoresCecoFaltante[];
}

export interface FinanciadoresCecoFaltante {
    id: number;
    idPrograma: number;
    idFinanciador: number;
    nombreFinanciador: string;
    codigoCeco: number;
    nombre: string;
    subCentro: number;
    nombreSubCentro: string;
    facilityNav: string;
    estado: boolean;
}