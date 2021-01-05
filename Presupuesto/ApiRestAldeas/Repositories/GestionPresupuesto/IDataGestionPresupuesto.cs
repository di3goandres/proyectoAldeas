using System;
using ApiRestAldeasPresupuesto.Models;

namespace ApiRestAldeasPresupuesto.Repositories.GestionPresupuesto
{
    public interface IDataGestionPresupuesto
    {
        dynamic ConsultarPresupuestosByProgramYCeco(CoberturaRequest request);
        dynamic GenerarVersionamiento(PresupuestoProgramRequest request);

    }
}
