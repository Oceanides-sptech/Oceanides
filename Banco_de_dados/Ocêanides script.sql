drop database oceanides;
create database oceanides;
use oceanides;

-- Criando a tabela transportadora
create table Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR (45),
CNPJEmpresa CHAR (18),
emailEmpresa VARCHAR (45)
);


Create table Usuario (
idUsuario INT auto_increment,
nomeUsuario VARCHAR (50),
emailUsuario VARCHAR (50),
senhaUsuario CHAR (30),
fkEmpresaUsuario INT,
CONSTRAINT FkEmpresa FOREIGN KEY (FkEmpresaUsuario) REFERENCES Empresa(idEmpresa),
fk_ADM INT default null,
CONSTRAINT FK_ADM FOREIGN KEY (FK_ADM) REFERENCES Usuario (idUsuario),
CONSTRAINT PkUsuario PRIMARY KEY (IdUsuario, FkEmpresaUsuario)
);

CREATE TABLE FaixaTemperatura(
idFaixaTemperatura INT PRIMARY KEY AUTO_INCREMENT,
nivelFaixa varchar(30),

temperaturaAltaCritica DECIMAL(5, 2),
temperaturaAltaAlerta DECIMAL(5, 2),
temperaturaIdeal DECIMAL(5, 2),
temperaturaBaixaAlerta DECIMAL(5, 2),
temperaturaBaixaCritica DECIMAL(5, 2)
);

CREATE TABLE FaixaUmidade(
	idFaixaUmidade int primary key,
    umidadeAltaCritica DECIMAL(5, 2),
	umidadeAltaAlerta DECIMAL(5, 2),
	umidadeIdeal DECIMAL(5, 2),
	umidadeBaixaAlerta DECIMAL(5, 2),
	umidadeBaixaCritica DECIMAL(5, 2)
);

CREATE TABLE Container(
idContainer INT PRIMARY KEY auto_increment,
codigo CHAR (11),
nomeContainer VARCHAR(50),
fkEmpresaContainer INT,
fkFaixaTemperatura  INT,
fkFaixaUmidade INT DEFAULT 1,
CONSTRAINT FkEmpresaContainer FOREIGN KEY (fkEmpresaContainer) REFERENCES Empresa(idEmpresa),
CONSTRAINT fkFaixaTemperatura FOREIGN KEY (fkFaixaTemperatura) REFERENCES FaixaTemperatura(idFaixaTemperatura),
CONSTRAINT fkFaixaUmidade FOREIGN KEY (fkFaixaUmidade) REFERENCES FaixaUmidade(idFaixaUmidade)
);

CREATE TABLE Porto (
IdPorto INT PRIMARY KEY AUTO_INCREMENT,
siglaPorto VARCHAR (5),
paisPorto VARCHAR (10)
);

CREATE TABLE Rota (
idRota INT,
fkContainer INT,
CONSTRAINT FkContainer FOREIGN KEY (fkContainer) REFERENCES Container(idContainer),
fkPorto INT,
CONSTRAINT Fkporto FOREIGN KEY (fkPorto) REFERENCES Porto(idPorto),
CONSTRAINT PkRota PRIMARY KEY (idRota , fkContainer, fkPorto)
);

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
dtInstalacao DATETIME,
statusSensor INT DEFAULT 1, CONSTRAINT CHKSta CHECK(statusSensor in('1','0')),
fkContainer INT,
CONSTRAINT FkContainer_S FOREIGN KEY (fkContainer) REFERENCES Container(idContainer)
);

CREATE TABLE Registro (
idRegistro INT auto_increment,
dtRegistro DATETIME default current_timestamp,
temperatura DECIMAL(5, 2),
umidade DECIMAL(5, 2),
fkSensor INT,
CONSTRAINT FkSensor_R FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
CONSTRAINT PkCompSen_R PRIMARY KEY (idRegistro,fkSensor)
);

/* Inserir dados na tabela Empresa */ 
INSERT INTO Empresa VALUES 
	(null, 'Frutas Delícia', '12.345.678/0001-01', 'contato@empresaA.com'),
	(null, 'Mango Express', '98.765.432/0001-02', 'contato@empresaB.com'),
	(null, 'Bananas Ricas', '87.654.321/0001-03', 'contato@empresaC.com'),
	(null, 'Kiwi Transportes', '34.567.890/0001-04', 'contato@empresaD.com'),
	(null, 'Uva Express', '21.654.987/0001-05', 'contato@empresaE.com');


INSERT INTO FaixaTemperatura VALUES
(null, 'Baixa', 1, 0.76, 0.42, 0.41, 0),
(null, 'Intermediária', 8, 6.82, 5.1, 5.09, 3),
(null, 'Alta', 14, 13.05, 11.65, 11.64, 10);

INSERT INTO FaixaUmidade VALUES 
(1, 95, 91.34, 90.46, 90.45, 90);

INSERT INTO Container VALUES
(1,'ABCD1234567', 'Container Uvas', 5, 1, default),
(2,'EFGH7654321', 'Container Laranjas', 1, 2, default),
(3,'WXYZ0987654', 'Container Mangas', 2, 3, default),
(4,'KLMN2468013', 'Container Mangas', 2, 3, default),
(5,'QRST5432109', 'Container Bananas', 3, 3, default);

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
(null, '2023-04-18 12:45:00', 1, 3),
(null, '2023-04-18 14:15:00', 1, 4),
(null, '2023-04-18 15:30:00', 1, 5);

INSERT INTO Registro VALUES
(1, default, 0.44, 93, 1);

INSERT INTO Usuario VALUES
(null, 'Brandão', 'brandão@frutas.com', '123456', 1, null);

 SELECT temperatura as temperaturaCaptada, FaixaTemperatura.* 
	FROM registro JOIN sensor ON fkSensor = idSensor 
		JOIN container ON fkContainer = idContainer 
			JOIN FaixaTemperatura on fkFaixaTemperatura = idFaixaTemperatura 
				WHERE idFaixaTemperatura = 1