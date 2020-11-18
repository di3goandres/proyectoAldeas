using System;
using System.IO;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Helper;
using ApiRestAldeas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.Repositories
{
    public class DataModelRepository : IDataModelRepository
    {
        private readonly IOptions<ConnectionDB> _connectionDB;
   
        private readonly IContextFactory _factory;

        public DataModelRepository(IOptions<ConnectionDB> connectionDB, IContextFactory factory)
        {
            _connectionDB = connectionDB;
            _factory = factory;
        }

        public dynamic CentroCostos()
        {
            return CentroCostosOperations.obtenerDatos(_factory, _connectionDB);
        }

      
        public dynamic ConsultarParticipantesProyecto(long id)
        {
            return ProyectoOperations.ConsultarParticipantes(_factory, _connectionDB, id);
        }

       

        public dynamic ConsultarProyectos()
        {
            return ProyectoOperations.ConsultarProyecto(_factory, _connectionDB);

        }

        public dynamic DatosColombia()
        {
            return MunicipioOperations.obtenerDatos(_factory, _connectionDB);

        }

        public dynamic GuardarProyecto()
        {
           return ProyectoOperations.ConsultarProyecto(_factory, _connectionDB) ;
        }

        public dynamic GuardarProyecto([FromBody] string data)
        {
            throw new NotImplementedException();
        }

        public dynamic GuardarRegistroColaborador(ColaboradorRequest request)
        {
            return ColaboradoresOperations.Guardar(_factory, _connectionDB, request);
        }

        public dynamic GuardarRegistroParticipantes(RegistroParticipantesRequest request)
        {
            return RegistroParticipantesOperations.Guardar(_factory, _connectionDB,request);
        }

        public dynamic GuardarRegistroProyecto(ProyectoRequest proyectoRequest)
        {
            return ProyectoOperations.Guardar(_factory, _connectionDB, proyectoRequest);
        }

        public dynamic UploadFile([FromForm] FileInputModel data)
        {
            byte[] ContenidoBase64;
            using(var memoryStream = new MemoryStream())
            {
                data.File.CopyToAsync(memoryStream);

                ContenidoBase64 = memoryStream.ToArray();
            }

            return  ProyectoOperations.GuardarArchivo(_factory, _connectionDB, data.Proyecto, ContenidoBase64, data.File.FileName);
              
        }


        #region indicadores
        public dynamic ConsultarPreguntasIndicadores(string id)
        {
            return IndicadoresOperations.ConsultarPreguntasIndicador(_factory, _connectionDB, id);
        }
        public dynamic ConsultarIndicadores()
        {
            return IndicadoresOperations.ConsultarListaIndicadores(_factory, _connectionDB);
        }

        public dynamic AsociarIndicadorParticipante(IndicadoresRequest request)
        {
            return IndicadoresOperations.AsociarIndicadorParticipante(_factory, _connectionDB, request);
        }
        public dynamic ConsultarRespuestasIndicadoresParticipante(long id, long idIndicador)
        {
            return IndicadoresOperations.ConsultarPreguntasIndicadorParticipante(_factory, _connectionDB, id, idIndicador);
        }
        public dynamic ConsultarIndicadorParticipante(long id)
        {
            return IndicadoresOperations.ConsultarIndicadorParticipante(_factory, _connectionDB, id);
        }


        #endregion


        #region

        /// <summary>
        /// Metodo para consultar los proyectos para listas.
        /// </summary>
        /// <returns></returns>
        public dynamic ConsultarListaProyectos()
        {
            return ProyectoOperations.ConsultarProyectoListas(_factory, _connectionDB);

        }

        public dynamic ConsultarProyectosByID(long id)
        {
            return ProyectoOperations.ConsultarProyectobyID(_factory, _connectionDB, id);
        }
        #endregion
    }


}
