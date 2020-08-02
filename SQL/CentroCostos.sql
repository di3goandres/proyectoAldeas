use proyectosAldea;
DROP TABLE IF EXISTS SubCentroCostos;
DROP TABLE IF EXISTS CentroCostos;



CREATE TABLE CentroCostos (
  id   [int] IDENTITY(1,1) NOT NULL,
  Codigo int NOT NULL ,
  CentroCosto varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (Codigo)
)
GO
CREATE TABLE SubCentroCostos (
  id   [int] IDENTITY(1,1) NOT NULL,
  CodigoCentro  int  NOT NULL  ,
  SubCodigo varchar(255)  NOT NULL ,
  SubCentroCosto varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (id), 
  CONSTRAINT FK_CENTRO_SUB FOREIGN KEY (CodigoCentro) REFERENCES CentroCostos(Codigo)

)
GO

INSERT INTO CentroCostos ( Codigo, CentroCosto)
values
(1, 'Activo'),
(2, 'Pasivo'),
(3, 'Patrimonio')

GO
INSERT INTO SubCentroCostos ( CodigoCentro,SubCodigo,  SubCentroCosto)
values
(1, '1', 'Activo'),
(1, '11', 'Disponible'),
(1, '1105', 'Caja'),

(2, '2', 'Pasivo'),
(2, '21', 'Obligaciones Financieras'),
(2, '2105', 'Bancos Nacionales'),

(3, '3', 'Patrimonio'),
(3, '31', 'Capital Social'),
(3, '3105', 'Capital Suscrito por y pagado')
GO