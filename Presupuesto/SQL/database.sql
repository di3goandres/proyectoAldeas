USE [Presupuesto]
GO
/****** Object:  Table [dbo].[cargos]    Script Date: 5/10/2020 8:13:20 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cargos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tipo] [varchar](500) NOT NULL,
	[cod_cargo] [varchar](500) NOT NULL,
	[cargo] [varchar](500) NOT NULL,
 CONSTRAINT [PK_cargos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cecos]    Script Date: 5/10/2020 8:13:20 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cecos](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idPrograma] [bigint] NOT NULL,
	[idFinanciador] [int] NOT NULL,
	[CodigoCeco] [int] NOT NULL,
	[Nombre] [varchar](500) NOT NULL,
	[SubCentro] [int] NOT NULL,
	[NombreSubCentro] [varchar](500) NOT NULL,
	[FacilityNav] [varchar](500) NOT NULL,
	[Estado] [bit] NOT NULL,
	[fecha_creacion] [datetime] NOT NULL,
	[fecha_actualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_Cecos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Financiadores]    Script Date: 5/10/2020 8:13:20 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Financiadores](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](255) NOT NULL,
	[activo] [bit] NOT NULL,
	[fecha_creacion] [datetime] NOT NULL,
	[fecha_actualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_Financiadores] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Presupuesto]    Script Date: 5/10/2020 8:13:20 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Presupuesto](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idPresupuestoAnio] [bigint] NOT NULL,
	[idPrograma] [bigint] NOT NULL,
	[idFinanciador] [bigint] NOT NULL,
	[Anio] [int] NOT NULL,
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
/****** Object:  Table [dbo].[PresupuestoAnio]    Script Date: 5/10/2020 8:13:20 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PresupuestoAnio](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idPrograma] [bigint] NOT NULL,
	[Anio] [int] NOT NULL,
	[Actual] [bit] NOT NULL,
	[numeroVersion] [int] NOT NULL,
	[fecha_creacion] [datetime] NOT NULL,
	[fecha_actualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_PresupuestoAnio] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PresupuestoPrograma]    Script Date: 5/10/2020 8:13:20 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PresupuestoPrograma](
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
	[DetalleGasto] [varchar](max) NOT NULL,
	[NotaIngles] [varchar](max) NULL,
 CONSTRAINT [PK_PresupuestoPrograma] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[programas]    Script Date: 5/10/2020 8:13:21 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[programas](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_tipo_programa] [int] NOT NULL,
	[Nombre] [varchar](500) NOT NULL,
	[per_capacitacion] [decimal](18, 2) NULL,
	[per_nomina] [decimal](18, 2) NULL,
	[Estado] [bit] NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[FechaActualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_programas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pucs]    Script Date: 5/10/2020 8:13:21 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pucs](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idRubro] [bigint] NOT NULL,
	[idTipoPrograma] [int] NULL,
	[Tipo] [varchar](500) NOT NULL,
	[CuentaSIIGO] [varchar](500) NOT NULL,
	[DescripcionCuenta] [varchar](500) NOT NULL,
	[CuentaNAV] [varchar](500) NOT NULL,
	[DetalleCuentaNav] [varchar](500) NOT NULL,
	[TipoCuentaNav] [varchar](500) NOT NULL,
	[GrupoConcepto] [varchar](500) NULL,
	[GrupoCargo] [varchar](500) NULL,
	[FichaBanco] [varchar](500) NULL,
	[Casa] [int] NOT NULL,
	[RequiereNotaIngles] [bit] NOT NULL,
	[Estado] [bit] NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[FechaActualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_pucs] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rubros]    Script Date: 5/10/2020 8:13:21 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rubros](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](500) NOT NULL,
	[EsPptp] [bit] NOT NULL,
	[esNomina] [bit] NOT NULL,
	[Estado] [bit] NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[FechaActualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_rubros] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipo_programa]    Script Date: 5/10/2020 8:13:21 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo_programa](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](500) NOT NULL,
	[cobertura] [bit] NOT NULL,
	[fecha_creacion] [datetime] NOT NULL,
	[fecha_actualizacion] [datetime] NOT NULL,
 CONSTRAINT [PK_tipo_programa_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuario_programa]    Script Date: 5/10/2020 8:13:21 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuario_programa](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_usuario] [bigint] NOT NULL,
	[id_programa] [bigint] NOT NULL,
 CONSTRAINT [PK_usuario_programa] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios_administradores]    Script Date: 5/10/2020 8:13:21 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios_administradores](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[username] [varchar](500) NOT NULL,
	[administrador] [bit] NOT NULL,
 CONSTRAINT [PK_usuarios_administradores] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PresupuestoPrograma] ADD  CONSTRAINT [DF_PresupuestoPrograma_Asignacion]  DEFAULT ((0)) FOR [Asignacion]
GO
ALTER TABLE [dbo].[PresupuestoPrograma] ADD  CONSTRAINT [DF_PresupuestoPrograma_Numero_casa]  DEFAULT ((0)) FOR [NoCasa]
GO
ALTER TABLE [dbo].[PresupuestoPrograma] ADD  CONSTRAINT [DF_PresupuestoPrograma_Numero_niños]  DEFAULT ((0)) FOR [NoKids]
GO
ALTER TABLE [dbo].[programas] ADD  CONSTRAINT [DF_programas_per_capacitacion]  DEFAULT ((1.5)) FOR [per_capacitacion]
GO
ALTER TABLE [dbo].[programas] ADD  CONSTRAINT [DF_programas_per_nomina]  DEFAULT ((10)) FOR [per_nomina]
GO
ALTER TABLE [dbo].[pucs] ADD  CONSTRAINT [DF_pucs_Casa]  DEFAULT ((0)) FOR [Casa]
GO
ALTER TABLE [dbo].[pucs] ADD  CONSTRAINT [DF_pucs_Estado]  DEFAULT ((1)) FOR [Estado]
GO
ALTER TABLE [dbo].[rubros] ADD  CONSTRAINT [DF_rubros_EsPptp]  DEFAULT ((0)) FOR [EsPptp]
GO
ALTER TABLE [dbo].[rubros] ADD  CONSTRAINT [DF_rubros_esNomina]  DEFAULT ((0)) FOR [esNomina]
GO
ALTER TABLE [dbo].[Cecos]  WITH CHECK ADD  CONSTRAINT [FK_Cecos_Financiadores] FOREIGN KEY([idFinanciador])
REFERENCES [dbo].[Financiadores] ([id])
GO
ALTER TABLE [dbo].[Cecos] CHECK CONSTRAINT [FK_Cecos_Financiadores]
GO
ALTER TABLE [dbo].[Cecos]  WITH CHECK ADD  CONSTRAINT [FK_Cecos_programas] FOREIGN KEY([idPrograma])
REFERENCES [dbo].[programas] ([id])
GO
ALTER TABLE [dbo].[Cecos] CHECK CONSTRAINT [FK_Cecos_programas]
GO
ALTER TABLE [dbo].[Presupuesto]  WITH CHECK ADD  CONSTRAINT [FK_Presupuesto_PresupuestoAnio] FOREIGN KEY([idPresupuestoAnio])
REFERENCES [dbo].[PresupuestoAnio] ([id])
GO
ALTER TABLE [dbo].[Presupuesto] CHECK CONSTRAINT [FK_Presupuesto_PresupuestoAnio]
GO
ALTER TABLE [dbo].[Presupuesto]  WITH CHECK ADD  CONSTRAINT [FK_Presupuesto_programas] FOREIGN KEY([idPrograma])
REFERENCES [dbo].[programas] ([id])
GO
ALTER TABLE [dbo].[Presupuesto] CHECK CONSTRAINT [FK_Presupuesto_programas]
GO
ALTER TABLE [dbo].[PresupuestoAnio]  WITH CHECK ADD  CONSTRAINT [FK_PresupuestoAnio_programas] FOREIGN KEY([idPrograma])
REFERENCES [dbo].[programas] ([id])
GO
ALTER TABLE [dbo].[PresupuestoAnio] CHECK CONSTRAINT [FK_PresupuestoAnio_programas]
GO
ALTER TABLE [dbo].[PresupuestoPrograma]  WITH CHECK ADD  CONSTRAINT [FK_PresupuestoPrograma_cargos] FOREIGN KEY([idCargo])
REFERENCES [dbo].[cargos] ([id])
GO
ALTER TABLE [dbo].[PresupuestoPrograma] CHECK CONSTRAINT [FK_PresupuestoPrograma_cargos]
GO
ALTER TABLE [dbo].[PresupuestoPrograma]  WITH CHECK ADD  CONSTRAINT [FK_PresupuestoPrograma_Cecos] FOREIGN KEY([IdProgramaCecos])
REFERENCES [dbo].[Cecos] ([id])
GO
ALTER TABLE [dbo].[PresupuestoPrograma] CHECK CONSTRAINT [FK_PresupuestoPrograma_Cecos]
GO
ALTER TABLE [dbo].[PresupuestoPrograma]  WITH CHECK ADD  CONSTRAINT [FK_PresupuestoPrograma_Presupuesto] FOREIGN KEY([idPresupuesto])
REFERENCES [dbo].[Presupuesto] ([id])
GO
ALTER TABLE [dbo].[PresupuestoPrograma] CHECK CONSTRAINT [FK_PresupuestoPrograma_Presupuesto]
GO
ALTER TABLE [dbo].[PresupuestoPrograma]  WITH CHECK ADD  CONSTRAINT [FK_PresupuestoPrograma_pucs] FOREIGN KEY([idRubroPucs])
REFERENCES [dbo].[pucs] ([id])
GO
ALTER TABLE [dbo].[PresupuestoPrograma] CHECK CONSTRAINT [FK_PresupuestoPrograma_pucs]
GO
ALTER TABLE [dbo].[programas]  WITH CHECK ADD  CONSTRAINT [FK_programas_tipo_programa] FOREIGN KEY([id_tipo_programa])
REFERENCES [dbo].[tipo_programa] ([id])
GO
ALTER TABLE [dbo].[programas] CHECK CONSTRAINT [FK_programas_tipo_programa]
GO
ALTER TABLE [dbo].[pucs]  WITH CHECK ADD  CONSTRAINT [FK_pucs_rubros] FOREIGN KEY([idRubro])
REFERENCES [dbo].[rubros] ([id])
GO
ALTER TABLE [dbo].[pucs] CHECK CONSTRAINT [FK_pucs_rubros]
GO
ALTER TABLE [dbo].[pucs]  WITH CHECK ADD  CONSTRAINT [FK_pucs_tipo_programa] FOREIGN KEY([idTipoPrograma])
REFERENCES [dbo].[tipo_programa] ([id])
GO
ALTER TABLE [dbo].[pucs] CHECK CONSTRAINT [FK_pucs_tipo_programa]
GO
ALTER TABLE [dbo].[usuario_programa]  WITH CHECK ADD  CONSTRAINT [FK_usuario_programa_programas] FOREIGN KEY([id_programa])
REFERENCES [dbo].[programas] ([id])
GO
ALTER TABLE [dbo].[usuario_programa] CHECK CONSTRAINT [FK_usuario_programa_programas]
GO
ALTER TABLE [dbo].[usuario_programa]  WITH CHECK ADD  CONSTRAINT [FK_usuario_programa_usuarios_administradores] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[usuarios_administradores] ([id])
GO
ALTER TABLE [dbo].[usuario_programa] CHECK CONSTRAINT [FK_usuario_programa_usuarios_administradores]
GO
