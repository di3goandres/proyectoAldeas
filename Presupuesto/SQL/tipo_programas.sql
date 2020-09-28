USE [Presupuesto]
GO

INSERT INTO [dbo].[tipo_programa]
           ([nombre]
           ,[cobertura]
           ,[fecha_creacion]
           ,[fecha_actualizacion])
     VALUES
           ('Administración',0,getdate(),getdate()),
           ('Programas',1,getdate(),getdate()),
           ('Proyectos',1,getdate(),getdate()),
		   ('DFC/desarrollo de fondos',0,getdate(),getdate())


GO

