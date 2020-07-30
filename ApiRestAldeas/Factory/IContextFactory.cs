using System;
using ApiRestAldeas.EntityFrame;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.Factory
{
    public interface IContextFactory
    {
        Aldeas_Context Create(IOptions<ConnectionDB> ConnectionDB);
    }
}
