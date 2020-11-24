using System;
namespace ApiRestAldeas.Helper
{
    public class Utils
    {
        public static DateTime CambiarFecha(DateTime? fecha)
        {
            
            var fechaNueva = Convert.ToDateTime(fecha);
            return new DateTime(fechaNueva.Year, fechaNueva.Month, fechaNueva.Day, 0, 0, 0);
        }
    }
}
