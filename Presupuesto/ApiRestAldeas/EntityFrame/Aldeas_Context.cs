using System;
using ApiRestAldeasPresupuesto.EntityFrame;
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
        public virtual DbSet<DBAdministrador> TbAdministradores { get; set; }
        public virtual DbSet<Perfiles> TbPerfiles { get; set; }


        public virtual DbSet<DBUsuariosProgramas> TbUsuariosProgramas { get; set; }

        public virtual DbSet<DbProgramas> TbProgramas { get; set; }

        public virtual DbSet<DbCecos> TbProgramasCecos { get; set; }

        public virtual DbSet<DbRubros> TbRubros { get; set; }
        public virtual DbSet<DbPucs> TbPucs { get; set; }
        public virtual DbSet<DbPresupuesto> TbPresupuestos { get; set; }
        public virtual DbSet<DbPresupuestoPrograma> TbPresupuestosProgramas { get; set; }

        public virtual DbSet<DbTipoPrograma> TbTipoPrograma { get; set; }

        public virtual DbSet<DbCargos> TbCargos { get; set; }

        public virtual DbSet<DbFinanciadores> TbFinanciadores { get; set; }


        public virtual DbSet<DbPresupuestoAnio> TbPresupuestoAnio { get; set; }






        #region Required

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<DbPresupuestoAnio>(entity =>
            {
                entity.ToTable("PresupuestoAnio");
            });

            modelBuilder.Entity<DbFinanciadores>(entity =>
            {
                entity.ToTable("Financiadores");
            });
            modelBuilder.Entity<DbCargos>(entity =>
            {
                entity.ToTable("cargos");
            });
            modelBuilder.Entity<DbTipoPrograma>(entity =>
            {
                entity.ToTable("tipo_programa");
            }); 
            modelBuilder.Entity<DbPresupuestoPrograma>(entity =>
            {
                entity.ToTable("PresupuestoPrograma").Property(x => x.Cargo).HasColumnName("idCargo");
            });

            modelBuilder.Entity<DbPresupuesto>(entity =>
            {
                entity.ToTable("Presupuesto");
            });


            modelBuilder.Entity<DBAdministrador>(entity =>
            {
                entity.ToTable("usuarios_administradores");
            });
            modelBuilder.Entity<Perfiles>(entity =>
            {
                entity.ToTable("Perfiles");


            });

            modelBuilder.Entity<DBUsuariosProgramas>(entity =>
            {
                entity.ToTable("usuario_programa");
            });

            modelBuilder.Entity<DbProgramas>(entity =>
            {
                entity.ToTable("programas");
            });

            modelBuilder.Entity<DbCecos>(entity =>
            {
                entity.ToTable("Cecos");
            });
            modelBuilder.Entity<DbRubros>(entity =>
            {
                entity.ToTable("rubros");
            });
            modelBuilder.Entity<DbPucs>(entity =>
            {
                entity.ToTable("pucs");
            });





        }
        #endregion
    }
}
