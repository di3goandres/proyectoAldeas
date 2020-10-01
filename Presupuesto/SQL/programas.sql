USE [Presupuesto]
GO
SET IDENTITY_INSERT [dbo].[programas] ON
INSERT INTO [dbo].[programas]

           ( id, [id_tipo_programa],
		   [Nombre]
           ,[Estado]
           ,[FechaCreacion]
           ,[FechaActualizacion])
     VALUES
(1,1,'AN',1, GETDATE(),GETDATE()),
(2,2,'Bolivar',1, GETDATE(),GETDATE()),
(3,1,'CC',1, GETDATE(),GETDATE()),
(4,1,'CF',1, GETDATE(),GETDATE()),
(5,2,'Cundinamarca',1, GETDATE(),GETDATE()),
(6,4,'DFC',1, GETDATE(),GETDATE()),
(7,1,'ET',1, GETDATE(),GETDATE()),
(8,1,'INFRAESTRUCTURA',1, GETDATE(),GETDATE()),
(9,2,'Nariño',1, GETDATE(),GETDATE()),
(10,2,'Nor Occidente',1, GETDATE(),GETDATE()),
(11,1,'ON',1, GETDATE(),GETDATE()),
(12,1,'OR',1, GETDATE(),GETDATE()),
(13,3,'Proyectos',1, GETDATE(),GETDATE()),
(14,2,'Riosucio',1, GETDATE(),GETDATE()),
(15,2,'Santander',1, GETDATE(),GETDATE()),
(16,2,'Tolima',1, GETDATE(),GETDATE()),
(17,2,'Tumaco',1, GETDATE(),GETDATE()),
(18,2,'Valle del Cauca',1, GETDATE(),GETDATE())



SET IDENTITY_INSERT [dbo].[programas] OFF