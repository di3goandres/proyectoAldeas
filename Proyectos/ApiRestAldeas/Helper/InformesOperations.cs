using System;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Models;
using Microsoft.Extensions.Options;
using static ApiRestAldeas.Entities.Appsettings;
using System.IO;
using ExcelLibrary.SpreadSheet;


namespace ApiRestAldeas.Helper
{
    public class InformesOperations
    {
        public static dynamic GenerarInforme(IContextFactory factory, IOptions<ConnectionDB> connection, long id)
        {
            ProyectoUnicoResponse retorno = ProyectoOperations.ConsultarProyectobyID(factory, connection, id);
            string retornoFinal = "";
            try
            {
                if (Directory.Exists("Informes/"))
                {

                    string[] files = Directory.GetFiles("Informes/");
                    foreach (string file in files)
                    {
                        File.Delete(file);

                    }

                }



                #region Proyecto
                int countFechas = 0;
                Workbook workbook = new Workbook();
                Worksheet worksheet = new Worksheet("Informes Proyecto");
              

                for (int j = 0; j < 100; j++)
                    worksheet.Cells[j, 0] = new ExcelLibrary.SpreadSheet.Cell("");

             
                worksheet.Cells[0, 0] = new ExcelLibrary.SpreadSheet.Cell("[Informe general Proyecto]");
                worksheet.Cells[0, 4] = new ExcelLibrary.SpreadSheet.Cell(string.Format("INFORME REALIZADO EL : [{0}]", DateTime.Now), ExcelLibrary.SpreadSheet.CellFormat.Date);
                worksheet.Cells[0, 6] = new ExcelLibrary.SpreadSheet.Cell("PROYECTO");
                //for (int i = 0; i < retorno.DetallePresupuesto.Count; i++)
                int i = 0;
                int row = i + 2;

                worksheet.Cells[1, 0] = new ExcelLibrary.SpreadSheet.Cell("INFORMACION GENERAL");
                worksheet.Cells[2, 0] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE");
                worksheet.Cells[2, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.nombre, ExcelLibrary.SpreadSheet.CellFormat.General);


                worksheet.Cells[3, 0] = new ExcelLibrary.SpreadSheet.Cell("ESTATUS");
                worksheet.Cells[3, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.status, ExcelLibrary.SpreadSheet.CellFormat.General);



                worksheet.Cells[4, 0] = new ExcelLibrary.SpreadSheet.Cell("DONANTE");
                worksheet.Cells[4, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.donante, ExcelLibrary.SpreadSheet.CellFormat.General);

                worksheet.Cells[5, 0] = new ExcelLibrary.SpreadSheet.Cell("TIPO FINANCIACION");
                worksheet.Cells[5, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.tipo_financiacion, ExcelLibrary.SpreadSheet.CellFormat.General);

                worksheet.Cells[6, 0] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE DONANTE");
                worksheet.Cells[6, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.nombre_donante, ExcelLibrary.SpreadSheet.CellFormat.General);

                worksheet.Cells[7, 0] = new ExcelLibrary.SpreadSheet.Cell("DIRECCION");
                worksheet.Cells[7, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.direccion, ExcelLibrary.SpreadSheet.CellFormat.General);

                worksheet.Cells[8, 0] = new ExcelLibrary.SpreadSheet.Cell("EMAIL");
                worksheet.Cells[8, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.email, ExcelLibrary.SpreadSheet.CellFormat.General);




                worksheet.Cells[2, 3] = new ExcelLibrary.SpreadSheet.Cell("FECHA INICIO");
                worksheet.Cells[2, 4] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.fecha_inicio, ExcelLibrary.SpreadSheet.CellFormat.Date);


                worksheet.Cells[3, 3] = new ExcelLibrary.SpreadSheet.Cell("FECHA FIN");
                worksheet.Cells[3, 4] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.fecha_finalizacion, ExcelLibrary.SpreadSheet.CellFormat.Date);


                worksheet.Cells[4, 3] = new ExcelLibrary.SpreadSheet.Cell("LIDER EJECUCION");
                worksheet.Cells[4, 4] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.lider_ejecucion, ExcelLibrary.SpreadSheet.CellFormat.General);

                worksheet.Cells[5, 3] = new ExcelLibrary.SpreadSheet.Cell("LIDER COORDINACION");
                worksheet.Cells[5, 4] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.lider_coordinacion, ExcelLibrary.SpreadSheet.CellFormat.General);


                worksheet.Cells[6, 3] = new ExcelLibrary.SpreadSheet.Cell("COMITE TECNICO");
                worksheet.Cells[6, 4] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.comite_tecnico, ExcelLibrary.SpreadSheet.CellFormat.General);

                worksheet.Cells[7, 3] = new ExcelLibrary.SpreadSheet.Cell("TIPO IMPLEMENTACION");
                worksheet.Cells[7, 4] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.tipo_implementacion, ExcelLibrary.SpreadSheet.CellFormat.General);


                worksheet.Cells[8, 3] = new ExcelLibrary.SpreadSheet.Cell("REQUIERE LIQUIDACION");
                worksheet.Cells[8, 4] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyecto.requiereLiquidacion==true? "SI":"NO", ExcelLibrary.SpreadSheet.CellFormat.General);


                worksheet.Cells[10, 0] = new ExcelLibrary.SpreadSheet.Cell("INFORMACION GENERAL FINANCIERA");




                worksheet.Cells[11, 0] = new ExcelLibrary.SpreadSheet.Cell("CONTRAPARTIDA");
                worksheet.Cells[11, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.fuente, ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[11, 2] = new ExcelLibrary.SpreadSheet.Cell("$ CONTRAPARTIDA");
                worksheet.Cells[11, 3] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.plataContrapartida, ExcelLibrary.SpreadSheet.CellFormat.General);


                worksheet.Cells[12, 0] = new ExcelLibrary.SpreadSheet.Cell("APORTE DONANTE");
                worksheet.Cells[12, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.tipoFuente, ExcelLibrary.SpreadSheet.CellFormat.General);

                worksheet.Cells[12, 2] = new ExcelLibrary.SpreadSheet.Cell("$ APORTE DONANTE");
                worksheet.Cells[12, 3] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.plataDonante, ExcelLibrary.SpreadSheet.CellFormat.General);


                worksheet.Cells[13, 0] = new ExcelLibrary.SpreadSheet.Cell("MONEDA DONACION");
                worksheet.Cells[13, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.monedaDonacion, ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[13, 2] = new ExcelLibrary.SpreadSheet.Cell("TASA DE CAMBIO");
                worksheet.Cells[13, 3] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.tasacambio, ExcelLibrary.SpreadSheet.CellFormat.General);



                worksheet.Cells[14, 0] = new ExcelLibrary.SpreadSheet.Cell("CUENTA");
                worksheet.Cells[14, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.cuenta, ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[14, 2] = new ExcelLibrary.SpreadSheet.Cell("NAVISION");
                worksheet.Cells[14, 3] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.navision, ExcelLibrary.SpreadSheet.CellFormat.General);


                worksheet.Cells[15, 0] = new ExcelLibrary.SpreadSheet.Cell("RESPONSABLE");
                worksheet.Cells[15, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.responsable, ExcelLibrary.SpreadSheet.CellFormat.General);
                worksheet.Cells[15, 2] = new ExcelLibrary.SpreadSheet.Cell("LUGAR");
                worksheet.Cells[15, 3] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.lugar, ExcelLibrary.SpreadSheet.CellFormat.General);


                worksheet.Cells[16, 0] = new ExcelLibrary.SpreadSheet.Cell("COSTO TOTAL");
                worksheet.Cells[16, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemFinanciera.costoTotal.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);



                worksheet.Cells[18, 0] = new ExcelLibrary.SpreadSheet.Cell("EJECUCION DEL PROYECTO");
                worksheet.Cells[19, 0] = new ExcelLibrary.SpreadSheet.Cell("DESCRIPCION");
                worksheet.Cells[19, 1] = new ExcelLibrary.SpreadSheet.Cell("ENERO");
                worksheet.Cells[19, 2] = new ExcelLibrary.SpreadSheet.Cell("FEBRERO");
                worksheet.Cells[19, 3] = new ExcelLibrary.SpreadSheet.Cell("MARZO");
                worksheet.Cells[19, 4] = new ExcelLibrary.SpreadSheet.Cell("ABRIL");
                worksheet.Cells[19, 5] = new ExcelLibrary.SpreadSheet.Cell("MAYO");
                worksheet.Cells[19, 6] = new ExcelLibrary.SpreadSheet.Cell("JUNIO");
                worksheet.Cells[19, 7] = new ExcelLibrary.SpreadSheet.Cell("JULIO");
                worksheet.Cells[19, 8] = new ExcelLibrary.SpreadSheet.Cell("AGOSTO");
                worksheet.Cells[19, 9] = new ExcelLibrary.SpreadSheet.Cell("SEPTIEMBRE");
                worksheet.Cells[19, 10] = new ExcelLibrary.SpreadSheet.Cell("OCTUBRE");
                worksheet.Cells[19, 11] = new ExcelLibrary.SpreadSheet.Cell("NOVIEMBRE");
                worksheet.Cells[19, 12] = new ExcelLibrary.SpreadSheet.Cell("DICIEMBRE");


                i = 20;

                foreach (var dta in retorno.ItemsEjecucion)
                {
                   
                    row = i;
                    worksheet.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell(dta.Nombre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell(dta.Enero.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell(dta.Febrero.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell(dta.Marzo.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell(dta.Abril.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell(dta.Mayo.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell(dta.Junio.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell(dta.Julio.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell(dta.Agosto.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell(dta.Sept.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell(dta.Octubre.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell(dta.Noviembre.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheet.Cells[row, 12] = new ExcelLibrary.SpreadSheet.Cell(dta.Diciembre.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);

                    i++;


                }




                worksheet.Cells.ColumnWidth[0, 1] = 8000;




                worksheet.Cells.ColumnWidth[2, 12] = 6000;
                workbook.Worksheets.Add(worksheet);

                #endregion

                #region Participantes
                Worksheet worksheetParticiantes = new Worksheet("Inf Participantes Proyectados");

                for (int j = 0; j < 100; j++)
                    worksheetParticiantes.Cells[j, 0] = new ExcelLibrary.SpreadSheet.Cell("");


                worksheetParticiantes.Cells[0, 0] = new ExcelLibrary.SpreadSheet.Cell("[Informe general Proyecto - Participantes]");
                worksheetParticiantes.Cells[0, 4] = new ExcelLibrary.SpreadSheet.Cell(string.Format("INFORME REALIZADO EL : [{0}]", DateTime.Now), ExcelLibrary.SpreadSheet.CellFormat.Date);
                worksheetParticiantes.Cells[0, 6] = new ExcelLibrary.SpreadSheet.Cell("PROYECTO - PARTICIPANTES PROYECTADOS");


                worksheetParticiantes.Cells[1, 0] = new ExcelLibrary.SpreadSheet.Cell("INFORMACION GENERAL");
                worksheetParticiantes.Cells[2, 0] = new ExcelLibrary.SpreadSheet.Cell("TOTAL FAMILIAS");
                worksheetParticiantes.Cells[2, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyectados.TotalFamilias.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);


                worksheetParticiantes.Cells[3, 0] = new ExcelLibrary.SpreadSheet.Cell("OBSERVACIONES");
                worksheetParticiantes.Cells[3, 1] = new ExcelLibrary.SpreadSheet.Cell(retorno.ItemProyectados.Observaciones, ExcelLibrary.SpreadSheet.CellFormat.General);




                i = 3;
                row = i + 2;
                worksheetParticiantes.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell("DESCRIPCION");
                worksheetParticiantes.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell("RANGO 0 A 5 AÑOS");
                worksheetParticiantes.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell("RANGO 6 A 12 AÑOS");
                worksheetParticiantes.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell("RANGO 13 A 17 AÑOS");
                worksheetParticiantes.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell("RANGO 18 A 24 AÑOS");
                worksheetParticiantes.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell("RANGO 25 A 56 AÑOS");

                worksheetParticiantes.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell("MAYORES A 60 AÑOS");
                worksheetParticiantes.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell("TOTAL");
                worksheetParticiantes.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell("TOTAL DESAGREGADO");
                worksheetParticiantes.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell("PORCENTAJE");
                countFechas = 0;
                foreach (var DTA in retorno.ItemProyectados.ListParticipantes)
                {
                    countFechas++;
                    row = i + 3;
                    worksheetParticiantes.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell(DTA.Nombre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetParticiantes.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell(DTA.Rango_0_5.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetParticiantes.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell(DTA.Rango_6_12.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetParticiantes.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell(DTA.Rango_13_17.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetParticiantes.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell(DTA.Rango_18_24.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetParticiantes.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell(DTA.Rango_25_56.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetParticiantes.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell(DTA.Mayores_60.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetParticiantes.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell(DTA.Total.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetParticiantes.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell(DTA.TotalDesagregado.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetParticiantes.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell(DTA.Porcentaje.ToString() + "%", ExcelLibrary.SpreadSheet.CellFormat.General);
                    i++;

                }
                countFechas = 0;
                worksheetParticiantes.Cells.ColumnWidth[0, 10] = 6000;
                workbook.Worksheets.Add(worksheetParticiantes);
                #endregion
                #region fechas
                Worksheet worksheetFechas = new Worksheet("Informes Fechas");

                for (int j = 0; j < 100; j++)
                    worksheetFechas.Cells[j, 0] = new ExcelLibrary.SpreadSheet.Cell("");

                worksheetFechas.Cells[0, 0] = new ExcelLibrary.SpreadSheet.Cell("[Informe general Proyecto - Fechas]");
                worksheetFechas.Cells[0, 4] = new ExcelLibrary.SpreadSheet.Cell(string.Format("INFORME REALIZADO EL : [{0}]", DateTime.Now), ExcelLibrary.SpreadSheet.CellFormat.Date);
                worksheetFechas.Cells[0, 6] = new ExcelLibrary.SpreadSheet.Cell("PROYECTO - FECHAS");



                i = 0;
                row = i + 2;
                worksheetFechas.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell("#");
                worksheetFechas.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell("FECHA");
                worksheetFechas.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell("TIPO FECHA");
                countFechas = 0;

                foreach (var dtaFecha in retorno.ItemsFechas)
                {
                    countFechas++;
                    row = i + 3;
                    worksheetFechas.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell(countFechas, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetFechas.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell(dtaFecha.fecha , ExcelLibrary.SpreadSheet.CellFormat.Date);
                    worksheetFechas.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell(dtaFecha.tipo_fecha, ExcelLibrary.SpreadSheet.CellFormat.General);
                    i++;


                }
                worksheetFechas.Cells.ColumnWidth[0, 6] = 6000;
                workbook.Worksheets.Add(worksheetFechas);
                #endregion


                #region cecos
                Worksheet worksheetCecos = new Worksheet("Informes Cecos");

                for (int j = 0; j < 100; j++)
                    worksheetCecos.Cells[j, 0] = new ExcelLibrary.SpreadSheet.Cell("");


                worksheetCecos.Cells[0, 0] = new ExcelLibrary.SpreadSheet.Cell("[Informe general Proyecto - Cecos]");
                worksheetCecos.Cells[0, 4] = new ExcelLibrary.SpreadSheet.Cell(string.Format("INFORME REALIZADO EL : [{0}]", DateTime.Now), ExcelLibrary.SpreadSheet.CellFormat.Date);
                worksheetCecos.Cells[0, 5] = new ExcelLibrary.SpreadSheet.Cell("PROYECTO - CECOS");



                i = 0;
                row = i + 2;
                worksheetCecos.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell("#");
                worksheetCecos.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell("CECO");

                countFechas = 0;

                foreach (var DTA in retorno.ItemsCentroCostos)
                {
                    countFechas++;
                    row = i + 3;
                    worksheetCecos.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell(countFechas, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetCecos.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell(DTA.Codigo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    i++;


                }
                worksheetCecos.Cells.ColumnWidth[0, 6] = 6000;
                workbook.Worksheets.Add(worksheetCecos);
                #endregion
                #region Municipios
                Worksheet worksheetMunicipios = new Worksheet("Informes Municipios");

                for (int j = 0; j < 100; j++)
                    worksheetMunicipios.Cells[j, 0] = new ExcelLibrary.SpreadSheet.Cell("");


                worksheetMunicipios.Cells[0, 0] = new ExcelLibrary.SpreadSheet.Cell("[Informe general Proyecto - Municipios]");
                worksheetMunicipios.Cells[0, 4] = new ExcelLibrary.SpreadSheet.Cell(string.Format("INFORME REALIZADO EL : [{0}]", DateTime.Now), ExcelLibrary.SpreadSheet.CellFormat.Date);
                worksheetMunicipios.Cells[0, 6] = new ExcelLibrary.SpreadSheet.Cell("PROYECTO - FECHAS");



                i = 0;
                row = i + 2;
                worksheetMunicipios.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell("#");
                worksheetMunicipios.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell("DEPARTAMENTO");
                worksheetMunicipios.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell("MUNICIPIO");

                countFechas = 0;
                foreach (var DTA in retorno.ItemsMunicipios)
                {
                    countFechas++;
                    row = i + 3;
                    worksheetMunicipios.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell(countFechas, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetMunicipios.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell(DTA.id_departamento, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetMunicipios.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell(DTA.id_municipio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    i++;


                }
                worksheetMunicipios.Cells.ColumnWidth[0, 6] = 6000;
                workbook.Worksheets.Add(worksheetMunicipios);
                #endregion


                #region COLABORADORES
                ColaboradorResponse colaboradorResponse = ColaboradoresOperations.ConsultarColaboradoresProyecto(factory, connection, id);

                Worksheet worksheetColaborador = new Worksheet("Colaboradores");

                for (int j = 0; j < 100; j++)
                    worksheetColaborador.Cells[j, 0] = new ExcelLibrary.SpreadSheet.Cell("");

                worksheetColaborador.Cells[0, 0] = new ExcelLibrary.SpreadSheet.Cell("[Informe general Proyecto - Colaboradores]");
                worksheetColaborador.Cells[0, 4] = new ExcelLibrary.SpreadSheet.Cell(string.Format("INFORME REALIZADO EL : [{0}]", DateTime.Now), ExcelLibrary.SpreadSheet.CellFormat.Date);
                worksheetColaborador.Cells[0, 6] = new ExcelLibrary.SpreadSheet.Cell("PROYECTO - COLABORADORES");



                i = 0;
                row = i + 2;
                worksheetColaborador.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell("#");
                worksheetColaborador.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell("NOMBRE");
                worksheetColaborador.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell("FECHA NACIMIENTO");
                worksheetColaborador.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell("CARGO");
                worksheetColaborador.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell("TIEMPO");
                worksheetColaborador.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell("TIPO CONTRATO");
                worksheetColaborador.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell("FECHA INICIO");
                worksheetColaborador.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell("FECHA FIN");
                worksheetColaborador.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell("COSTO MENSUAL");
                worksheetColaborador.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell("PORCENTAJE");
                worksheetColaborador.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell("CONTRAPARTIDA");
                worksheetColaborador.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell("APORTE");
            

                countFechas = 0;

                foreach (var DTA in colaboradorResponse.ItemsColaboradores)
                {
                    countFechas++;
                    row = i + 3;
                    worksheetColaborador.Cells[row, 0] = new ExcelLibrary.SpreadSheet.Cell(countFechas, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetColaborador.Cells[row, 1] = new ExcelLibrary.SpreadSheet.Cell(DTA.Nombre, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetColaborador.Cells[row, 2] = new ExcelLibrary.SpreadSheet.Cell(DTA.FechaNacimiento, ExcelLibrary.SpreadSheet.CellFormat.Date);
                    worksheetColaborador.Cells[row, 3] = new ExcelLibrary.SpreadSheet.Cell(DTA.Cargo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetColaborador.Cells[row, 4] = new ExcelLibrary.SpreadSheet.Cell(DTA.Tiempo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetColaborador.Cells[row, 5] = new ExcelLibrary.SpreadSheet.Cell(DTA.TipoContrato, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetColaborador.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell(DTA.FechaInicio, ExcelLibrary.SpreadSheet.CellFormat.Date);
                    worksheetColaborador.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell(DTA.FechaFin, ExcelLibrary.SpreadSheet.CellFormat.Date);
                    worksheetColaborador.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell(DTA.CostoMensual.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetColaborador.Cells[row, 9] = new ExcelLibrary.SpreadSheet.Cell(DTA.Porcentaje.ToString() + "%", ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetColaborador.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell(DTA.Contrapartida.ToString() , ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetColaborador.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell(DTA.Aporte.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    i++;


                }
                worksheetColaborador.Cells.ColumnWidth[0, 12] = 6000;
                workbook.Worksheets.Add(worksheetColaborador);

                #endregion


                #region RegistroParticipantes
                RegistroParticipantesProyectosResponse response = ProyectoOperations.ConsultarParticipantes(factory, connection, id);

                Worksheet worksheetRParticipantes = new Worksheet("Participantes Registrados");

                for (int j = 0; j < 100; j++)
                    worksheetColaborador.Cells[j, 0] = new ExcelLibrary.SpreadSheet.Cell("");

                worksheetRParticipantes.Cells[0, 0] = new ExcelLibrary.SpreadSheet.Cell("[Informe general Proyecto - Registro Participantes]");
                worksheetRParticipantes.Cells[0, 4] = new ExcelLibrary.SpreadSheet.Cell(string.Format("INFORME REALIZADO EL : [{0}]", DateTime.Now), ExcelLibrary.SpreadSheet.CellFormat.Date);
                worksheetRParticipantes.Cells[0, 6] = new ExcelLibrary.SpreadSheet.Cell("PROYECTO - REGISTRO PARTICIPANTES");



                i = 0;
                row = i + 2;
                worksheetRParticipantes.Cells[row, 0]  = new ExcelLibrary.SpreadSheet.Cell("#");
                worksheetRParticipantes.Cells[row, 1]  = new ExcelLibrary.SpreadSheet.Cell("NOMBRES");
                worksheetRParticipantes.Cells[row, 2]  = new ExcelLibrary.SpreadSheet.Cell("APELLIDOS");
                worksheetRParticipantes.Cells[row, 3]  = new ExcelLibrary.SpreadSheet.Cell("FECHA NACIMIENTO");
                worksheetRParticipantes.Cells[row, 4]  = new ExcelLibrary.SpreadSheet.Cell("EDAD");
                worksheetRParticipantes.Cells[row, 5]  = new ExcelLibrary.SpreadSheet.Cell("FECHA INGRESO");
                worksheetRParticipantes.Cells[row, 6]  = new ExcelLibrary.SpreadSheet.Cell("FECHA SALIDA");
                worksheetRParticipantes.Cells[row, 7]  = new ExcelLibrary.SpreadSheet.Cell("DISCAPACIDAD");
                worksheetRParticipantes.Cells[row, 8]  = new ExcelLibrary.SpreadSheet.Cell("LOCALIDAD");
                worksheetRParticipantes.Cells[row, 9]  = new ExcelLibrary.SpreadSheet.Cell("SEXO");
                worksheetRParticipantes.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell("GENERO");
                worksheetRParticipantes.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell("ESTATUS RESIDENCIA");
                worksheetRParticipantes.Cells[row, 12] = new ExcelLibrary.SpreadSheet.Cell("ULTIMO CURSO APROBADO");
                worksheetRParticipantes.Cells[row, 13] = new ExcelLibrary.SpreadSheet.Cell("ASISTE AL COLEGIO");
                worksheetRParticipantes.Cells[row, 14] = new ExcelLibrary.SpreadSheet.Cell("GRUPO POBLACIONAL");
                worksheetRParticipantes.Cells[row, 15] = new ExcelLibrary.SpreadSheet.Cell("GRUPO ETNICO");
                worksheetRParticipantes.Cells[row, 16] = new ExcelLibrary.SpreadSheet.Cell("NACIONALIDAD");
                worksheetRParticipantes.Cells[row, 17] = new ExcelLibrary.SpreadSheet.Cell("TIPO PARTICIPANTE");
                worksheetRParticipantes.Cells[row, 18] = new ExcelLibrary.SpreadSheet.Cell("NIVEL ESCOLARIDAD");








                countFechas = 0;

                foreach (var DTA in response.Registros)
                {
                    countFechas++;
                    row = i + 3;
                    worksheetRParticipantes.Cells[row, 0]  = new ExcelLibrary.SpreadSheet.Cell(countFechas, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 1]  = new ExcelLibrary.SpreadSheet.Cell(DTA.Nombres, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 2]  = new ExcelLibrary.SpreadSheet.Cell(DTA.Apellidos, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 3]  = new ExcelLibrary.SpreadSheet.Cell(DTA.FechaNacimiento, ExcelLibrary.SpreadSheet.CellFormat.Date);
                    worksheetRParticipantes.Cells[row, 4]  = new ExcelLibrary.SpreadSheet.Cell(DTA.Edad.ToString(), ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 5]  = new ExcelLibrary.SpreadSheet.Cell(DTA.FechaIngreso, ExcelLibrary.SpreadSheet.CellFormat.Date);
                    if(DTA.FechaSalida == null)
                    {
                        worksheetRParticipantes.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell("", ExcelLibrary.SpreadSheet.CellFormat.General);

                    }
                    else
                    {
                        worksheetRParticipantes.Cells[row, 6] = new ExcelLibrary.SpreadSheet.Cell(Convert.ToDateTime(DTA.FechaSalida), ExcelLibrary.SpreadSheet.CellFormat.Date);

                    }
                    worksheetRParticipantes.Cells[row, 7] = new ExcelLibrary.SpreadSheet.Cell(DTA.Discapacidad, ExcelLibrary.SpreadSheet.CellFormat.General);


                    worksheetRParticipantes.Cells[row, 8] = new ExcelLibrary.SpreadSheet.Cell(DTA.Localidad, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 9]  = new ExcelLibrary.SpreadSheet.Cell(DTA.Sexo, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 10] = new ExcelLibrary.SpreadSheet.Cell(DTA.Genero, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 11] = new ExcelLibrary.SpreadSheet.Cell(DTA.EstatusResidencia, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 12] = new ExcelLibrary.SpreadSheet.Cell(DTA.UltimoCursoAprobado, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 13] = new ExcelLibrary.SpreadSheet.Cell(DTA.AsisteAlColegio, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 14] = new ExcelLibrary.SpreadSheet.Cell(DTA.GrupoPoblacional, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 15] = new ExcelLibrary.SpreadSheet.Cell(DTA.GrupoEtnico, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 16] = new ExcelLibrary.SpreadSheet.Cell(DTA.Nacionalidad, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 17] = new ExcelLibrary.SpreadSheet.Cell(DTA.TipoParticipante, ExcelLibrary.SpreadSheet.CellFormat.General);
                    worksheetRParticipantes.Cells[row, 18] = new ExcelLibrary.SpreadSheet.Cell(DTA.NivelEscolaridad, ExcelLibrary.SpreadSheet.CellFormat.General);


                    i++;


                }
                worksheetRParticipantes.Cells.ColumnWidth[0, 20] = 6000;
                workbook.Worksheets.Add(worksheetRParticipantes);

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
