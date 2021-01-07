using System;
using ApiRestAldeasPresupuesto.Models;

namespace ApiRestAldeasPresupuesto.Repositories.GestionPresupuesto
{
    public interface IDataGestionPresupuesto
    {
        dynamic ConsultarPresupuestosByProgramYCeco(CoberturaRequest request);
        dynamic GenerarVersionamiento(PresupuestoProgramRequest request);

        dynamic ConsultaProgramasVersion();
        dynamic ConsultaVersionesProgramasVersion(long idPrograma, int Anio);
        dynamic ConsultarAnios(long idPrograma);
        dynamic VolverVersionAnterior(long idVersionAnterior, long idActual);




    }
}
