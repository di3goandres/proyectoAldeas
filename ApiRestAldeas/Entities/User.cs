using System;
using System.Text.Json.Serialization;

namespace ApiRestAldeas.Entities
{
    public class User
    {
       
        public string DisplayName { get; set; }
       
        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
    }
}
