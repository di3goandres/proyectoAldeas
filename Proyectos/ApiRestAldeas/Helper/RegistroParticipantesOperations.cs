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


                if (request.FechaSalida != null)
                {

                    request.FechaSalida = Utils.CambiarFecha(request.FechaSalida);
                }

               

                request.FechaNacimiento = Utils.CambiarFecha(request.FechaNacimiento);
                request.FechaIngreso = Utils.CambiarFecha(request.FechaIngreso);



                var nuevo = new RegistroParticipante()
                {
                    idProyecto = request.idProyecto,
                    idMunicipio = request.CodMunicipio,
                    Nombres = request.Nombres,
                    Apellidos = request.Apellidos,
                    FechaNacimiento = request.FechaNacimiento,

                    Edad = request.Edad,
                    FechaIngreso = request.FechaIngreso,
                    FechaSalida = request.FechaSalida,
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

                    Discapacidad = request.Discapacidad,

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
                        Valor = item.esOtro ? item.valorOtro : item.name
                    });
                }
                db.tbRegistroPreguntas.AddRange(preguntas);
                db.SaveChanges();
            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }



        public static dynamic Actualizar(IContextFactory factory, IOptions<ConnectionDB> connection,
           RegistroParticipantesRequest request)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {


                if (request.FechaSalida != null)
                {

                    request.FechaSalida = Utils.CambiarFecha(request.FechaSalida);
                }



                request.FechaNacimiento = Utils.CambiarFecha(request.FechaNacimiento);
                request.FechaIngreso = Utils.CambiarFecha(request.FechaIngreso);


                var registro = from dato in db.tbRegistroParticipantes
                                  where dato.id == request.id
                                  select dato;
                if (registro.Any())
                {



                    registro.First().FechaIngreso = request.FechaIngreso;
                    registro.First().FechaNacimiento = Utils.CambiarFecha(request.FechaNacimiento);
                    registro.First().FechaSalida = Utils.CambiarFecha(request.FechaSalida);

                    registro.First().Nombres = request.Nombres;
                    registro.First().Apellidos = request.Apellidos;
                    registro.First().EstatusResidencia = request.EstatusResidencia;
                    registro.First().Sexo =request.Sexo;
                    registro.First().idMunicipio = request.CodMunicipio;
                    registro.First().Localidad = request.Localidad;
                    registro.First().UltimoCursoAprobado = request.UltimoCursoAprobado;
                    registro.First().AsisteAlColegio = request.AsisteAlColegio;
                    registro.First().GrupoPoblacional = request.GrupoPoblacional;
                    registro.First().GrupoEtnico = request.GrupoEtnico;
                    registro.First().Nacionalidad = request.Nacionalidad;
                    registro.First().Genero = request.Genero;
                    registro.First().TipoParticipante = request.TipoParticipante;
                  
                    registro.First().Discapacidad = request.Discapacidad;
                    registro.First().NivelEscolaridad = request.NivelEscolaridad;
                    db.SaveChanges();
                    id = request.id;

                    db.tbRegistroPreguntas.RemoveRange(db.tbRegistroPreguntas.Where(x => x.idParticipante == id));

                    List<RegistroPreguntas> preguntas = new List<RegistroPreguntas>();
                    db.SaveChanges();

                    foreach (var item in request.Linea)
                    {
                        preguntas.Add(new RegistroPreguntas()
                        {
                            esOtro = item.esOtro,
                            idParticipante = id,
                            Pregunta = item.Pregunta,
                            Valor = item.esOtro ? item.valorOtro : item.name
                        });
                    }
                    db.tbRegistroPreguntas.AddRange(preguntas);
                    db.SaveChanges();

                };

            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }


        public static dynamic ActualizarIntegrantes(IContextFactory factory, IOptions<ConnectionDB> connection,
          ActualizarIntegrantesRequest request)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {



                foreach(var integrante in request.IntegrantesFamilia)
                {

                    var registro = from dato in db.tbIntegrantesFamilia
                                   where dato.id == integrante.id 
                                   select dato;
                    if (registro.Any())
                    {

                        id = integrante.id;
                        registro.First().Rango_0_5 = integrante.Rango_0_5;
                        registro.First().Rango_6_12 = integrante.Rango_6_12;
                        registro.First().Rango_13_17 = integrante.Rango_13_17;
                        registro.First().Rango_18_24 = integrante.Rango_18_24;
                        registro.First().Rango_25_56 = integrante.Rango_25_56;
                        registro.First().Mayores_60 = integrante.Mayores_60;
                        registro.First().Total = integrante.Total;

                        db.SaveChanges();

                    }
                }

                

            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }

        public static dynamic ConsultarDatosParticipante(IContextFactory factory, IOptions<ConnectionDB> connection,
            long idParticipante)
        {
            RegistroParticipanteProyectosResponse retorno = new RegistroParticipanteProyectosResponse();


            using (Aldeas_Context db = factory.Create(connection))
            {

                var ParticipantesRegistrados = from dato in db.tbRegistroParticipantes
                                               join muni in db.tbMunicipios on dato.idMunicipio equals muni.id
                                               join dep in db.tbDepartamentos on muni.cod_dane_departamento equals dep.id_departamento

                                               where dato.id == idParticipante
                                               select new RegistroParticipanteResponse
                                               {
                                                   id = dato.id,
                                                   idProyecto = dato.idProyecto,
                                                   idMunicipio = dato.idMunicipio,
                                                   Municipio = muni.municipio,
                                                   idDepartamento = dep.id_departamento,
                                                   Departamento = dep.departamento,
                                                   Nombres = dato.Nombres,
                                                   Apellidos = dato.Apellidos,
                                                   FechaNacimiento = dato.FechaNacimiento,
                                                   Edad = dato.Edad,
                                                   FechaIngreso = dato.FechaIngreso,
                                                   FechaSalida = dato.FechaSalida,
                                                   Localidad = dato.Localidad,
                                                   Sexo = dato.Sexo,
                                                   EstatusResidencia = dato.EstatusResidencia,
                                                   UltimoCursoAprobado = dato.UltimoCursoAprobado,
                                                   AsisteAlColegio = dato.AsisteAlColegio,
                                                   GrupoPoblacional = dato.GrupoPoblacional,
                                                   GrupoEtnico = dato.GrupoEtnico,
                                                   Nacionalidad = dato.Nacionalidad,
                                                   Genero = dato.Genero,
                                                   TipoParticipante = dato.TipoParticipante,
                                                   Discapacidad = dato.Discapacidad,
                                                   NivelEscolaridad = dato.NivelEscolaridad

                                               };


                if (ParticipantesRegistrados.Any())
                {
                    retorno.Participante = (ParticipantesRegistrados.First());

                    var preguntas = from dato in db.tbRegistroPreguntas
                                    where dato.idParticipante == retorno.Participante.id
                                    select dato;

                    if (preguntas.Any())
                    {
                        retorno.Preguntas = preguntas.ToList();

                    }
                    var integrantes = from dato in db.tbIntegrantesFamilia
                                      where dato.id_participantes == retorno.Participante.id
                                      select dato;

                    if (integrantes.Any())
                    {
                        retorno.IntegrantesFamilia = integrantes.ToList();

                    }
                }
            }

            return retorno;
        }


        public static dynamic ExportParticipantes(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            RegistroParticipanteProyectosResponse retorno = new RegistroParticipanteProyectosResponse();


            using (Aldeas_Context db = factory.Create(connection))
            {

                var ParticipantesRegistrados = from dato in db.tbRegistroParticipantes
                                               join muni in db.tbMunicipios on dato.idMunicipio equals muni.id
                                               join dep in db.tbDepartamentos on muni.cod_dane_departamento equals dep.id_departamento
                                               select new RegistroParticipanteResponse
                                               {
                                                   id = dato.id,
                                                   idProyecto = dato.idProyecto,
                                                   idMunicipio = dato.idMunicipio,
                                                   Municipio = muni.municipio,
                                                   idDepartamento = dep.id_departamento,
                                                   Departamento = dep.departamento,
                                                   Nombres = dato.Nombres,
                                                   Apellidos = dato.Apellidos,
                                                   FechaNacimiento = dato.FechaNacimiento,
                                                   Edad = dato.Edad,
                                                   FechaIngreso = dato.FechaIngreso,
                                                   FechaSalida = dato.FechaSalida,
                                                   Localidad = dato.Localidad,
                                                   Sexo = dato.Sexo,
                                                   EstatusResidencia = dato.EstatusResidencia,
                                                   UltimoCursoAprobado = dato.UltimoCursoAprobado,
                                                   AsisteAlColegio = dato.AsisteAlColegio,
                                                   GrupoPoblacional = dato.GrupoPoblacional,
                                                   GrupoEtnico = dato.GrupoEtnico,
                                                   Nacionalidad = dato.Nacionalidad,
                                                   Genero = dato.Genero,
                                                   TipoParticipante = dato.TipoParticipante,
                                                   Discapacidad = dato.Discapacidad,
                                                   NivelEscolaridad = dato.NivelEscolaridad

                                               };


                if (ParticipantesRegistrados.Any())
                {
                    retorno.ParticipanteLista = ParticipantesRegistrados.ToList();
                    var preguntas = from dato in db.tbRegistroPreguntas
                                   
                                    select dato;

                    if (preguntas.Any())
                    {
                        retorno.Preguntas = preguntas.ToList();

                    }
                    var integrantes = from dato in db.tbIntegrantesFamilia
                                    
                                      select dato;

                    if (integrantes.Any())
                    {
                        retorno.IntegrantesFamilia = integrantes.ToList();
                    }
                }
            }

            return retorno;
        }
    }
}
