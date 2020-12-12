using System;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using static ApiRestAldeas.Entities.Appsettings;
using System.Linq;
using ApiRestAldeas.Models;
using System.Collections.Generic;
namespace ApiRestAldeas.Helper
{
    public class ParticipantesProyectadosOperations
    {
        public static dynamic ExportDataProyectados(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            List<DBParticipantesProyectados> retorno = new List<DBParticipantesProyectados>();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var Proyectado = from proyectado in db.tbParticipantesProyectados
                               
                                 select proyectado;

                if (Proyectado.Any())
                {
                    retorno = Proyectado.ToList();
                }
            }
            return retorno;
        }


        public static dynamic ExportDataparticipantes(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            List<DBParticipantes> retorno = new List<DBParticipantes>();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var Proyectado = from proyectado in db.tbParticipantes

                                 select proyectado;

                if (Proyectado.Any())
                {
                    retorno = Proyectado.ToList();
                }
            }
            return retorno;
        }
    }
}
