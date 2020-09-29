using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeasPresupuesto.EntityFrame;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeasPresupuesto.Helper
{
    public class CargosOperations
    {
        public static dynamic ConsultarCargos(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            CargosResponse retorno = new CargosResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from cargos in db.TbCargos
                           select cargos;
                if (data.Any())
                {
                    retorno.CargosData = data.ToList();
                }
            }

            return retorno;
        }


        public static dynamic GuardarCargos(IContextFactory factory, IOptions<ConnectionDB> connection, CargosRequest data)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {
                var nuevo = new DbCargos()
                {
                    tipo = data.tipo,
                    cod_cargo = data.cod_cargo,
                    cargo = data.cargo,

                };
                db.TbCargos.Add(nuevo);
                db.SaveChanges();
                id = nuevo.id;

               
            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }


        public static dynamic ActualizarCargo(IContextFactory factory, IOptions<ConnectionDB> connection, CargosRequest request)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbCargos
                           where pro.id == request.id
                           select pro;
                if (data.Any())
                {
                    data.First().tipo = request.tipo;
                    data.First().cod_cargo = request.cod_cargo;
                    data.First().cargo = request.cargo;
                    id = data.First().id;
                    db.SaveChanges();
                }
            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }

    }
}
