using System;
using ApiRestAldeas.Entities;
using ApiRestAldeas.EntityFrame;
using Microsoft.Extensions.Options;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.Factory
{
    public class ContextFactory : IContextFactory
    {


        public Aldeas_Context Create(IOptions<ConnectionDB> ConnectionDB)
        {
            return new Aldeas_Context(ConnectionDB);
        }
    }
}
