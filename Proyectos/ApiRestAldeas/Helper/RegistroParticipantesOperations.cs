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



                    registro.First().FechaIngreso = Utils.CambiarFecha(request.FechaIngreso); ;
                    registro.First().FechaNacimiento = Utils.CambiarFecha(request.FechaNacimiento);
                    if (request.FechaSalida != null)
                    {
                        registro.First().FechaSalida = Utils.CambiarFecha(request.FechaSalida);
                    }
                    else
                    {
                        registro.First().FechaSalida = null;
                    }

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


        public static dynamic ConsultarCopiarIntegrante(IContextFactory factory, IOptions<ConnectionDB> connection,
        UsuarioCambio usuarioCambio)
        {
      

            RegistroParticipantesProyectosResponse retorno = new RegistroParticipantesProyectosResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {


            

                

                var registradors = (from dato in db.tbRegistroParticipantes//.Where(x => x.id_origen != null).Select(p => p.id_origen).ToList();
                                   where dato.id_origen != null && dato.idProyecto == usuarioCambio.ProyectoDestino
                                    select new
                                   {
                                       id = Convert.ToInt64( dato.id_origen)
                                   }).ToList();
                var ParticipantesRegistrados = from dato in db.tbRegistroParticipantes
                                               join muni in db.tbMunicipios on dato.idMunicipio equals muni.id
                                               join dep in db.tbDepartamentos on muni.cod_dane_departamento equals dep.id_departamento
                                               where dato.idProyecto == usuarioCambio.ProyectoOrigen
                                               && !registradors.Select(x=> x.id).Contains(dato.id)
                                               select new RegistroParticipanteResponse
                                               {
                                                   id = dato.id,
                                                   idProyecto = dato.idProyecto,
                                                   idMunicipio = dato.idMunicipio,
                                                   Municipio = muni.municipio,
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
                    var datos = registradors.ToArray();

                    retorno.Registros = ParticipantesRegistrados.ToList();
                }
            }


            return retorno;

        }


        public static dynamic CopiarIntegrante(IContextFactory factory, IOptions<ConnectionDB> connection,
        UsuarioCambio usuarioCambio)
        {
            RegistroParticipanteProyectosResponse retorno = new RegistroParticipanteProyectosResponse();

            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {

                var mismoMovimiento = from dato in db.tbRegistroParticipantes

                                      where dato.id == usuarioCambio.Participante
                                      && dato.idProyecto == usuarioCambio.ProyectoOrigen && dato.id_origen != null
                                      select dato;

                if (mismoMovimiento.Any())
                {
                    var mismo = from dato in db.tbRegistroParticipantes

                                where dato.id == mismoMovimiento.First().id_origen
                                 && dato.idProyecto == usuarioCambio.ProyectoDestino
                                select dato;

                    if (mismo.Any())
                    {
                        return new { id = id, status = "El Participante que intentas copiar ya existe en este proyecto", code = 400 };
                    }


                }
                var ParticipanteOrigen = from dato in db.tbRegistroParticipantes
                                               where dato.id == usuarioCambio.Participante
                                               select dato;

                //var participantesDestino = from dato in db.tbRegistroParticipantes
                //                         where dato.id_origen == usuarioCambio.Participante
                //                         && dato.idProyecto == usuarioCambio.ProyectoDestino

                //                         select dato;

                //if (participantesDestino.Any())
                //{
                //    return new { id = id, status = "Ya se ha copiado previamente este participante a este proyecto.", code = 400 };

                //}
                if (ParticipanteOrigen.Any())
                {
                    var datosNuevo = ParticipanteOrigen.First();
                    var nuevo = new RegistroParticipante()
                    {
                        idProyecto = usuarioCambio.ProyectoDestino,
                        idMunicipio = datosNuevo.idMunicipio,
                        Nombres = datosNuevo.Nombres,
                        Apellidos = datosNuevo.Apellidos,
                        FechaNacimiento = datosNuevo.FechaNacimiento,

                        Edad = datosNuevo.Edad,
                        FechaIngreso = datosNuevo.FechaIngreso,
                        FechaSalida = datosNuevo.FechaSalida,
                        Localidad = datosNuevo.Localidad,
                        Sexo = datosNuevo.Sexo,
                        EstatusResidencia = datosNuevo.EstatusResidencia,
                        UltimoCursoAprobado = datosNuevo.UltimoCursoAprobado,
                        AsisteAlColegio = datosNuevo.AsisteAlColegio,
                        GrupoPoblacional = datosNuevo.GrupoPoblacional,
                        GrupoEtnico = datosNuevo.GrupoEtnico,
                        Nacionalidad = datosNuevo.Nacionalidad,
                        Genero = datosNuevo.Genero,
                        TipoParticipante = datosNuevo.TipoParticipante,

                        Discapacidad = datosNuevo.Discapacidad,

                        NivelEscolaridad = datosNuevo.NivelEscolaridad,
                        id_origen = usuarioCambio.Participante

                    };
                    db.tbRegistroParticipantes.Add(nuevo);
               
                    db.SaveChanges();

                    id = nuevo.id;


                    var preguntas = from dato in db.tbRegistroPreguntas
                                    where dato.idParticipante == usuarioCambio.Participante
                                    select dato;

                    if (preguntas.Any())
                    {
                       var datosPreguntas = preguntas.ToList();

                        List<RegistroPreguntas> preguntasCopia = new List<RegistroPreguntas>();

                        foreach (var item in datosPreguntas)
                        {
                            preguntasCopia.Add(new RegistroPreguntas()
                            {
                                esOtro = item.esOtro,
                                idParticipante = nuevo.id,
                                Pregunta = item.Pregunta,
                                Valor = item.Valor
                            });
                        }
                        db.tbRegistroPreguntas.AddRange(preguntasCopia);
                        db.SaveChanges();

                    }
                    var integrantes = from dato in db.tbIntegrantesFamilia
                                      where dato.id_participantes == usuarioCambio.Participante
                                      select dato;

                    if (integrantes.Any())
                    {
                        retorno.IntegrantesFamilia = integrantes.ToList();

                        List<DBIntegrantes> listParticipantes = new List<DBIntegrantes>();

                        foreach (var item in retorno.IntegrantesFamilia)
                        {
                            listParticipantes.Add(new DBIntegrantes()
                            {
                                id_participantes = nuevo.id,
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
                        db.SaveChanges();

                    }
                }
            }

            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };

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

        public static dynamic ExportParticipantesIntegrantes(IContextFactory factory, IOptions<ConnectionDB> connection, long IdProyecto)
        {
            List<DBIntegrantes>   retorno = new List<DBIntegrantes>()  ;


            using (Aldeas_Context db = factory.Create(connection))
            {

       
                var integrantes = from dato in db.tbIntegrantesFamilia
                                    join rp in db.tbRegistroParticipantes on dato.id_participantes equals rp.id
                                    where rp.idProyecto == IdProyecto
                                    select dato;

                if (integrantes.Any())
                {
                    retorno = integrantes.ToList();
                }
                
            }

            return retorno;
        }
    }
}
