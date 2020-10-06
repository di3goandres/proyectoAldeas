using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeasPresupuesto.EntityFrame;
using ApiRestAldeasPresupuesto.Models;
using ExcelLibrary.SpreadSheet;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;

using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeasPresupuesto.Helper
{
    public class InformesOperations
    {
        public static dynamic GenerarInforme(IContextFactory factory, IOptions<ConnectionDB> connection, PresupuestoProgramRequest request)
        {
            Presupuestodetalle retorno = PresupuestoOperations.ConsultarDetallePresupuestosByProgramas(factory, connection, request);
            string retornoFinal = "";
            try
            {

                string[] files = Directory.GetFiles("Informes/");
                foreach (string file in files)
                {
                    File.Delete(file);
                  
                }

                #region Nomina
                Workbook workbook = new Workbook();
                Worksheet worksheet = new Worksheet("Informes Nomina");
                workbook.Worksheets.Add(worksheet);

                for (int j = 0; j < 100; j++)
                    worksheet.Cells[j, 0] = new ExcelLibrary.SpreadSheet.Cell("");


                worksheet.Cells[0, 0] = new ExcelLibrary.SpreadSheet.Cell("[Informe general nomina Programas]");
                worksheet.Cells[0, 4] = new ExcelLibrary.SpreadSheet.Cell(string.Format("INFORME REALIZADO EL : [{0}]", DateTime.Now), ExcelLibrary.SpreadSheet.CellFormat.Date);
                worksheet.Cells[0, 11] = new ExcelLibrary.SpreadSheet.Cell("NOMINA");
                //for (int i = 0; i < retorno.DetallePresupuesto.Count; i++)
                int i = 0;
                int row = i + 2;

                worksheet.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell("Nombre Rubro");
                worksheet.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell("Clasificacion Gasto");


                worksheet.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell("PROGRAMA");
                worksheet.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell("AÑO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell("CENTRO COSTO");
                worksheet.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE CENTRO COSTO");
                worksheet.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell("SUB CENTRO COSTO");
                worksheet.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE SUB CENTRO COSTO");

               
                worksheet.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell("NUMERO IDENTIFICACION", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE");
                worksheet.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell("% ASIGNACION", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell("CARGO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 12] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE CUENTA");
                worksheet.Cells[row, 13] = new ExcelLibrary.SpreadSheet.Cell("CUENTA SIIGO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 14] = new ExcelLibrary.SpreadSheet.Cell("ENERO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 15] = new ExcelLibrary.SpreadSheet.Cell("FEBRERO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 16] = new ExcelLibrary.SpreadSheet.Cell("MARZO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 17] = new ExcelLibrary.SpreadSheet.Cell("ABRIL", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 18] = new ExcelLibrary.SpreadSheet.Cell("MAYO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 19] = new ExcelLibrary.SpreadSheet.Cell("JUNIO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 20] = new ExcelLibrary.SpreadSheet.Cell("JULIO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 21] = new ExcelLibrary.SpreadSheet.Cell("AGOSTO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 22] = new ExcelLibrary.SpreadSheet.Cell("SEPTIEMBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 23] = new ExcelLibrary.SpreadSheet.Cell("OCTUBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 24] = new ExcelLibrary.SpreadSheet.Cell("NOVIEMBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 25] = new ExcelLibrary.SpreadSheet.Cell("DICIEMBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 26] = new ExcelLibrary.SpreadSheet.Cell("TOTAL", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[row, 27] = new ExcelLibrary.SpreadSheet.Cell("DETALLE GASTO");
                worksheet.Cells[row, 28] = new ExcelLibrary.SpreadSheet.Cell("FACILITY");
                worksheet.Cells[row, 29] = new ExcelLibrary.SpreadSheet.Cell("CUENTA CONTABLE");


                foreach (var data in retorno.DetallePresupuesto.Where(x => x.esNomina == true))
                {
                    row = i + 3;
                    worksheet.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell(data.NombreRubro);
                    worksheet.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell(data.ClasificacionGasto);


                    worksheet.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell(data.Programa);
                    worksheet.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell(data.Anio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell(data.CentroCosto);
                    worksheet.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell(data.NombreCentroCosto);
                    worksheet.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell(data.SubCentroCosto);
                    worksheet.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell(data.NombreSubCentroCosto);

                    var number = Convert.ToInt64(data.NumeroIdentificacion);
                    worksheet.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell(number.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell(data.Nombre);
                    worksheet.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell(Convert.ToInt32(data.Asignacion).ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell(data.Cargo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 12] = new ExcelLibrary.SpreadSheet.Cell(data.NombreCuenta);
                    worksheet.Cells[row, 13] = new ExcelLibrary.SpreadSheet.Cell(data.CuentaSIIGO, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 14] = new ExcelLibrary.SpreadSheet.Cell(data.Enero, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 15] = new ExcelLibrary.SpreadSheet.Cell(data.Febrero, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 16] = new ExcelLibrary.SpreadSheet.Cell(data.Marzo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 17] = new ExcelLibrary.SpreadSheet.Cell(data.Abril, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 18] = new ExcelLibrary.SpreadSheet.Cell(data.Mayo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 19] = new ExcelLibrary.SpreadSheet.Cell(data.Junio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 20] = new ExcelLibrary.SpreadSheet.Cell(data.Julio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 21] = new ExcelLibrary.SpreadSheet.Cell(data.Agosto, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 22] = new ExcelLibrary.SpreadSheet.Cell(data.Septiembre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 23] = new ExcelLibrary.SpreadSheet.Cell(data.Octubre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 24] = new ExcelLibrary.SpreadSheet.Cell(data.Noviembre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 25] = new ExcelLibrary.SpreadSheet.Cell(data.Diciembre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 26] = new ExcelLibrary.SpreadSheet.Cell(data.Total, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 27] = new ExcelLibrary.SpreadSheet.Cell(data.DetalleGasto);
                    worksheet.Cells[row, 28] = new ExcelLibrary.SpreadSheet.Cell(data.Facility);
                    worksheet.Cells[row, 29] = new ExcelLibrary.SpreadSheet.Cell(data.CuentaCotable);

                    i++;
                }



                #endregion
                #region ppto familiar

                Worksheet worksheetFamiliar = new Worksheet("Informes PPTOfamiliar");
                workbook.Worksheets.Add(worksheetFamiliar);

                for (int j = 0; j < 10; j++)
                    worksheetFamiliar.Cells[j, 0] = new ExcelLibrary.SpreadSheet.Cell("");

                worksheetFamiliar.Cells[0, 0] = new ExcelLibrary.SpreadSheet.Cell("[Informe general Programas - PPTO FAMILIAR]");
                worksheetFamiliar.Cells[0, 4] = new ExcelLibrary.SpreadSheet.Cell(string.Format("INFORME REALIZADO EL : [{0}]", DateTime.Now), ExcelLibrary.SpreadSheet.CellFormat.Date);
                worksheetFamiliar.Cells[0, 11] = new ExcelLibrary.SpreadSheet.Cell("FAMILIAR");
                //for (int i = 0; i < retorno.DetallePresupuesto.Count; i++)

                i = 0;
                row = i + 2;


                worksheetFamiliar.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell("Nombre Rubro");
                worksheetFamiliar.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell("Clasificacion Gasto");
                worksheetFamiliar.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell("PROGRAMA");
                worksheetFamiliar.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell("AÑO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell("CENTRO COSTO");
                worksheetFamiliar.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE CENTRO COSTO");
                worksheetFamiliar.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell("SUB CENTRO COSTO");
                worksheetFamiliar.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE SUB CENTRO COSTO");
                worksheetFamiliar.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell("No. CASA", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell("No. KIDS");
                worksheetFamiliar.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE CUENTA");
                worksheetFamiliar.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell("CUENTA SIIGO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 12] = new ExcelLibrary.SpreadSheet.Cell("ENERO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 13] = new ExcelLibrary.SpreadSheet.Cell("FEBRERO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 14] = new ExcelLibrary.SpreadSheet.Cell("MARZO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 15] = new ExcelLibrary.SpreadSheet.Cell("ABRIL", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 16] = new ExcelLibrary.SpreadSheet.Cell("MAYO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 17] = new ExcelLibrary.SpreadSheet.Cell("JUNIO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 18] = new ExcelLibrary.SpreadSheet.Cell("JULIO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 19] = new ExcelLibrary.SpreadSheet.Cell("AGOSTO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 20] = new ExcelLibrary.SpreadSheet.Cell("SEPTIEMBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 21] = new ExcelLibrary.SpreadSheet.Cell("OCTUBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 22] = new ExcelLibrary.SpreadSheet.Cell("NOVIEMBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 23] = new ExcelLibrary.SpreadSheet.Cell("DICIEMBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 24] = new ExcelLibrary.SpreadSheet.Cell("TOTAL", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetFamiliar.Cells[row, 25] = new ExcelLibrary.SpreadSheet.Cell("DETALLE GASTO");
                worksheetFamiliar.Cells[row, 26] = new ExcelLibrary.SpreadSheet.Cell("FACILITY");
                worksheetFamiliar.Cells[row, 27] = new ExcelLibrary.SpreadSheet.Cell("CUENTA CONTABLE");
                foreach (var data in retorno.DetallePresupuesto.Where(x => x.EsPptp == true))
                {
                    row = i + 3;

                    worksheetFamiliar.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell(data.NombreRubro);
                    worksheetFamiliar.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell(data.ClasificacionGasto);


                    worksheetFamiliar.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell(data.Programa);
                    worksheetFamiliar.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell(data.Anio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell(data.CentroCosto);
                    worksheetFamiliar.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell(data.NombreCentroCosto);
                    worksheetFamiliar.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell(data.SubCentroCosto);
                    worksheetFamiliar.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell(data.NombreSubCentroCosto);
                    worksheetFamiliar.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell(Convert.ToInt32(data.NoCasa), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell(Convert.ToInt32(data.NoKids), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell(data.NombreCuenta);
                    worksheetFamiliar.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell(data.CuentaSIIGO);
                    worksheetFamiliar.Cells[row, 12] = new ExcelLibrary.SpreadSheet.Cell(data.Enero, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 13] = new ExcelLibrary.SpreadSheet.Cell(data.Febrero, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 14] = new ExcelLibrary.SpreadSheet.Cell(data.Marzo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 15] = new ExcelLibrary.SpreadSheet.Cell(data.Abril, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 16] = new ExcelLibrary.SpreadSheet.Cell(data.Mayo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 17] = new ExcelLibrary.SpreadSheet.Cell(data.Junio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 18] = new ExcelLibrary.SpreadSheet.Cell(data.Julio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 19] = new ExcelLibrary.SpreadSheet.Cell(data.Agosto, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 20] = new ExcelLibrary.SpreadSheet.Cell(data.Septiembre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 21] = new ExcelLibrary.SpreadSheet.Cell(data.Octubre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 22] = new ExcelLibrary.SpreadSheet.Cell(data.Noviembre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 23] = new ExcelLibrary.SpreadSheet.Cell(data.Diciembre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 24] = new ExcelLibrary.SpreadSheet.Cell(data.Total, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 25] = new ExcelLibrary.SpreadSheet.Cell(data.DetalleGasto, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 26] = new ExcelLibrary.SpreadSheet.Cell(data.Facility, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFamiliar.Cells[row, 27] = new ExcelLibrary.SpreadSheet.Cell(data.CuentaCotable, ExcelLibrary.SpreadSheet.CellFormat.General);
                    i++;
                }

                #endregion


                #region otro ppto

                Worksheet worksheetOtro = new Worksheet("Informes OTRO PPTO");
                workbook.Worksheets.Add(worksheetOtro);

                for (int j = 0; j < 10; j++)
                    worksheetOtro.Cells[j, 0] = new ExcelLibrary.SpreadSheet.Cell("");

                worksheetOtro.Cells[0, 0] = new ExcelLibrary.SpreadSheet.Cell("[Informe general Programas - OTRO PPTO]");
                worksheetOtro.Cells[0, 4] = new ExcelLibrary.SpreadSheet.Cell(string.Format("INFORME REALIZADO EL : [{0}]", DateTime.Now), ExcelLibrary.SpreadSheet.CellFormat.Date);
                worksheetOtro.Cells[0, 11] = new ExcelLibrary.SpreadSheet.Cell("OTRO PPTO");


                i = 0;
                row = i + 2;

                worksheetOtro.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell("Nombre Rubro");
                worksheetOtro.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell("Clasificacion Gasto");
                worksheetOtro.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell("PROGRAMA");
                worksheetOtro.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell("AÑO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell("CENTRO COSTO");
                worksheetOtro.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE CENTRO COSTO");
                worksheetOtro.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell("SUB CENTRO COSTO");
                worksheetOtro.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE SUB CENTRO COSTO");
                worksheetOtro.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE CUENTA");
                worksheetOtro.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell("CUENTA SIIGO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell("ENERO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell("FEBRERO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 12] = new ExcelLibrary.SpreadSheet.Cell("MARZO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 13] = new ExcelLibrary.SpreadSheet.Cell("ABRIL", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 14] = new ExcelLibrary.SpreadSheet.Cell("MAYO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 15] = new ExcelLibrary.SpreadSheet.Cell("JUNIO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 16] = new ExcelLibrary.SpreadSheet.Cell("JULIO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 17] = new ExcelLibrary.SpreadSheet.Cell("AGOSTO", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 18] = new ExcelLibrary.SpreadSheet.Cell("SEPTIEMBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 19] = new ExcelLibrary.SpreadSheet.Cell("OCTUBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 20] = new ExcelLibrary.SpreadSheet.Cell("NOVIEMBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 21] = new ExcelLibrary.SpreadSheet.Cell("DICIEMBRE", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 22] = new ExcelLibrary.SpreadSheet.Cell("TOTAL", ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheetOtro.Cells[row, 23] = new ExcelLibrary.SpreadSheet.Cell("DETALLE GASTO");
                worksheetOtro.Cells[row, 24] = new ExcelLibrary.SpreadSheet.Cell("FACILITY");
                worksheetOtro.Cells[row, 25] = new ExcelLibrary.SpreadSheet.Cell("CUENTA CONTABLE");
                foreach (var data in retorno.DetallePresupuesto.Where(x => x.EsPptp == false && x.esNomina == false))
                {
                    row = i + 3;

                    worksheetOtro.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell(data.NombreRubro);
                    worksheetOtro.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell(data.ClasificacionGasto);


                    worksheetOtro.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell(data.Programa);
                    worksheetOtro.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell(data.Anio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell(data.CentroCosto);
                    worksheetOtro.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell(data.NombreCentroCosto);
                    worksheetOtro.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell(data.SubCentroCosto);
                    worksheetOtro.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell(data.NombreSubCentroCosto);

                    worksheetOtro.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell(data.NombreCuenta);
                    worksheetOtro.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell(data.CuentaSIIGO);
                    worksheetOtro.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell(data.Enero, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell(data.Febrero, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 12] = new ExcelLibrary.SpreadSheet.Cell(data.Marzo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 13] = new ExcelLibrary.SpreadSheet.Cell(data.Abril, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 14] = new ExcelLibrary.SpreadSheet.Cell(data.Mayo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 15] = new ExcelLibrary.SpreadSheet.Cell(data.Junio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 16] = new ExcelLibrary.SpreadSheet.Cell(data.Julio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 17] = new ExcelLibrary.SpreadSheet.Cell(data.Agosto, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 18] = new ExcelLibrary.SpreadSheet.Cell(data.Septiembre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 19] = new ExcelLibrary.SpreadSheet.Cell(data.Octubre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 20] = new ExcelLibrary.SpreadSheet.Cell(data.Noviembre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 21] = new ExcelLibrary.SpreadSheet.Cell(data.Diciembre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 22] = new ExcelLibrary.SpreadSheet.Cell(data.Total, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 23] = new ExcelLibrary.SpreadSheet.Cell(data.DetalleGasto, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 24] = new ExcelLibrary.SpreadSheet.Cell(data.Facility, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetOtro.Cells[row, 25] = new ExcelLibrary.SpreadSheet.Cell(data.CuentaCotable, ExcelLibrary.SpreadSheet.CellFormat.General);
                    i++;
                }

                #endregion


                if (!Directory.Exists("Informes/"))
                {
                    DirectoryInfo di = Directory.CreateDirectory("Informes/");
                }

                var nombre = "Informes/" + DateTime.Now.ToString("yyyyMM-ddHHmmss") + "Informe.xls";
                workbook.Save(nombre);


                retornoFinal = nombre;


            }
            catch (Exception e)
            {
                //new ClientListException("Erreur lors de la conversion en fichier Excel ! erreur : " + e.Message);
            }

            return retornoFinal;
        }

      
    }

}
