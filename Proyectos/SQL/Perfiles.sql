
CREATE TABLE Perfiles (
   	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[perfil] [varchar](500) NOT NULL,
	[consulta] [bit] NOT NULL,
	[edicion] [bit] NOT NULL,


);
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[username] [varchar](500) NOT NULL,
	[IdPerfil] bigint Not NULL



) ON [PRIMARY]
GO
ALTER TABLE [dbo].[usuarios] ADD  CONSTRAINT [PK_usuarios_permisos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)
ALTER TABLE [dbo].[usuarios] ADD  CONSTRAINT fk_user_ident  FOREIGN KEY (IdPerfil) REFERENCES usuarios(id)
GO

GO
INSERT INTO Perfiles(
    	[perfil],
        [consulta],
        [edicion])
        VALUES
        ('ADMINISTRADOR', 1, 1),
        ('EDITOR', 1, 1),
        ('CONSULTOR', 1, 0)

        
