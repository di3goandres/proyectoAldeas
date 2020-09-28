USE [Presupuesto]
GO
SET IDENTITY_INSERT [dbo].[programas] ON
INSERT INTO [dbo].[programas]

           ([id_tipo_programa], id, 
		   [Nombre]
           ,[Estado]
           ,[FechaCreacion]
           ,[FechaActualizacion])
     VALUES
(2,1,'AN', 1, getdate(), getdate()),
(2,2,'Bolivar', 1, getdate(), getdate()),
(1,3,'CC', 1, getdate(), getdate()),
(1,4,'CF', 1, getdate(), getdate()),
(2,5,'Cundinamarca', 1, getdate(), getdate()),
(4,6,'DFC', 1, getdate(), getdate()),
(1,7,'ET', 1, getdate(), getdate()),
(1,8,'INFRAESTRUCTURA', 1, getdate(), getdate()),
(2,9,'Nariño', 1, getdate(), getdate()),
(1,10,'NO USAR', 1, getdate(), getdate()),
(2,11,'Nor Occidente', 1, getdate(), getdate()),
(1,12,'ON', 1, getdate(), getdate()),
(1,13,'OR', 1, getdate(), getdate()),
(3,14,'Proyectos', 1, getdate(), getdate()),
(2,15,'Quibdo', 1, getdate(), getdate()),
(2,16,'Riosucio', 1, getdate(), getdate()),
(2,17,'Santander', 1, getdate(), getdate()),
(2,18,'Tolima', 1, getdate(), getdate()),
(2,19,'Tumaco', 1, getdate(), getdate()),
(2,20,'Valle del Cauca', 1, getdate(), getdate()),
(1,21,'#N/A', 1, getdate(), getdate())


SET IDENTITY_INSERT [dbo].[programas] OFF