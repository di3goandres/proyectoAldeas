using System;
using System.IO;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Helper;
using ApiRestAldeas.Models;
using Microsoft.AspNetCore.Hosting;
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
        private IWebHostEnvironment _hostingEnvironment;


        public DataModelRepository(IOptions<ConnectionDB> connectionDB, IContextFactory factory, IWebHostEnvironment environment)
        {
            _connectionDB = connectionDB;
            _factory = factory;
            _hostingEnvironment = environment;
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

        

        public dynamic GuardarRegistroProyecto(ProyectoRequest proyectoRequest)
        {
            return ProyectoOperations.Guardar(_factory, _connectionDB, proyectoRequest);
        }

        public  async System.Threading.Tasks.Task<dynamic> UploadFileAsync([FromForm] FileInputModel data)
        {
            var nombreArchivo = DateTime.Now.ToString("yyyyMM-ddHHmmss");
            var tipo = data.File.ContentType;
            if (tipo.Contains("pdf"))
            {
                nombreArchivo+= ".pdf";
            }
            else
            {
                nombreArchivo += ".xls";
            }
          
            try
            {
                if (data.File.Length > 0)
                {
                    var directorio = "ProyectosFiles/" + data.Proyecto + "/";
                 
                    if (!Directory.Exists(directorio))
                    {
                        DirectoryInfo di = Directory.CreateDirectory(directorio);
                    }
                   

                    var filePath = directorio + nombreArchivo;


                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await data.File.CopyToAsync(fileStream);
                    }
                }
            }
            catch(Exception ex)
            {

            }
            byte[] ContenidoBase64;
            using(var memoryStream = new MemoryStream())
            {
                _ = data.File.CopyToAsync(memoryStream);

                ContenidoBase64 = memoryStream.ToArray();
            }

            return  ProyectoOperations.GuardarArchivo(
                _factory, _connectionDB, data.Proyecto, ContenidoBase64, nombreArchivo, data.File.ContentType);
              
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
        public dynamic ConsultarCecosProyectosByID(long id)
        {
            return ProyectoOperations.ConsultarCecosProyectobyID(_factory, _connectionDB, id);
        }

        public dynamic ConsultarDetalleParticipante(long id)
        {
            return RegistroParticipantesOperations.ConsultarDatosParticipante(_factory, _connectionDB, id);
        }
        public dynamic ActualizarItemProyecto(ItemProyectoRequest proyectoRequest)
        {
            return ProyectoOperations.ActualizarItemProyecto(_factory, _connectionDB, proyectoRequest);
        }

        public dynamic ActualizarItemInfoFinanciera(InformacionFinancieraRequest proyectoRequest)
        {
            return ProyectoOperations.ActualizarItemInfoFinanciera(_factory, _connectionDB, proyectoRequest);
        }

        public dynamic ActualizarItemFechas(FechasEntregasRequest proyectoRequest)
        {
            return ProyectoOperations.ActualizarItemFechas(_factory, _connectionDB, proyectoRequest);
        }

        public dynamic ActualizarItemParticipanteObservaciones(ProyectadosRequest proyectoRequest)
        {
            return ProyectoOperations.ActualizarItemParticipanteObservaciones(_factory, _connectionDB, proyectoRequest);
        }

        public dynamic ActualizarItemParticipanteLIST(ProyectadosRequest proyectoRequest)
        {
            return ProyectoOperations.ActualizarItemParticipanteObservaciones(_factory, _connectionDB, proyectoRequest);
        }

        public dynamic ActualizarItemMunicipio(MunicipioRequest proyectoRequest)
        {
            return ProyectoOperations.ActualizarItemMunicipio(_factory, _connectionDB, proyectoRequest);
        }


        #endregion


        #region Colaborador

        public dynamic ConsultarColaboradorProyecto(long id)
        {
            return ColaboradoresOperations.ConsultarColaboradoresProyecto(_factory, _connectionDB, id);
        }

        public dynamic ConsultarDetalleColaboradorProyecto(long id)
        {
            return ColaboradoresOperations.ConsultarDetalleColaboradores(_factory, _connectionDB, id);
        }

        public dynamic ConsultarExcelProyectosByID(long id)
        {
           return InformesOperations.GenerarInforme(_factory, _connectionDB, id);
        }

        public dynamic ExportExcelProyectos()
        {
            return InformesOperations.ExportBasedeDatosInforme(_factory, _connectionDB);
        }

        public dynamic ActualizarCeco(long id, int idCecoNuevo)
        {
            return CecosOperations.UpdateCeco(_factory, _connectionDB, id, idCecoNuevo);
        }

        public dynamic ColaboradorActualizar(ColaboradorRequest request)
        {
            return ColaboradoresOperations.Actualizar(_factory, _connectionDB, request);
        }

        public dynamic GuardarRegistroParticipantes(RegistroParticipantesRequest request)
        {
            return RegistroParticipantesOperations.Guardar(_factory, _connectionDB, request);
        }
        public dynamic ActualizarParticipante(RegistroParticipantesRequest request)
        {
            return RegistroParticipantesOperations.Actualizar(_factory, _connectionDB, request);
        }

        public dynamic ActualizarIntegrante(ActualizarIntegrantesRequest request)
        {
            return RegistroParticipantesOperations.ActualizarIntegrantes(_factory, _connectionDB, request);
        }

        public dynamic ActualizarEjecucion(EjecucionFinancieraRequest request)
        {
            return EjecucionFinancieraOperations.ActualizarEjecucion(_factory, _connectionDB, request);
        }

        public dynamic ConsultarArchivo(long idProyecto)
        {
            return ProyectoOperations.ConsultarArchivo(_factory, _connectionDB, idProyecto);
        }

        public dynamic CopiarRegistroParticipante(UsuarioCambio usuarioCambio)
        {
            return RegistroParticipantesOperations.CopiarIntegrante(_factory, _connectionDB, usuarioCambio);
        }

        public dynamic ConsultarCopiarIntegrante(UsuarioCambio usuarioCambio)
        {
            return RegistroParticipantesOperations.ConsultarCopiarIntegrante(_factory, _connectionDB, usuarioCambio);
        }









        #endregion
    }


}
