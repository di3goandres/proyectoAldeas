USE [Presupuesto]
GO
SET IDENTITY_INSERT [dbo].[programas] ON
INSERT INTO [dbo].[programas]

           (id, 
		   [Nombre]
           ,[Estado]
           ,[FechaCreacion]
           ,[FechaActualizacion])
     VALUES
 (1,'AN', 1, getdate(), getdate()),
(2,'Bolivar', 1, getdate(), getdate()),
(3,'CC', 1, getdate(), getdate()),
(4,'CF', 1, getdate(), getdate()),
(5,'Cundinamarca', 1, getdate(), getdate()),
(6,'DFC', 1, getdate(), getdate()),
(7,'ET', 1, getdate(), getdate()),
(8,'INFRAESTRUCTURA', 1, getdate(), getdate()),
(9,'Nariño', 1, getdate(), getdate()),
(10,'NO USAR', 1, getdate(), getdate()),
(11,'Nor Occidente', 1, getdate(), getdate()),
(12,'ON', 1, getdate(), getdate()),
(13,'OR', 1, getdate(), getdate()),
(14,'Proyectos', 1, getdate(), getdate()),
(15,'Quibdo', 1, getdate(), getdate()),
(16,'Riosucio', 1, getdate(), getdate()),
(17,'Santander', 1, getdate(), getdate()),
(18,'Tolima', 1, getdate(), getdate()),
(19,'Tumaco', 1, getdate(), getdate()),
(20,'Valle del Cauca', 1, getdate(), getdate()),
(21,'#N/A', 1, getdate(), getdate())


SET IDENTITY_INSERT [dbo].[programas] OFF