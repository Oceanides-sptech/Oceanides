drop database oceanides;
create database oceanides;
use oceanides;

-- Criando a tabela transportadora
create table Transportadora (
IdTransportadora INT PRIMARY KEY AUTO_INCREMENT,
Nome_T VARCHAR (50),
CNPJ_T CHAR (14)
);

select * from sptech;

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
Sigla_P VARCHAR (3),
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
CONSTRAINT PKCompCarg PRIMARY KEY (idRota, FkPorto_Saida_R, FkPorto_Destino_R, FKCargueiro_R)
);

CREATE TABLE Sensor (
IdSensor INT PRIMARY KEY AUTO_INCREMENT,
Dt_Sensor_Instalação DATETIME,
Status_S INT, CONSTRAINT CHKSta CHECK(Status_S in('1','0')),
FkContainer_S INT,
CONSTRAINT FkContainer_S FOREIGN KEY (FkContainer_S) REFERENCES Container(IdContainer)
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

INSERT INTO Transportadora VALUES
(null, 'FastExpress', '12345678901234'),
(null,'CargoMasters', '98765432109876'),
(null,'SwiftLogistics', '56789012345678'),
(null,'SpeedyShippers', '43210987654321'),
(null,'StarHaulers', '98765432101234'),
(null,'ThunderTransit', '12345678909876'),
(null,'EagleFreight', '56789012354321'),
(null,'AeroLogistics', '43210987609876');

INSERT INTO Usuario VALUES
(1, 'João Silva', 'joao.silva@example.com', 'abc12345', 1),
(2, 'Maria Santos', 'maria.santos@example.com', 'def67890', 2),
(3, 'Carlos Pereira', 'carlos.pereira@example.com', 'ghi54321', 1),
(4, 'Ana Costa', 'ana.costa@example.com', 'jkl98765', 3),
(5, 'Pedro Fernandes', 'pedro.fernandes@example.com', 'mno45678', 2),
(6, 'Luiza Santos', 'luiza.santos@example.com', 'pqr12345', 4),
(7, 'Fernando Lima', 'fernando.lima@example.com', 'stu67890', 3),
(8, 'Mariana Sousa', 'mariana.sousa@example.com', 'vwx54321', 4);

INSERT INTO Cargueiro VALUES
(1, 'Maré Brava', 'ABC1234', 1),
(2, 'Vento Forte', 'DEF5678', 2),
(3, 'Onda Selvagem', 'GHI9012', 1),
(4, 'Navegador Audaz', 'JKL3456', 3),
(5, 'Estrela dos Mares', 'MNO7890', 2),
(6, 'Maré Serena', 'PQR2345', 4),
(7, 'Bravo Marujo', 'STU6789', 3),
(8, 'Céu Estrelado', 'VWX0123', 4);

INSERT INTO Container VALUES
(1,'ABCD1234567', 28, -20, 0, -5, 1),
(2,'EFGH7654321', 30, -18, -3, -8, 1),
(3,'WXYZ0987654', 32, -15, -2, -10, 2),
(4,'KLMN2468013', 25, -10, -5, -12, 2),
(5,'QRST5432109', 20, -5, -10, -15, 3),
(6,'UVWX9876543', 22, -3, -12, -18, 3),
(7,'JKLM3210987', 18, -8, -15, -20, 4),
(8,'OPQR2345678', 15, -12, -18, -25, 4);
select * from Container;

INSERT INTO Porto (Sigla_P, Pais_P) VALUES
('RJ', 'Brasil'),
('LA', 'Estados Unidos'),
('PA', 'França'),
('TK', 'Japão'),
('SH', 'China'),
('SYD', 'Austrália'),
('UK', 'Reino Unido'),
('BCN', 'Espanha');

INSERT INTO Rota (IdRota, FkPorto_Saida_R, FkPorto_Destino_R, Data_Rota, FKCargueiro_R) VALUES
(1, 1, 2, '2023-04-18 10:00:00', 1),
(2, 3, 4, '2023-04-18 12:30:00', 2),
(3, 2, 5, '2023-04-18 15:45:00', 3),
(4, 4, 1, '2023-04-18 18:20:00', 4),
(5, 5, 3, '2023-04-18 20:10:00', 5),
(6, 3, 1, '2023-04-18 22:30:00', 6),
(7, 4, 5, '2023-04-18 23:45:00', 7),
(8, 2, 4, '2023-04-19 01:15:00', 8);

INSERT INTO Sensor (Dt_Sensor_Instalação, Status_S, FkContainer_S) VALUES
('2023-04-18 10:00:00', 1, 1),
('2023-04-18 11:30:00', 0, 2),
('2023-04-18 12:45:00', 1, 3),
('2023-04-18 14:15:00', 0, 4),
('2023-04-18 15:30:00', 1, 5),
('2023-04-18 16:45:00', 0, 6),
('2023-04-18 18:00:00', 1, 7),
('2023-04-18 19:15:00', 0, 8);

INSERT INTO Registro (idRegistro, Dt_Registro, Temperatura, Umidade, FkSensor_R) VALUES
(1, '2023-04-18 10:00:00', 25.5, 65.2, 1),
(2, '2023-04-18 11:30:00', 23.8, 70.1, 2),
(3, '2023-04-18 12:45:00', 27.3, 55.6, 3),
(4, '2023-04-18 14:15:00', 20.1, 45.3, 4),
(5, '2023-04-18 15:30:00', 22.7, 60.8, 5),
(6, '2023-04-18 16:45:00', 18.9, 50.2, 6),
(7, '2023-04-18 18:00:00', 24.6, 58.7, 7),
(8, '2023-04-18 19:15:00', 26.8, 62.3, 8);