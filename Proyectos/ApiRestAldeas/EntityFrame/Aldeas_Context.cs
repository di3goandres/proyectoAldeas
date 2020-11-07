using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.EntityFrame
{
    public partial class Aldeas_Context : DbContext
    {


        private readonly IOptions<ConnectionDB> _ConnectionDB;

        public Aldeas_Context(DbContextOptions<Aldeas_Context> options) :
            base(options)
        {
        }
        public Aldeas_Context(IOptions<ConnectionDB> ConnectionDB)
        {
            this._ConnectionDB = ConnectionDB;
        }


        public Aldeas_Context(DbContextOptions<Aldeas_Context> options, IOptions<ConnectionDB> ConnectionDB) :
             base(options)
        {
            this._ConnectionDB = ConnectionDB;
        }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_ConnectionDB.Value.Conexion);
        }
        public virtual DbSet<Proyectos> tbProyectos { get; set; }

        public virtual DbSet<Departamentos> tbDepartamentos { get; set; }
        public virtual DbSet<Municipios> tbMunicipios { get; set; }
        public virtual DbSet<CentroCostos> tbCentros { get; set; }

        public virtual DbSet<SubCentroCostos> tbSubcentros { get; set; }
        public virtual DbSet<FechasEntregas> tbFechaEntregas { get; set; }

        public virtual DbSet<MunicipioProyectos> tbMunicipioProyectos { get; set; }
        public virtual DbSet<InformacionFinanciera> tbInformacionFinanciera { get; set; }
        public virtual DbSet<TbEjecucion> tbEjecucion { get; set; }
        public virtual DbSet<DBParticipantes> tbParticipantes { get; set; }
        public virtual DbSet<DBParticipantesProyectados> tbParticipantesProyectados { get; set; }
        public virtual DbSet<TbColaborador> TbColaboradors { get; set; }

        public virtual DbSet<ColaboradorInforFinanciera> TbCICentroCostos { get; set; }


        #region Registro Participantes

        public virtual DbSet<DBIntegrantes> tbIntegrantesFamilia { get; set; }

        public virtual DbSet<RegistroParticipante> tbRegistroParticipantes { get; set; }

        public virtual DbSet<RegistroPreguntas> tbRegistroPreguntas { get; set; }


        #endregion

        #region indicadores
        public virtual DbSet<DBIndicadores> tbIndicadores { get; set; }
        public virtual DbSet<DBIndicadoresPreguntas> TbIndicadoresPreguntas { get; set; }
        public virtual DbSet<DBIndicadorComplemento> TbIndicadorComplemento { get; set; }
        #endregion

        #region Required

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DBIndicadorComplemento>(entity =>
            {
                entity.ToTable("Indicadores_PreguntasComplemento");
   

            });

            modelBuilder.Entity<DBIndicadoresPreguntas>(entity =>
            {
                entity.ToTable("Indicadores_preguntas");

            });

            modelBuilder.Entity<DBIndicadores>(entity =>
                       {
                           entity.ToTable("Indicadores");

                       });

            modelBuilder.Entity<RegistroParticipante>(entity =>
            {
                entity.ToTable("RegistroParticipantes");

            });
            modelBuilder.Entity<RegistroPreguntas>(entity =>
            {
                entity.ToTable("ParticipantePreguntas");
            });
            modelBuilder.Entity<DBIntegrantes>(entity =>
            {
                entity.ToTable("integrantesFamilia");
                entity.Property(e => e.id_participantes).HasColumnName("id_registroParticipante");
            });

            modelBuilder.Entity<ColaboradorInforFinanciera>(entity =>
            {
                entity.ToTable("Colaborador_InfoFinanciera_centrosCostos");
            });

            modelBuilder.Entity<TbColaborador>(entity =>
            {
                entity.ToTable("colaboradores");
            });
            modelBuilder.Entity<DBParticipantesProyectados>(entity =>
            {
                entity.ToTable("participante_proyectados");
            });

            modelBuilder.Entity<DBParticipantes>(entity =>
            {
                entity.ToTable("participantes");
                entity.Property(e => e.id_participantes).HasColumnName("id_participantes");

            });

            modelBuilder.Entity<Proyectos>(entity =>
            {
                entity.ToTable("Proyectos");
            });

            modelBuilder.Entity<Municipios>(entity =>
            {
                entity.ToTable("municipios");
            });

            modelBuilder.Entity<Departamentos>(entity =>
            {
                entity.ToTable("departamentos");
            });

            modelBuilder.Entity<CentroCostos>(entity =>
            {
                entity.ToTable("CentroCostos");
            });
            modelBuilder.Entity<SubCentroCostos>(entity =>
            {
                entity.ToTable("SubCentroCostos");
            });
            modelBuilder.Entity<FechasEntregas>(entity =>
            {
                entity.ToTable("fecha_entregas");
            });
            modelBuilder.Entity<MunicipioProyectos>(entity =>
            {
                entity.ToTable("municipios_proyecto");
            });

            modelBuilder.Entity<InformacionFinanciera>(entity =>
            {
                entity.ToTable("infoFinanciera");
            });


            modelBuilder.Entity<TbEjecucion>(entity =>
            {
                entity.ToTable("ejecucion_financiera");
            });



        }
        #endregion
    }
}
