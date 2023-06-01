drop database oceanides;
create database oceanides;
use oceanides;

-- Criando a tabela transportadora
create table empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR (45),
CNPJEmpresa CHAR (18),
emailEmpresa VARCHAR (45)
);

Create table usuario (
idUsuario INT auto_increment,
nomeUsuario VARCHAR (50),
emailUsuario VARCHAR (50),
senhaUsuario CHAR (30),
fkEmpresaUsuario INT,
CONSTRAINT FkEmpresa FOREIGN KEY (FkEmpresaUsuario) REFERENCES empresa(idEmpresa),
fk_ADM INT default null,
CONSTRAINT FK_ADM FOREIGN KEY (FK_ADM) REFERENCES usuario (idUsuario),
CONSTRAINT PkUsuario PRIMARY KEY (IdUsuario, FkEmpresaUsuario)
);

CREATE TABLE faixaTemperatura(
idFaixaTemperatura INT PRIMARY KEY AUTO_INCREMENT,
nivelFaixa varchar(30),
temperaturaAltaCritica DECIMAL(5, 2),
temperaturaAltaAlerta DECIMAL(5, 2),
temperaturaIdeal DECIMAL(5, 2),
temperaturaBaixaAlerta DECIMAL(5, 2),
temperaturaBaixaCritica DECIMAL(5, 2)
);

CREATE TABLE faixaUmidade(
	idFaixaUmidade int primary key,
    umidadeAltaCritica DECIMAL(5, 2),
	umidadeAltaAlerta DECIMAL(5, 2),
	umidadeIdeal DECIMAL(5, 2),
	umidadeBaixaAlerta DECIMAL(5, 2),
	umidadeBaixaCritica DECIMAL(5, 2)
);

CREATE TABLE container(
idContainer INT PRIMARY KEY auto_increment,
codigo CHAR (11),
nomeContainer VARCHAR(50),
fkEmpresaContainer INT,
fkFaixaTemperatura  INT,
fkFaixaUmidade INT DEFAULT 1,
CONSTRAINT FkEmpresaContainer FOREIGN KEY (fkEmpresaContainer) REFERENCES empresa(idEmpresa),
CONSTRAINT fkFaixaTemperatura FOREIGN KEY (fkFaixaTemperatura) REFERENCES faixaTemperatura(idFaixaTemperatura),
CONSTRAINT fkFaixaUmidade FOREIGN KEY (fkFaixaUmidade) REFERENCES faixaUmidade(idFaixaUmidade)
);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
dtInstalacao DATETIME,
statusSensor INT DEFAULT 1, CONSTRAINT CHKSta CHECK(statusSensor in('1','0')),
fkContainer INT,
CONSTRAINT FkContainer_S FOREIGN KEY (fkContainer) REFERENCES container(idContainer)
);

CREATE TABLE registro (
idRegistro INT auto_increment,
dtRegistro DATETIME default current_timestamp,
temperatura DECIMAL(5, 2),
umidade DECIMAL(5, 2),
fkSensor INT,
CONSTRAINT FkSensor_R FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
CONSTRAINT PkCompSen_R PRIMARY KEY (idRegistro,fkSensor)
);

/* Inserir dados na tabela Empresa */ 
INSERT INTO empresa VALUES 
	(null, 'Frutas Delícia', '12.345.678/0001-01', 'frutas-delicias@frutas.com');

INSERT INTO usuario VALUES
(null, 'Brandão', 'brandao@frutas.com', '123456', 1, null);

INSERT INTO faixaTemperatura VALUES
(null, 'Baixa', 1, 0.76, 0.42, 0.41, 0),
(null, 'Intermediária', 8, 6.82, 5.1, 5.09, 3),
(null, 'Alta', 14, 13.05, 11.65, 11.64, 10);

INSERT INTO faixaUmidade VALUES 
(1, 95, 91.34, 90.46, 90.45, 90);

SELECT * FROM container;

 -- SELECTS DA DASHBOARD
 -- SELECT DA TELA DE CONTAINER:
SELECT container.*, 
	CASE 
    WHEN fkFaixaTemperatura = 1 THEN (SELECT temperatura * 0.09345 - 1.90654) 
	WHEN fkFaixaTemperatura = 2 THEN (SELECT  temperatura * 0.467228972 - 6.53) 
	WHEN fkFaixaTemperatura = 3 THEN (SELECT temperatura * 0.373832 + 2.373832) 
    end as temperatura, 
    umidade FROM registro JOIN sensor ON fkSensor = idSensor 
    JOIN container ON fkContainer = idContainer 
    where idRegistro IN (
    SELECT MAX(idRegistro)  FROM registro 
    JOIN sensor on fkSensor = idSensor 
    JOIN container ON fkContainer = idContainer
    GROUP BY idContainer)