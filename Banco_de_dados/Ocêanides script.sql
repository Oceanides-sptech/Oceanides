drop database oceanides;
create database oceanides;
use oceanides;

-- Criando a tabela transportadora
create table Transportadora (
IdTransportadora INT PRIMARY KEY AUTO_INCREMENT,
Nome_T VARCHAR (50),
CNPJ_T CHAR (14)
);

Create table Usuario (
idUsuario INT,
Nome_U VARCHAR (50),
Email_U VARCHAR (50),
Senha CHAR (8),
FKtransportadora_U int,
CONSTRAINT FKtransportadora_u FOREIGN KEY (FKtransportadora_u) REFERENCES Transportadora (idtransportadora),
CONSTRAINT PkCompTrans PRIMARY KEY (IDusuario,Fktransportadora_u)
);

CREATE TABLE Cargueiro (
idCargueiro INT,
Nome_C VARCHAR (45),
IMO_C CHAR (7),
FKtransportadora_C INT,
CONSTRAINT FKTRANSPORTADORA_C FOREIGN KEY (FKTRANSPORTADORA_C) REFERENCES Transportadora(idTransportadora),
CONSTRAINT PkCompTrans_C PRIMARY KEY (IDcargueiro,fKTransportadora_C)
);

CREATE TABLE Container(
IdContainer INT,
Codigo_C CHAR (11),
AltaTemp_Risco DECIMAL,
Temp_Ideal DECIMAL,
BaixaTemp_Alerta DECIMAL,
BaixaTemp_Risco DECIMAL,
FkCargueiro_C INT,
CONSTRAINT FkCargueiro_C FOREIGN KEY (FkCargueiro_C) REFERENCES Cargueiro (idCargueiro),
CONSTRAINT PkCompCarg PRIMARY KEY (IdContainer,FkCargueiro_C)
);

CREATE TABLE Porto (
IDPorto INT PRIMARY KEY AUTO_INCREMENT,
Sigla_P CHAR (5),
Pais_P VARCHAR (20)
);

CREATE TABLE Rota (
IdRota INT,
FkPorto_Saida_R INT,
CONSTRAINT FkPorto_Saida_R FOREIGN KEY (FkPorto_Saida_R) REFERENCES Porto(idPorto),
FkPorto_Destino_R INT,
CONSTRAINT FkPorto_Destino_R  FOREIGN KEY (FkPorto_Destino_R) REFERENCES Porto(idPorto),
Data_Rota DATETIME,
FKCargueiro_R INT,
CONSTRAINT FKCargueiro_R FOREIGN KEY (FKCargueiro_R) REFERENCES Cargueiro(idCargueiro),
CONSTRAINT PKCompCarg PRIMARY KEY (idRota, FkPorto_Saida_R, FkPorto_Destino_R)
);

CREATE TABLE Sensor (
IdSensor INT,
Dt_Sensor_Instalação DATETIME,
Status_S INT, CONSTRAINT CHKSta CHECK(Status_S in('1','0')),
FkContainer_S INT,
CONSTRAINT FkContainer_S FOREIGN KEY (FkContainer_S) REFERENCES Container(IdContainer),
CONSTRAINT PkCompConta_s PRIMARY KEY (IdSensor,FkContainer_S)
);

CREATE TABLE Registro (
idRegistro INT,
Dt_Registro DATETIME,
Temperatura DOUBLE,
Umidade DOUBLE,
FkSensor_R INT,
CONSTRAINT FkSensor_R FOREIGN KEY (FkSensor_R) REFERENCES Sensor(idSensor),
CONSTRAINT PkCompSen_R PRIMARY KEY (IdRegistro,FkSensor_R)
);