using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.EntityFrame
{
    public class DBAdministrador
    {
        [Key]
        public long id { get; set; }

        public string username { get; set; }
        public bool administrador { get; set; }
        public long IdPerfil { get; set; }


    }


    public class DBUsuariosProgramas
    {
        [Key]
        public long id { get; set; }
        public long id_programa { get; set; }

        public long id_usuario { get; set; }
     

    }
}
