USE [Presupuesto]
GO
SET IDENTITY_INSERT [dbo].[Financiadores] ON
INSERT INTO [dbo].[Financiadores]
    (id, [nombre]
    ,[activo]
    ,[fecha_creacion]
    ,[fecha_actualizacion])
VALUES
    (1, 'Subsidio SOS', 1, GETDATE(), GETDATE()),
    (2, 'Acciones Internacionales', 1, GETDATE(), GETDATE()),
    (3, 'Operación Proyectos', 1, GETDATE(), GETDATE()),
    (4, 'Meta Local', 1, GETDATE(), GETDATE()),
    (5, 'Arrendamientos ', 1, GETDATE(), GETDATE()),
    (6, 'Gubernamental', 1, GETDATE(), GETDATE()),
    (7, 'Recuperación Proyectos', 1, GETDATE(), GETDATE()),
    (8, 'DFC', 1, GETDATE(), GETDATE())




SET IDENTITY_INSERT [dbo].[Financiadores] OFF