USE [Presupuesto]
GO

delete from  [rubros]

DBCC CHECKIDENT ([rubros], RESEED, 0)
SET IDENTITY_INSERT [dbo].[rubros] ON
INSERT INTO [dbo].[rubros]
    (ID, [Nombre]
    ,[Estado]
    ,[EsPptp]
    ,[esNomina]
    ,[FechaCreacion]
    ,[FechaActualizacion])
VALUES
    (1, 'CAPACITACIÓN AL PERSONAL', 1, 0, 0, GETDATE(), GETDATE()),
    (2, 'GASTOS ADMINISTRATIVOS', 1, 0, 0, GETDATE(), GETDATE()),
    (3, 'GASTOS ATENCIÓN', 1, 0, 0, GETDATE(), GETDATE()),
    (4, 'ICT Y ACTIVOS FIJOS', 1, 0, 0, GETDATE(), GETDATE()),
    (5, 'INGRESOS', 1, 0, 0, GETDATE(), GETDATE()),
    (6, 'NOMINA', 1, 0, 1, GETDATE(), GETDATE()),
	(7, 'PPTO FAMILIAR', 1, 1, 0, GETDATE(), GETDATE()),
    (8, 'PROYECTOS - GASTOS ATENCION', 1, 0, 0, GETDATE(), GETDATE()),
    (9, 'PROYECTOS - GASTOS NOMINA', 1, 0, 0, GETDATE(), GETDATE()),
    (10, 'PROYECTOS - INGRESOS', 1, 0, 0, GETDATE(), GETDATE()),
    (11, 'SALUD Y SEGURIDAD EN EL TRABAJO', 1, 0, 0, GETDATE(), GETDATE())


GO


SET IDENTITY_INSERT [dbo].[rubros] OFF

