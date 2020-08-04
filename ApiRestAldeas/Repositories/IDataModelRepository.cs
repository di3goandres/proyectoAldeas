﻿using System;
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



    }
}
