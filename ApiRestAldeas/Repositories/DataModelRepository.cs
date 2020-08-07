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
    }   


}
