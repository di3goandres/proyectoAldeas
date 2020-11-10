USE [proyectosAldea]
GO
/****** Object:  Table [dbo].[Indicadores]    Script Date: 9/11/2020 9:18:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Indicadores](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[NombreIndicador] [varchar](250) NOT NULL,
	[fechaCreacion] [datetime] NOT NULL,
	[fechaActualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_Indicadores] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Indicadores_preguntas]    Script Date: 9/11/2020 9:18:56 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Indicadores_preguntas](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_indicador] [bigint] NOT NULL,
	[id_indicador_pregunta_padre] [bigint] NULL,
	[esPadre] [bit] NOT NULL,
	[descripcion] [varchar](500) NOT NULL,
	[Tipo] [int] NOT NULL,
	[fechaCreacion] [datetime] NOT NULL,
	[fechaActualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_Indicadores_preguntas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Indicadores_PreguntasComplemento]    Script Date: 9/11/2020 9:18:56 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Indicadores_PreguntasComplemento](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idPregunta] [bigint] NOT NULL,
	[opcion] [varchar](500) NOT NULL,
	[esOtro] [bit] NOT NULL,
	[fechaCreacion] [datetime] NOT NULL,
	[fechaActualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_Indicadores_PreguntasComplemento] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[indicadores_Respuestas]    Script Date: 9/11/2020 9:18:56 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[indicadores_Respuestas](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idProyecto] [bigint] NOT NULL,
	[idRegistroParticipante] [bigint] NOT NULL,
	[idIndicadorPregunta] [bigint] NOT NULL,
	[idComplemento] [bigint] NULL,
	[respuestaSi_No] [bit] NULL,
	[Respuesta] [varchar](1000) NULL,
	[esOtro] [bit] NULL,
	[fechaCreacion] [datetime] NULL,
	[fechaActualizacion] [datetime] NULL,
 CONSTRAINT [PK_indicadores_Respuestas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Indicadores_preguntas]  WITH CHECK ADD  CONSTRAINT [FK_Indicadores_preguntas_Indicadores1] FOREIGN KEY([id_indicador])
REFERENCES [dbo].[Indicadores] ([id])
GO
ALTER TABLE [dbo].[Indicadores_preguntas] CHECK CONSTRAINT [FK_Indicadores_preguntas_Indicadores1]
GO
ALTER TABLE [dbo].[Indicadores_PreguntasComplemento]  WITH CHECK ADD  CONSTRAINT [FK_Indicadores_PreguntasComplemento_Indicadores_preguntas] FOREIGN KEY([idPregunta])
REFERENCES [dbo].[Indicadores_preguntas] ([id])
GO
ALTER TABLE [dbo].[Indicadores_PreguntasComplemento] CHECK CONSTRAINT [FK_Indicadores_PreguntasComplemento_Indicadores_preguntas]
GO
