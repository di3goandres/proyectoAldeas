using System;
namespace ApiRestAldeas.Repositories.User
{
    public interface IUserModelRepository
    {
        dynamic EsAdministrador(string user);
    }
}
