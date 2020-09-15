using ApiRestAldeasPresupuesto.EntityFrame;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{
    public class UsuarioProgramaRequest
    {
        public long Usuario { get; set; }

        public long Programa { get; set; }
    }
    public class UsuariosProgramasRequest
    {
        public List<UsuarioProgramaRequest> AgregarPrograma { get; set; }
    }
    public class UsuariosProgramasResponse
    {
        public List<DBAdministrador> Usuarios { get; set; }
    }

    public class UsuariosListaProgramasResponse
    {
        public List<DbProgramas> Programas { get; set; }
    }
}
