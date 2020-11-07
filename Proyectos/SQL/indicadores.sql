
DELETE FROM [dbo].[Indicadores_PreguntasComplemento];

DELETE FROM [dbo].[Indicadores_preguntas];

DELETE FROM [dbo].[Indicadores];

DBCC CHECKIDENT ([Indicadores], RESEED, 0)
DBCC CHECKIDENT ([Indicadores_preguntas], RESEED, 0)
DBCC CHECKIDENT ([Indicadores_PreguntasComplemento], RESEED, 0)

SET IDENTITY_INSERT [dbo].[Indicadores]  ON
INSERT INTO [dbo].[Indicadores]
    (id, [NombreIndicador]
    ,[fechaCreacion]
    ,[fechaActualizacion])
VALUES
    (1, 'Educación en Emergencias', getdate(), getdate()),
    (2, 'Espacios Amigables', getdate(), getdate()),
    (3, 'Atención Humanitaria', getdate(), getdate()),
    (4, 'Fortalecimiento Familiar', getdate(), getdate())


SET IDENTITY_INSERT [dbo].[Indicadores]  OFF

GO

-- TIPO 1 PREGUNTAS DE SI Y NO -- 2 -- PREGUNTAS CON COMPLEMENTO
SET IDENTITY_INSERT [dbo].[Indicadores_preguntas]  ON
INSERT INTO [dbo].[Indicadores_preguntas]
    ( ID,
    [id_indicador]
    ,[id_indicador_pregunta_padre]
    ,[esPadre]
    ,[descripcion]
    ,[Tipo]
    ,[fechaCreacion]
    ,[fechaActualizacion])
VALUES
    -- INDICADOR NUMERO 1 Educación en Emergencias
    (1, 1, NULL, 1, '% de participantes que avanzan en sus derechos básicos de aprendizaje DBA', 0, GETDATE(), GETDATE()),
    (2, 1, 1, 0, '¿El participante cuenta con Valoración DBA?', 1, GETDATE(), GETDATE()),
    (3, 1, 1, 0, '¿El participante avanza en sus derechos básicos de aprendizaje?', 1, GETDATE(), GETDATE()),
    (4, 1, NULL, 1, '% de participantes que pasan a educación formal', 0, GETDATE(), GETDATE()),
    (5, 1, 4, 0, '¿El participante se encuentra matriculado en el Sistema de Educación Formal?', 1, GETDATE(), GETDATE()),
    (6, 1, 4, 0, '¿El participante asiste periódicamente al Sistema de Educación Formal?', 1, GETDATE(), GETDATE()),
    (7, 1, NULL, 1, '# de participantes que reciben materiales de aprendizaje', 0, GETDATE(), GETDATE()),
    (8, 1, 7, 0, '¿El participante recibió kits de materiales de aprendizaje?', 1, GETDATE(), GETDATE()),
    (9, 1, NULL, 1, '# de participantes priorizados que tienen un plan de apoyo psico-pedagógico', 0, GETDATE(), GETDATE()),
    (10, 1, 9, 0, '¿El participante fue priorizado para el apoyo psico-pedagógico?', 1, GETDATE(), GETDATE()),
    (11, 1, 9, 0, '¿El participante cuenta con Plan de apoyo psicopedagógico?', 1, GETDATE(), GETDATE()),
    (12, 1, 9, 0, '¿El participante avanza en su plan de apoyo psicopedagógico?', 1, GETDATE(), GETDATE()),
    (13, 1, NULL, 1, '# de participantes que conocen el Comité Local de Protección', 0, GETDATE(), GETDATE()),
    (14, 1, 13, 0, '¿El participante conoce el Comité Local de Protección?', 1, GETDATE(), GETDATE()) ,
    -- INDICADOR NUMERO 2 Espacios Amigables
    (15, 2, NULL, 1, '% de participantes que conocen sus derechos e identifican los factores de riesgo', 0, GETDATE(), GETDATE()),
    (16, 2, 15, 0, '¿El participante conoce sus derechos?', 1, GETDATE(), GETDATE()),
    (17, 2, 15, 0, '¿El participante identifica los riesgos de protección?', 1, GETDATE(), GETDATE()),

    (18, 2, NULL, 1, '# de niños, niñas y adolescentes que  cuentan con mayores capacidades y habilidades para la vida, en competencias ciudadanas, ejercicio de sus derechos y autocuidado.', 0, GETDATE(), GETDATE()),
    (19, 2, 18, 0, '¿El participante cuentan con mayores capacidades y habilidades para la vida, en competencias ciudadanas?', 1, GETDATE(), GETDATE()),
    (20, 2, 18, 0, '¿El participante cuentan con mayores capacidades y habilidades para la vida, en autocuidado?', 1, GETDATE(), GETDATE()),

    -- ESTE ES EL UNICO POR AHORA QUE TIENE LISTA 22
    (21, 2, NULL, 1, '# de niños, niñas y adolescentes que participan en iniciativas de participación', 0, GETDATE(), GETDATE()),
    (22, 2, 21, 0, '¿El niño, niña, adolescentes o joven, participa en inciativas de participación?', 2, GETDATE(), GETDATE()),


    (23, 2, NULL, 1, '# de participantes que conocen el Comité Local de Protección', 0, GETDATE(), GETDATE()),
    (24, 2, 23, 0, '¿El participante conoce el Comité Local de Protección?', 1, GETDATE(), GETDATE()),
    -- INDICADOR NUMERO 3 Atención Humanitaria
    (25, 3, NULL, 1, '# de participantes que reciben kits de aseo', 0, GETDATE(), GETDATE()),
    (26, 3, 25, 0, '¿El participante recibió kit de aseo?', 1, GETDATE(), GETDATE()),


    (27, 3, NULL, 1, '# de participantes que reciben kits/asistencia en alimentación', 0, GETDATE(), GETDATE()),
    (28, 3, 27, 0, '¿El participante recibió kits/asistencia en alimentación?', 1, GETDATE(), GETDATE()),

    (29, 3, NULL, 1, '# de participantes que reciben kists de COVID 19', 0, GETDATE(), GETDATE()),
    (30, 3, 29, 0, '¿El participante recibió Kit de COVID 19?', 1, GETDATE(), GETDATE()),

    (31, 3, NULL, 1, '# de participantes que reciben cartillas de formación', 0, GETDATE(), GETDATE()),
    (32, 3, 31, 0, '¿El participante recibió cartillas de formación?', 1, GETDATE(), GETDATE()),


    -- INDICADOR NUMERO 4 Fortalecimiento Familiar
    (33, 4, NULL, 1, '% de las familias que avanzan en las caracteristicas de cuidado y crianza para ser familias protectoras (Afectividad, estilo parental,habilidades de crianza participacion infantil)', 0, GETDATE(), GETDATE()),
    (34, 4, 33, 0, 'La familia avanzó en las caracteristicas de cuidado y crianza para ser familia protectora (Afectividad, estilo parental,habilidades de crianza participacion infantil)', 1, GETDATE(), GETDATE()),

    (35, 4, NULL, 1, '# de familias que conocen el Comité Local de Protección', 0, GETDATE(), GETDATE()),
    (36, 4, 35, 0, '¿El participante conoce el Comité Local de Protección?', 1, GETDATE(), GETDATE())


SET IDENTITY_INSERT [dbo].[Indicadores_preguntas]  OFF

GO
SET IDENTITY_INSERT [Indicadores_PreguntasComplemento] ON

INSERT INTO [Indicadores_PreguntasComplemento]
    (ID, [idPregunta]
    ,[opcion]
    ,[esOtro]
    ,[fechaCreacion]
    ,[fechaActualizacion])
VALUES
    (1,22, 'Cultural', 0, GETDATE(), GETDATE()),
    (2, 22, 'Deportiva', 0, GETDATE(), GETDATE()),
    (3, 22, 'Social', 0, GETDATE(), GETDATE()),
    (4, 22, 'Ambiental', 0, GETDATE(), GETDATE()),
    (5, 22, 'Otra', 1, GETDATE(), GETDATE())



SET IDENTITY_INSERT [Indicadores_PreguntasComplemento] OFF
