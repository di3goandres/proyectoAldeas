using System;
using ApiRestAldeas.EntityFrame;

namespace ApiRestAldeas.Repositories.User
{
    public interface IUserModelRepository
    {
        dynamic EsAdministrador(string user);
        dynamic Agregar(Usuarios user);
        dynamic Eliminar(Usuarios user);
        dynamic ConsultarUsuarios();

    }
}
