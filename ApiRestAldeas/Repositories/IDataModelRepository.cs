using System;
using Newtonsoft.Json.Linq;

namespace ApiRestAldeas.Repositories
{
    public interface IDataModelRepository
    {
        /// <summary>
        /// Metodo para guardar n proyecto
        /// </summary>
        /// <param name="proyecto">Json con la data de la creacion de un nuevo proyecto
        /// </param>
        /// <returns>Mensaje de respuesta sobre el nuevo registro</returns>
        dynamic GuardarProyecto();

        /// <summary>
        /// Metopdo para obtener los datos de municipios
        /// </summary>
        /// <returns></returns>
        dynamic DatosColombia();

    }
}
