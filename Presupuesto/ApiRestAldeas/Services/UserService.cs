using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ApiRestAldeas.Controllers;
using ApiRestAldeas.Entities;
using ApiRestAldeas.Models;
using ApiRestAldeas.Repositories;
using ApiRestAldeasPresupuesto.EntityFrame;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.Services
{
    public interface IUserService
    {
    
        Boolean Existe(DBAdministrador model);

     


        AuthenticateResponse Authenticate(LoginRequest model);
        Task<IEnumerable<User>> GetAll();
    }

    public class UserService : IUserService
    {
        private readonly IDataModelRepository _dataModelRepository;

        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<User> _users = new List<User>
        {
            new User {   Username = "test", Password = "test", DisplayName = "Usuario De pruebas" }
        };

        private const string SAMAccountNameAttribute = "SAMAccountName";
        private const string DisplayName = "DisplayName";

        private readonly Token _appSettings;
        private readonly LdapConfig _config;


        public UserService(IOptions<Token> appSettings, IOptions<LdapConfig> config, IDataModelRepository dataModelRepository)
        {
            _appSettings = appSettings.Value;
            _config = config.Value;
            _dataModelRepository = dataModelRepository;

        }

        public AuthenticateResponse Authenticate(LoginRequest model)
        {
            try
            {
                var user = new User();
                if (model.Username == "local.local")
                {
                    user.DisplayName = "Diego Andres Montealegre Garcia";
                    user.Username = model.Username;
                    user.Perfil = _dataModelRepository.EsAdministrador(user.Username);
                    var token = generateJwtToken(user);

                    return new AuthenticateResponse(user, token);
                }
                else
                {
                    using (DirectoryEntry entry = new DirectoryEntry(_config.Path, _config.UserDomainName + "\\" +
                                       model.Username, model.Password))
                    {
                        using (DirectorySearcher searcher = new DirectorySearcher(entry))
                        {
                            searcher.Filter = String.Format("({0}={1})", SAMAccountNameAttribute, model.Username);
                            searcher.PropertiesToLoad.Add(DisplayName);
                            searcher.PropertiesToLoad.Add(SAMAccountNameAttribute);
                            var result = searcher.FindOne();
                            if (result != null)
                            {
                                var displayName = result.Properties[DisplayName];
                                var sameAccountName = result.Properties[SAMAccountNameAttribute];

                                user.DisplayName = displayName == null || displayName.Count <= 0 ? "" : displayName[0].ToString();
                                user.Username = sameAccountName == null || sameAccountName.Count <= 0 ? "" : sameAccountName[0].ToString();
                                user.Perfil = _dataModelRepository.EsAdministrador(user.Username);
                                var token = generateJwtToken(user);

                                return new AuthenticateResponse(user, token);

                            }
                        }
                    }
                }



            }
            catch (Exception ex)
            {


            }
            return null;


        }


        public Boolean Existe(DBAdministrador model)
        {
            bool existe = false;
            try
            {
                var user = new User();

                using (DirectoryEntry entry = new DirectoryEntry(_config.Path))
                {
                    using (DirectorySearcher searcher = new DirectorySearcher(entry))
                    {
                        searcher.Filter = String.Format("({0}={1})", SAMAccountNameAttribute, model.username);
                        searcher.PropertiesToLoad.Add(DisplayName);
                        searcher.PropertiesToLoad.Add(SAMAccountNameAttribute);
                        var result = searcher.FindOne();
                        if (result != null)
                        {
                            existe = true;
                        }
                    }
                }


            }
            catch (Exception ex)
            {

            }
            return existe;


        }


        public async Task<IEnumerable<User>> GetAll()
        {
            return await Task.Run(() => _users);
        }


        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.JWT_SECRET_KEY);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Username),
                 new Claim("Administrador", user.Administrador.ToString())}),
                //Expires = DateTime.UtcNow.AddDays(7),
                Expires = DateTime.UtcNow.AddHours(12),

                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
