﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.EntityFrame
{
    public class DbProgramas
    {
        [Key]
        public long id { get; set; }

        public string Nombre { get; set; }
        public int id_tipo_programa { get; set; }

        public decimal per_nomina { get; set; }

        public decimal per_capacitacion { get; set; }

        public bool Estado { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechaActualizacion { get; set; }




    }
}
