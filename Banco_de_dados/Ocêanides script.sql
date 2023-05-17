drop database oceanides;
create database oceanides;
use oceanides;

-- Criando a tabela transportadora
create table Empresa (
IdEmpresa INT PRIMARY KEY AUTO_INCREMENT,
NomeEmpresa VARCHAR (45),
CNPJEmpresa CHAR (18),
EmailEmpresa VARCHAR (45)
);


Create table Funcionario (
IdFuncionario INT,
NomeFuncionario VARCHAR (50),
EmailFuncionario VARCHAR (50),
SenhaFuncionario CHAR (8),
FkEmpresaFuncionario INT,
CONSTRAINT FkEmpresa FOREIGN KEY (FkEmpresaFuncionario) REFERENCES Empresa(idEmpresa),
Fk_ADM INT,
CONSTRAINT FK_ADM FOREIGN KEY (FK_ADM) REFERENCES Funcionario (idFuncionario),
CONSTRAINT PkFuncionario PRIMARY KEY (IdFuncionario, FkEmpresaFuncionario)
);

CREATE TABLE Container(
IdContainer INT PRIMARY KEY auto_increment,
Codigo_C CHAR (11),
Nome_Container VARCHAR(50),

AltaTemp_Risco DECIMAL(5, 2),
AltaTemp_Alerta DECIMAL(5, 2),
Temp_Ideal DECIMAL(5, 2),
BaixaTemp_Alerta DECIMAL(5, 2),
BaixaTemp_Risco DECIMAL(5, 2),

AltaUmd_Risco DECIMAL(5, 2),
AltaUmd_Alerta DECIMAL(5, 2),
Umd_Ideal DECIMAL(5, 2),
BaixaUmd_Alerta DECIMAL(5, 2),
BaixaUmd_Risco DECIMAL(5, 2),

FkEmpresaContainer INT,
CONSTRAINT FkEmpresaContainer FOREIGN KEY (FkEmpresaContainer) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Porto (
IDPorto INT PRIMARY KEY AUTO_INCREMENT,
Sigla_P VARCHAR (5),
Pais_P VARCHAR (10)
);

CREATE TABLE Rota (
IdRota INT,
FkContainer INT,
CONSTRAINT FkContainer FOREIGN KEY (FkContainer) REFERENCES Container(idContainer),
Fkporto INT,
CONSTRAINT Fkporto FOREIGN KEY (Fkporto) REFERENCES Porto(idPorto),
CONSTRAINT PkRota PRIMARY KEY (IdRota , FkContainer, FkPorto)
);

CREATE TABLE Sensor (
IdSensor INT PRIMARY KEY AUTO_INCREMENT,
Dt_Sensor_Instalação DATETIME,
Status_S INT, CONSTRAINT CHKSta CHECK(Status_S in('1','0')),
FkContainer_S INT,
CONSTRAINT FkContainer_S FOREIGN KEY (FkContainer_S) REFERENCES Container(IdContainer)
);

CREATE TABLE Registro (
idRegistro INT auto_increment,
Dt_Registro DATETIME default current_timestamp,
TemperaturaAlta DECIMAL(5, 2),
TemperaturaIntermediaria DECIMAL(5, 2),
TemperaturaBaixa DECIMAL(5, 2),
Umidade DECIMAL(5, 2),
FkSensor_R INT,
CONSTRAINT FkSensor_R FOREIGN KEY (FkSensor_R) REFERENCES Sensor(idSensor),
CONSTRAINT PkCompSen_R PRIMARY KEY (IdRegistro,FkSensor_R)
);

/* Inserir dados na tabela Empresa */ 
INSERT INTO Empresa VALUES 
	(null, 'Frutas Delícia', '12.345.678/0001-01', 'contato@empresaA.com'),
	(null, 'Mango Express', '98.765.432/0001-02', 'contato@empresaB.com'),
	(null, 'Bananas Ricas', '87.654.321/0001-03', 'contato@empresaC.com'),
	(null, 'Kiwi Transportes', '34.567.890/0001-04', 'contato@empresaD.com'),
	(null, 'Uva Express', '21.654.987/0001-05', 'contato@empresaE.com');

INSERT INTO Container VALUES
(1,'ABCD1234567', 'Container Uvas', 1, 0.76, 0.42, 0.41, 0, 95, 91.34, 90.46, 90.45, 90, 1),
(2,'EFGH7654321', 'Container Laranjas', 8, 6.82, 5.1, 5.09, 3, 95, 91.34, 90.46, 90.45, 90, 1),
(3,'WXYZ0987654', 'Container Mangas', 14, 13.05, 11.65, 11.64, 10, 95, 91.34, 90.46, 90.45, 90,2),
(4,'KLMN2468013', 'Container Mangas', 14, 13.05, 11.65, 11.64, 10, 95, 91.34, 90.46, 90.45, 90,2),
(5,'QRST5432109', 'Container Bananas', 14, 13.05, 11.65, 11.64, 10, 95, 91.34, 90.46, 90.45, 90,3);

INSERT INTO Porto VALUES
(null, 'BR', 'Brasil'),
(null, 'US', 'EUA'),
(null, 'FR', 'França'),
(null, 'JP', 'Japão'),
(null, 'CN', 'China');

INSERT INTO Rota VALUES
(1, 5, 2),
(2, 3, 1),
(3, 4, 4),
(4, 2, 5),
(5, 1, 3);

INSERT INTO Sensor VALUES
(null, '2023-04-18 10:00:00', 1, 1),
(null, '2023-04-18 11:30:00', 1, 2),
(null, '2023-04-18 12:45:00', 0, 3),
(null, '2023-04-18 14:15:00', 1, 4),
(null, '2023-04-18 15:30:00', 0, 5);

INSERT INTO Registro VALUES
(1, '2023-04-18 10:00:00', 30.0,0.50, 0.4,91, 1),
(2, '2023-04-18 11:30:00', 32,6.00, 05,90.80, 2),
(3, '2023-04-18 12:45:00', 41,12, 0.9,90, 3),
(4, '2023-04-18 14:15:00', 41,13, 0.3,90.9, 4),
(5, '2023-04-18 15:30:00', 24,11, 0.1,90.4, 5);