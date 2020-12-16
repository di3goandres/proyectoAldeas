using System;
using System.Threading.Tasks;
using ApiRestAldeas.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ApiRestAldeas.Repositories
{
    public interface IDataModelRepository
    {
        /// <summary>
        /// Metodo para guardar la informacion de 
        /// </summary>
        /// <returns></returns>
        dynamic UploadFile([FromForm] FileInputModel data);
        /// <summary>
        /// Metodo para guardar n proyecto
        /// </summary>
        /// <param name="proyecto">Json con la data de la creacion de un nuevo proyecto
        /// </param>
        /// <returns>Mensaje de respuesta sobre el nuevo registro</returns>
        dynamic  GuardarProyecto([FromBody] String data);

        /// <summary>
        /// Metopdo para obtener los datos de municipios
        /// </summary>
        /// <returns></returns>
        dynamic DatosColombia();

        /// <summary>
        /// Metopdo para obtener los datos de municipios
        /// </summary>
        /// <returns></returns>
        dynamic CentroCostos();


        /// <summary>
        /// /
        /// </summary>
        /// <returns></returns>
        dynamic GuardarRegistroProyecto(ProyectoRequest proyectoRequest);


        #region colaborador

        dynamic GuardarRegistroColaborador(ColaboradorRequest request);

        dynamic ConsultarColaboradorProyecto(long id);


        dynamic ConsultarDetalleColaboradorProyecto(long id);


        dynamic ColaboradorActualizar(ColaboradorRequest request);
 

        #endregion 

        /// <summary>
        /// Metodo para consultar todos los proyectos
        /// </summary>
        /// <returns></returns>
        dynamic ConsultarProyectos();


        dynamic ConsultarParticipantesProyecto(long id);


        dynamic ConsultarDetalleParticipante(long id);



        #region indicadores
        dynamic ConsultarIndicadores();
        dynamic ConsultarPreguntasIndicadores(string id);
        dynamic AsociarIndicadorParticipante(IndicadoresRequest request);
        dynamic ConsultarRespuestasIndicadoresParticipante(long id, long idIndicador);
        dynamic ConsultarIndicadorParticipante(long id);
        dynamic GuardarRegistroParticipantes(RegistroParticipantesRequest request);

        dynamic ActualizarParticipante(RegistroParticipantesRequest request);
        dynamic ActualizarIntegrante(ActualizarIntegrantesRequest request);

        #endregion


        #region Proyectos
        /// <summary>
        /// metodo para Consultar los proyectos para mostrar en las listas tablas.
        /// </summary>
        /// <returns></returns>
        dynamic ConsultarListaProyectos();

        dynamic ConsultarProyectosByID(long id);

        dynamic ConsultarCecosProyectosByID(long id);


        dynamic ActualizarItemProyecto(ItemProyectoRequest proyectoRequest);
        dynamic ActualizarItemInfoFinanciera(InformacionFinancieraRequest proyectoRequest);
        dynamic ActualizarItemFechas(FechasEntregasRequest proyectoRequest);
        dynamic ActualizarItemParticipanteObservaciones(ProyectadosRequest proyectoRequest);
        dynamic ActualizarItemParticipanteLIST(ProyectadosRequest proyectoRequest);
        dynamic ActualizarItemMunicipio(MunicipioRequest proyectoRequest);
        #endregion


        #region Proyectos



        dynamic ConsultarExcelProyectosByID(long id);

        dynamic ExportExcelProyectos();



        dynamic ActualizarEjecucion(EjecucionFinancieraRequest request);

        #endregion


        #region cecos

        dynamic ActualizarCeco(long id, int idSubcentroNuevo);
        #endregion

       
    }
}
