truncate table [dbo].[fecha_entregas]

  truncate table [dbo].[Colaborador_InfoFinanciera_centrosCostos]
  
  delete from  [dbo].[colaboradores]
  DBCC CHECKIDENT ([colaboradores], RESEED, 0)

  truncate table [dbo].[ejecucion_financiera]
  truncate table [dbo].[fecha_entregas]
  truncate table [dbo].[indicadores_Respuestas]

  truncate table [dbo].[ejecucion_financiera]

  delete from  [dbo].[infoFinanciera]
  DBCC CHECKIDENT ([infoFinanciera], RESEED, 0)

truncate table [dbo].[integrantesFamilia]

truncate table [dbo].[municipios_proyecto]


truncate table [dbo].[ParticipantePreguntas]

  delete from   [dbo].[participante_proyectados]
  DBCC CHECKIDENT ([participante_proyectados], RESEED, 0)

truncate table [dbo].[participantes]

 delete from  [dbo].[proyectos]
  DBCC CHECKIDENT ([proyectos], RESEED, 0)

  delete from   [dbo].[RegistroParticipantes]
  DBCC CHECKIDENT ([RegistroParticipantes], RESEED, 0)
