drop database oceanides;
create database oceanides;
use oceanides;

-- Criando a tabela transportadora
create table Transportadora (
IdTransportadora INT PRIMARY KEY AUTO_INCREMENT,
Nome_T VARCHAR (45),
CNPJ_T CHAR (14),
Email_T VARCHAR (45),
Senha CHAR(12)
);

desc transportadora;

Create table Usuario (
idUsuario INT,
Nome_U VARCHAR (50),
Email_U VARCHAR (50),
Senha_U CHAR (8),
FKtransportadora_U int,
CONSTRAINT FKtransportadora_u FOREIGN KEY (FKtransportadora_u) REFERENCES Transportadora (idtransportadora),
Fk_ADM TINYINT (1),
CONSTRAINT FK_ADM FOREIGN KEY (FK_ADM) REFERENCES Usuario (idUsuario),
CONSTRAINT PKUsuario PRIMARY KEY (IdUsuario, FKtransportadora_U, FK_ADM)
);

CREATE TABLE Container(
IdContainer INT PRIMARY KEY auto_increment,
Codigo_C CHAR (11),
AltaTemp_Risco DECIMAL,
Temp_Ideal DECIMAL,
BaixaTemp_Alerta DECIMAL,
BaixaTemp_Risco DECIMAL,
FkTransportadora_C INT,
CONSTRAINT FkTransportadora_C FOREIGN KEY (FkTransportadora_C) REFERENCES Transportadora(idTransportadora)
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
Temperatura DOUBLE,
Umidade DOUBLE,
FkSensor_R INT,
CONSTRAINT FkSensor_R FOREIGN KEY (FkSensor_R) REFERENCES Sensor(idSensor),
CONSTRAINT PkCompSen_R PRIMARY KEY (IdRegistro,FkSensor_R)
);

INSERT INTO Transportadora (Nome_T, CNPJ_T, Email_T, Senha) VALUES 
('Frutas Delícia','78901234567890', 'contato@frutasdelicia.com.br', 'senha1234567'),
('Mango Express', '34567890123456', 'contato@mangoexpress.com.br', 'veloz123139'),
('Bananas Ricas', '90123456789012', 'contato@bananasricas.com.br', 'senhaagil456'), 
('Kiwi Transportes', '56789012345678', 'contato@kiwitransportes.com.br', 'expresso7891'),
('Uva Express', '12345678901234', 'contato@uvaexpress.com.br', 'senha1234568');

INSERT INTO Container VALUES
(1,'ABCD1234567', 28, -20, 0, -5, 1),
(2,'EFGH7654321', 30, -18, -3, -8, 1),
(3,'WXYZ0987654', 32, -15, -2, -10, 2),
(4,'KLMN2468013', 25, -10, -5, -12, 2),
(5,'QRST5432109', 20, -5, -10, -15, 3);

INSERT INTO Porto (Sigla_P, Pais_P) VALUES
('BR', 'Brasil'),
('US', 'EUA'),
('FR', 'França'),
('JP', 'Japão'),
('CN', 'China');

INSERT INTO Rota (IdRota, FkContainer, Fkporto) VALUES
(1, 5, 2),
(2, 3, 1),
(3, 4, 4),
(4, 2, 5),
(5, 1, 3);

INSERT INTO Sensor (Dt_Sensor_Instalação, Status_S, FkContainer_S) VALUES
('2023-04-18 10:00:00', 1, 1),
('2023-04-18 11:30:00', 0, 2),
('2023-04-18 12:45:00', 1, 3),
('2023-04-18 14:15:00', 0, 4),
('2023-04-18 15:30:00', 1, 5);

INSERT INTO Registro (idRegistro, Dt_Registro, Temperatura, Umidade, FkSensor_R) VALUES
(1, '2023-04-18 10:00:00', 25.5, 65.2, 1),
(2, '2023-04-18 11:30:00', 23.8, 70.1, 2),
(3, '2023-04-18 12:45:00', 27.3, 55.6, 3),
(4, '2023-04-18 14:15:00', 20.1, 45.3, 4),
(5, '2023-04-18 15:30:00', 22.7, 60.8, 5);