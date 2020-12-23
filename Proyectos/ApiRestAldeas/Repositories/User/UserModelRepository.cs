using System;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Helper;
using Microsoft.Extensions.Options;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.Repositories.User
{
    public class UserModelRepository : IUserModelRepository
    {

        private readonly IOptions<ConnectionDB> _connectionDB;

        private readonly IContextFactory _factory;

        public UserModelRepository(IOptions<ConnectionDB> connectionDB, IContextFactory factory)
        {
            _connectionDB = connectionDB;
            _factory = factory;
        }


        public dynamic EsAdministrador(string user)
        {
            return UserOperations.EsAdministrador(_factory, _connectionDB, user);
        }
    }
}
