IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PresupuestoPrograma]') AND type in (N'U'))
DROP TABLE [dbo].[PresupuestoPrograma]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Presupuesto]') AND type in (N'U'))
DROP TABLE [dbo].[Presupuesto]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PresupuestoAnio]') AND type in (N'U'))
DROP TABLE [dbo].[PresupuestoAnio]
GO



IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[03_PresupuestoPrograma]') AND type in (N'U'))
DROP TABLE [dbo].[03_PresupuestoPrograma]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[02_Presupuesto]') AND type in (N'U'))
DROP TABLE [dbo].[02_Presupuesto]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[01_PresupuestoAnio]') AND type in (N'U'))
DROP TABLE [dbo].[01_PresupuestoAnio]
GO









/****** Object:  Table [dbo].[PresupuestoAnio]    Script Date: 5/10/2020 8:13:20 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[01_PresupuestoAnio](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idPrograma] [bigint] NOT NULL,
	[Anio] [int] NOT NULL,
	[Actual] [bit] NOT NULL,
	[numeroVersion] [int] NOT NULL,
	[per_capacitacion] [decimal](18, 2) NULL,
	[per_nomina] [decimal](18, 2) NULL,
	[fecha_creacion] [datetime] NOT NULL,
	[fecha_actualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_PresupuestoAnio] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[01_PresupuestoAnio]  WITH CHECK ADD  CONSTRAINT [FK_PresupuestoAnio_programas] FOREIGN KEY([idPrograma])
REFERENCES [dbo].[programas] ([id])
GO
ALTER TABLE [dbo].[01_PresupuestoAnio] CHECK CONSTRAINT [FK_PresupuestoAnio_programas]
GO


--- check prespuesto anio.

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[02_Presupuesto](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idPresupuestoAnio] [bigint] NOT NULL,
	[idPrograma] [bigint] NOT NULL,
	[idFinanciador] [bigint] NOT NULL,
    [IdProgramaCecos] [bigint] NOT NULL,
	[Anio] [int] NOT NULL,
	[NombreContrato] [varchar](max) NULL,
	[CoberturaAnual] [decimal](18, 5) NOT NULL,
	[CoberturaMensual] [decimal](18, 5) NOT NULL,
	[CoberturaMensualEsperada] [decimal](18, 5) NOT NULL,
	[CoberturasCasas] [decimal](18, 5) NOT NULL,
	[fecha_creacion] [datetime] NOT NULL,
	[fecha_actualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_Presupuesto] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


ALTER TABLE [dbo].[02_Presupuesto]  WITH CHECK ADD  CONSTRAINT [FK_Presupuesto_programas] FOREIGN KEY([idPrograma])
REFERENCES [dbo].[programas] ([id])
GO
ALTER TABLE [dbo].[02_Presupuesto] CHECK CONSTRAINT [FK_Presupuesto_programas]
GO

ALTER TABLE [dbo].[02_Presupuesto]  WITH CHECK ADD  CONSTRAINT [FK_Presupuesto_Cecos] FOREIGN KEY([IdProgramaCecos])
REFERENCES [dbo].[Cecos] ([id])
GO
ALTER TABLE [dbo].[02_Presupuesto] CHECK CONSTRAINT [FK_Presupuesto_Cecos]
GO


/****** Object:  Table [dbo].[PresupuestoPrograma]    Script Date: 5/10/2020 8:13:20 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[03_PresupuestoPrograma](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idPresupuesto] [bigint] NOT NULL,
	[IdProgramaCecos] [bigint] NOT NULL,
	[idRubroPucs] [bigint] NOT NULL,
	[esNomina] [bit] NOT NULL,
	[EsPPTO] [bit] NOT NULL,
	[NumeroIdentificacion] [bigint] NULL,
	[Nombre] [varchar](max) NULL,
	[idCargo] [int] NULL,
	[Asignacion] [int] NULL,
	[NoCasa] [int] NULL,
	[NoKids] [int] NULL,
	[Enero] [decimal](18, 5) NOT NULL,
	[Febrero] [decimal](18, 5) NOT NULL,
	[Marzo] [decimal](18, 5) NOT NULL,
	[Abril] [decimal](18, 5) NOT NULL,
	[Mayo] [decimal](18, 5) NOT NULL,
	[Junio] [decimal](18, 5) NOT NULL,
	[Julio] [decimal](18, 5) NOT NULL,
	[Agosto] [decimal](18, 5) NOT NULL,
	[Septiembre] [decimal](18, 5) NOT NULL,
	[Octubre] [decimal](18, 5) NOT NULL,
	[Noviembre] [decimal](18, 5) NOT NULL,
	[Diciembre] [decimal](18, 5) NOT NULL,
	[Total] [decimal](18, 5) NOT NULL,
	[TotalAnual] [decimal](18, 5) NOT NULL,
	[DetalleGasto] [varchar](max) NOT NULL,
	[NotaIngles] [varchar](max) NULL,
	[fecha_creacion] [datetime] NOT NULL,
	[fecha_actualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_PresupuestoPrograma] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


ALTER TABLE [dbo].[03_PresupuestoPrograma]  WITH CHECK ADD  CONSTRAINT [FK_PresupuestoPrograma_cargos] FOREIGN KEY([idCargo])
REFERENCES [dbo].[cargos] ([id])
GO
ALTER TABLE [dbo].[03_PresupuestoPrograma] CHECK CONSTRAINT [FK_PresupuestoPrograma_cargos]
GO
ALTER TABLE [dbo].[03_PresupuestoPrograma]  WITH CHECK ADD  CONSTRAINT [FK_PresupuestoPrograma_Cecos] FOREIGN KEY([IdProgramaCecos])
REFERENCES [dbo].[Cecos] ([id])
GO
ALTER TABLE [dbo].[03_PresupuestoPrograma] CHECK CONSTRAINT [FK_PresupuestoPrograma_Cecos]
GO
ALTER TABLE [dbo].[03_PresupuestoPrograma]  WITH CHECK ADD  CONSTRAINT [FK_PresupuestoPrograma_Presupuesto] FOREIGN KEY([idPresupuesto])
REFERENCES [dbo].[02_Presupuesto] ([id])
GO
ALTER TABLE [dbo].[03_PresupuestoPrograma] CHECK CONSTRAINT [FK_PresupuestoPrograma_Presupuesto]
GO
ALTER TABLE [dbo].[03_PresupuestoPrograma]  WITH CHECK ADD  CONSTRAINT [FK_PresupuestoPrograma_pucs] FOREIGN KEY([idRubroPucs])
REFERENCES [dbo].[pucs] ([id])
GO
ALTER TABLE [dbo].[03_PresupuestoPrograma] CHECK CONSTRAINT [FK_PresupuestoPrograma_pucs]
GO