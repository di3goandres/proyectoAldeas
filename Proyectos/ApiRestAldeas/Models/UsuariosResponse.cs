using System;
using System.Collections.Generic;

namespace ApiRestAldeas.Models
{
    public class UsuariosResponse
    {
        public long id { get; set; }
        public string username { get; set; }
        public long IdPerfil { get; set; }
        public string Perfil { get; set; }

    }

    public class UsuariosList
    {
        public UsuariosList()
        {
            ItemsUsarios = new List<UsuariosResponse>();
        }
        public List<UsuariosResponse> ItemsUsarios { get; set; }
    }
}
