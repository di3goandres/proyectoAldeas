using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.Helper
{
    public class RegistroParticipantesOperations
    {
        public static dynamic Guardar(IContextFactory factory, IOptions<ConnectionDB> connection,
            RegistroParticipantesRequest request)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {
                var nuevo = new RegistroParticipante()
                {
                   idProyecto = request.idProyecto,
                   idMunicipio = request.CodMunicipio,
                   Nombres = request.Nombres,
                   Apellidos = request.Apellidos,
                   FechaNacimiento = request.FechaNacimiento,
                   Edad = request.Edad,
                   FechaIngreso = request.FechaIngreso,
                   FechaSalida = request.FechaSalida == null? null : request.FechaSalida,
                   Localidad = request.Localidad,
                   Sexo = request.Sexo,
                   EstatusResidencia = request.EstatusResidencia,
                   UltimoCursoAprobado = request.UltimoCursoAprobado,
                   AsisteAlColegio = request.AsisteAlColegio,
                   GrupoPoblacional = request.GrupoPoblacional,
                   GrupoEtnico = request.GrupoEtnico,
                   Nacionalidad = request.Nacionalidad,
                   Genero = request.Genero,
                   TipoParticipante = request.TipoParticipante,
                  
                   Discapacidad = request.Discapacidad =="SI"? true:false,
                    NivelEscolaridad = request.NivelEscolaridad




                };
                db.tbRegistroParticipantes.Add(nuevo);
                db.SaveChanges();
                id = nuevo.id;
               
                List<DBIntegrantes> listParticipantes = new List<DBIntegrantes>();

                foreach (var item in request.Participantes)
                {
                    listParticipantes.Add(new DBIntegrantes()
                    {
                        id_participantes = id,
                        Nombre = item.Nombre,
                        Rango_0_5 = item.Rango_0_5,
                        Rango_6_12 = item.Rango_6_12,
                        Rango_13_17 = item.Rango_13_17,
                        Rango_18_24 = item.Rango_18_24,
                        Rango_25_56 = item.Rango_25_56,
                        Mayores_60 = item.Mayores_60,
                        Total = item.Total,
                        TotalDesagregado = item.TotalDesagregado,
                        Porcentaje = item.Porcentaje
                    });
                }
               
                db.tbIntegrantesFamilia.AddRange(listParticipantes);
                List<RegistroPreguntas> preguntas = new List<RegistroPreguntas>();

                foreach (var item in request.Linea)
                {
                    preguntas.Add(new RegistroPreguntas()
                    {
                        esOtro = item.esOtro,
                        idParticipante = id,
                        Pregunta = item.Pregunta,
                        Valor = item.esOtro?  item.valorOtro : item.name
                    });
                }
                db.tbRegistroPreguntas.AddRange(preguntas);
                db.SaveChanges();
            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }

    }
}
