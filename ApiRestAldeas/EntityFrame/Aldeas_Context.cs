using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.EntityFrame
{
    public partial class Aldeas_Context: DbContext
    {


        private readonly IOptions<ConnectionDB> _ConnectionDB;

        public Aldeas_Context( DbContextOptions<Aldeas_Context> options) :
            base(options)
        {
        }
        public Aldeas_Context(IOptions<ConnectionDB> ConnectionDB)
        {
            this._ConnectionDB = ConnectionDB;
        }


        public Aldeas_Context(DbContextOptions<Aldeas_Context> options, IOptions<ConnectionDB> ConnectionDB):
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



        #region Required
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

        }
        #endregion
    }
}
