
CREATE VIEW ConsultaItemsPresupesto AS

select 
            prep.id as id,
            pre.id as idPresupuesto,
            pro.Nombre as Programa,
            Anio = pre.Anio,
            CASE tpro.cobertura 
                WHEN 1 THEN  'OPERACIONAL'
                WHEN 0 THEN  'ADMINISTRATIVO'
            END 
            ClasificacionGasto,
            cec.CodigoCeco CentroCosto,
            cec.Nombre NombreCentroCosto,
            cec.SubCentro SubCentroCosto,
            cec.NombreSubCentro NombreSubCentroCosto,
            rubro.Nombre NombreRubro,
            rubro.esNomina esNomina,
            rubro.EsPptp EsPptp,
            puc.CuentaSIIGO CuentaSIIGO,
            puc.DescripcionCuenta NombreCuenta,
            puc.CuentaNAV CuentaCotable,
            cec.FacilityNav Facility,
            prep.DetalleGasto DetalleGasto,
            prep.NotaIngles NotaIngles,
            prep.NoCasa  NoCasa,
            prep.NoKids NoKids,
            prep.NumeroIdentificacion NumeroIdentificacion,
            prep.Nombre Nombre,
            prep.Asignacion,
            cargo.cargo,
            prep.Enero,
            prep.Febrero,
            prep.Marzo,
            prep.Abril,
            prep.Mayo,
            prep.Junio,
            prep.Julio,
            prep.Agosto,
            prep.Septiembre,
            prep.Octubre,
            prep.Noviembre,
            prep.Diciembre,
            prep.Total
 from   [03_PresupuestoPrograma] prep
        left  join [02_Presupuesto] pre on pre.id = prep.idPresupuesto
        left join programas pro on pre.idPrograma = pro.id
        left   join Cecos cec  on prep.idProgramaCecos = cec.id
        left  join Cargos cargo  on pre.id = cargo.id
      
        left join Pucs puc  on prep.idRubroPucs = puc.id
        left join  tipo_programa tpro  on pro.id_tipo_programa = tpro.id

        left  join  rubros rubro  on puc.idRubro = rubro.id
