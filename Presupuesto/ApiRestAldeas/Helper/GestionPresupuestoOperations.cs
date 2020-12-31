using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeasPresupuesto.Helper
{
    public class GestionPresupuestoOperations
    {
        public static dynamic ConsultarPresupuestosByProgramYCeco(IContextFactory factory, IOptions<ConnectionDB> connection, CoberturaRequest request)
        {

            PresupuestoByProgramResponse retorno = new PresupuestoByProgramResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pre in db.TbPresupuestos
                            
                           join finan in db.TbFinanciadores on pre.idFinanciador equals finan.id
                           where pre.idPrograma == request.IdPrograma && pre.idPresupuestoAnio == request.IdPresupuestoAnio
                                 && pre.IdProgramaCecos == request.IdCeco
                           select new ResponsePresupuesto
                           {
                               idPrograma = pre.idPrograma,
                               Anio = pre.Anio,
                               CoberturaAnual = pre.CoberturaAnual,
                               CoberturaMensual = pre.CoberturaMensual,
                               CoberturasCasas = pre.CoberturasCasas,
                               CoberturaMensualEsperada = pre.CoberturaMensualEsperada,
                               id = pre.id,
                               NombreContrato = pre.NombreContrato,
                               Financiador = finan.nombre
                           };
                if (data.Any())
                {
                    retorno.presupuesto = data.ToList();
                }
            }

            return retorno;
        }
    }
}
