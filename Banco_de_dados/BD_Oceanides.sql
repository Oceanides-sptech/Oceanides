/*como fizemos esse banco antes da Vivian ensinar 
chave estrangeira todas elas estão como comentários
boa sorte, acho que coloquei muitos comentários, hehe
*/
create database oceanides;
use oceanides;

/* tabela que guarda os registros da transportadora, 
também pode ser usada para armazenar informações 
de filiais e talvez até alguns parceiros
*/
create table tb_transportadora(
    id_transportadora int primary key auto_increment,
    nome_transportadora varchar(50),
    CNPJ_tranportadora char(15)
);

/* tabela que guarda os dados dos portos ao redor do mundo
usada para fazer chave estrangeira com a tabela que 
registra viagens dos cargueiros
*/
create table tb_porto(
    id_porto int primary key auto_increment,
    nome_porto varchar(50),
    sigla_porto char (7),
    pais_porto varchar(50)
);

/* usuário para acessar o site institucional
os usuários têm que ter uma empresa no registro
para acessar o monitoramento dos sensores 
*/
create table tb_usuario(
    id_usuario int primary key auto_increment,
    nome_usuario varchar(100),
    email_usuario varchar(100),
    senha_usuario varchar(25),
    empresa_usuario varchar (45),
    passaporte_usuario varchar (45)
    -- chave estrangeira com transportadora
);

-- fk transportadora na tabela usuario
alter table tb_usuario add column fktransportadora int,
	add foreign key (fktransportadora) references tb_transportadora (id_transportadora);

desc tb_usuario;


/* guarda informações do cargueiro, 
obs: IMO é tipo um RG dos cargueiros
depois de analisar vimos que daria para dividir essa tabela,
já que guardar informações das viagens e dos cargueiros na
mesma tabela não faz sentido
*/
create table tb_cargueiro(
    id_cargueiro int primary key auto_increment,
    nome_cargueiro varchar(50),
    IMO_cargueiro char(7),
    dt_saida datetime,
    local_origem varchar(10),
    local_destino varchar(10)
-- FKPorto_destino
-- Fkporto_saida
);

-- fk transportadora na tabela usuario
alter table tb_cargueiro add column fkporto_destino int,
	add foreign key (fkporto_destino) references tb_porto (id_porto);

alter table tb_cargueiro add column fkporto_saida int,
	add foreign key (fkporto_saida) references tb_porto (id_porto);

desc tb_cargueiro;

/* dados dos containeres, talvez seja necessário implementar
alguns campos a mais no futuro, se precisar
*/
create table tb_container(
    id_container int primary key auto_increment,
    modelo_container varchar(50),
    codigo_container char(12),
    tamanho_container float
    -- chave estrangeira com cargueiro
);

-- fk transportadora na tabela usuario
alter table tb_container add column fkcargueiro int,
	add foreign key (fkcargueiro) references tb_cargueiro (id_cargueiro);

desc tb_container;

/* informações dos sensores, não confunda com a próxima tabela
essa guarda apenas os dados dos sensores e não seus registros
*/
create table tb_sensor(
    id_sensor int primary key auto_increment,
    modelo_sensor varchar(10),
    validade date,
    instalacao date,
    status_sensor tinyint
);

/* e aqui fica o núcleo do banco, todos os registros de temperatura
e umidade ficam aqui, então na hora de fazer o insert dos 
registros dos sensores vai ser aqui, ok!?
*/
create table tb_Registro(
	idRegistro int primary key auto_increment,
    dt_registro datetime,
    temperatura varchar (45),
    umidade varchar (45)
	-- chave estrangeira sensor 
	-- chave estrangeira container
    -- fk usuario
);

-- adicionamos a chave estrangeira na tabela registro.
alter table tb_registro add column fkuser int,
	add foreign key (fkuser) references tb_usuario (id_usuario);

alter table tb_registro add column fksensor int,
	add foreign key (fksensor) references tb_sensor (id_sensor);
 
alter table tb_registro add column fkcontainer int,
	add foreign key (fkcontainer) references tb_container (id_container);

desc tb_registro;
select * from tb_registro;

/* daqui para baixo são apenas alguns exemplos de insert nas tabelas
se tiver alguma dúvida no tipo de dado que é pra dar insert só olhar aqui ;)
*/
insert into tb_usuario(nome_usuario, email_usuario, senha_usuario) values
    ('Lucas Faria', 'lucas.flima@sptech.school', '21102002'),
    ('Katherinne', 'katherinne.silva@sptech.school', '01234567'),
    ('Jack Sparrow', 'jack.sparrow@gmail.com', '98765432'),
    ('Popeye Espinafre', 'popeye.espinafre@gmail.com', '12345678'),
    ('Wilson Machado', 'wilson.machado@gmail.com','12345678'),
    ('Barba Negra', 'barbanegra@gmail.com', '12345678'),
    ('Luhul Crocodile', 'crocodile.capitao@gmail.com', '12345678'),
    ('Arthur Curry', 'arthurcurry@gmail.com', '12345678'),
    ('Jhon Nemon', 'nemo.captain@gmail.com', '12345678'),
    ('Fernão de Magalhães', 'magalhaes.fernao@gmail.com', '12345678');

insert into tb_transportadora(nome_transportadora, CNPJ_tranportadora) values
	('Blitz Fretes Ltda', '32675333000139'),
	('GP Transportes Ltda', '01678345000219'),
	('Nocturne Transportadoras Ltda', '01335423100019'),
	('Irealia QE', '22663001000119'),
	('Akaly Banceamentos', '02466011000129'),
	('Arhi Charm Transportes', '30576101000119'),
	('Neeko`s Cheese Bread', '70976151000109');
    
insert into tb_porto(nome_porto, sigla_porto, pais_porto) values
	('Porto de Santos', 'BRSSZ', 'Brasil'),
    ('Porto de Nova York', 'USNYC', 'Estados Unidos'),
    ('Porto de Le Havre', 'FRLHV','França'),
    ('Porto de Tanger Med', 'MATNG', 'Marrocos'),
    ('Porto de Xangai', 'CNSHA', 'China'),
    ('Porto de Sydney', 'AUSYD', 'Austrália');

insert into tb_cargueiro(nome_cargueiro, IMO_cargueiro, dt_saida, local_origem, local_destino) values
	('Aliança Manaus', '9156325', '2023-10-25 14:40:25', 'BRSSZ', 'USNYC'),
	('Cap San Lorenzo', '9283221', '2023-10-23 13:20:45', 'FRLHV', 'CNSHA'),
	('Log-In Amazonia', '9700035', '2023-10-26 09:15:58', 'MATNG', 'AUSYD'),
	('Log-In Tempestade', '9785734', '2023-10-25 11:57:35', 'USNYC', 'BRSSZ'),
	('Log-In Resilience', '9700019', '2023-10-19 16:22:19', 'CNSHA', 'MATNG');

insert into tb_container(modelo_container, codigo_container) values
	('20 Standart', 'MSCU 1234567'),
    ('40 Standart', 'JBDS 5432672'),
    ('20 Standart', 'LMFK 1616506'),
    ('40 Standart', 'MHRS 8448132'),
    ('20 Standart', 'JVSC 2198123'),
    ('40 Standart', 'KASS 7445184'),
    ('Freezer Container', 'LFLA 3969285'),
    ('Freezer Container', 'KSWB 5124821'),
    ('40 Standart', 'DSQC 9852384'),
    ('20 Standart', 'VBCD 3547841');
    
insert into tb_sensor(modelo_sensor, validade, instalacao) values
	('DHT11', '2032-02-27', '2022-10-19'),
	('DHT11', '2032-02-27', '2022-10-19'),
	('DHT11', '2032-02-27', '2022-10-19'),
	('DHT11', '2032-02-27', '2022-10-19'),
	('DHT11', '2032-03-25', '2022-09-27'),
	('DHT11', '2032-03-25', '2022-09-27'),
	('DHT11', '2032-03-25', '2022-09-27'),
	('DHT11', '2032-03-25', '2022-09-27'),
	('DHT11', '2034-05-27', '2024-03-03'),
	('DHT11', '2034-05-27', '2024-03-03'),
	('DHT11', '2034-05-27', '2024-03-03'),
	('DHT11', '2034-05-27', '2024-03-03'),
	('AHT10', '2035-05-27', '2025-11-14'),
	('AHT10', '2035-05-27', '2025-11-14'),
	('AHT10', '2035-05-27', '2025-11-14'),
	('AHT10', '2035-05-27', '2025-11-14'),
	('AHT10', '2037-05-27', '2025-11-15'),
	('AHT10', '2037-05-27', '2025-11-15'),
	('AHT10', '2037-05-27', '2025-11-15'),
	('AHT10', '2037-05-27', '2025-11-15'),
	('DHT22', '2049-03-21', '2059-12-06'),
	('DHT22', '2049-03-21', '2059-12-06'),
	('DHT22', '2049-03-21', '2059-12-06'),
	('DHT22', '2049-03-21', '2059-12-06'),
	('DHT22', '2049-03-21', '2059-12-06'),
	('DHT22', '2030-03-21', '2040-11-14'),
	('DHT22', '2030-03-21', '2040-11-14'),
	('DHT22', '2030-03-21', '2040-11-14'),
	('DHT22', '2030-03-21', '2040-11-14'),
	('DHT22', '2030-03-21', '2040-11-14'),
	('H-474AC', '2042-05-27', '2052-08-23'),
	('H-474AC', '2042-05-27', '2052-08-23'),
	('H-474AC', '2042-05-27', '2052-08-23'),
	('H-474AC', '2042-05-27', '2052-08-23'),
	('H-474AC', '2042-05-27', '2052-08-23'),
	('H-474AC', '2042-05-27', '2052-08-23'),
	('H-474AC', '2032-06-22', '2042-08-03'),
	('H-474AC', '2032-06-22', '2042-08-03'),
	('H-474AC', '2032-06-22', '2042-08-03'),
	('H-474AC', '2032-06-22', '2042-08-03'),
	('H-474AC', '2032-06-22', '2042-08-03');

insert into tb_registro(temperatura, umidade, dt_registro) values
	('24.1', '55.5', '2023-03-10 19:02:30'),
	('24.1', '55.5', '2023-03-10 19:02:30'),
	('24.1', '55.5', '2023-03-10 19:02:30'),
	('24.1', '55.5', '2023-03-10 19:02:30'),
	('24.1', '55.5', '2023-03-10 19:02:30'),
	('31.7', '31.5', '2023-03-28 18:59:53'),
	('31.7', '31.5', '2023-03-28 18:59:53'),
	('31.7', '31.5', '2023-03-28 18:59:53'),
	('31.7', '31.5', '2023-03-28 18:59:53'),
	('27.4', '27.7', '2027-07-27 07:07:27'),
	('27.4', '27.7', '2027-07-27 07:07:27'),
	('27.4', '27.7', '2027-07-27 07:07:27'),
	('27.4', '27.7', '2027-07-27 07:07:27'),
	('27.4', '27.7', '2027-07-27 07:07:27'),
	('33.7', '35.8', '2028-12-25 00:05:25'),
	('33.7', '35.8', '2028-12-25 00:05:25'),
	('33.7', '35.8', '2028-12-25 00:05:25'),
	('33.7', '35.8', '2028-12-25 00:05:25'),
	('33.7', '35.8', '2028-12-25 00:05:25'),
	('20.1', '21.8', '2029-05-27 04:27:42'),
	('20.1', '21.8', '2029-05-27 04:27:42'),
	('20.1', '21.8', '2029-05-27 04:27:42'),
	('20.1', '21.8', '2029-05-27 04:27:42'),
	('20.1', '21.8', '2029-05-27 04:27:42'),
	('39.1', '17.6', '2030-10-12 08:30:01'),
	('39.1', '17.6', '2030-10-12 08:30:01'),
	('39.1', '17.6', '2030-10-12 08:30:01'),
	('39.1', '17.6', '2030-10-12 08:30:01'),
	('27.1', '29.2', '2031-02-09 12:32:27'),
	('27.1', '29.2', '2031-02-09 12:32:27'),
	('27.1', '29.2', '2031-02-09 12:32:27'),
	('27.1', '29.2', '2031-02-09 12:32:27'),
	('27.1', '29.2', '2031-02-09 12:32:27'),
	('27.1', '29.2', '2031-02-09 12:32:27'),
	('22.9', '30.5', '2032-03-03 14:57:33'),
	('22.9', '30.5', '2032-03-03 14:57:33'),
	('22.9', '30.5', '2032-03-03 14:57:33'),
	('22.9', '30.5', '2032-03-03 14:57:33'),
	('22.9', '30.5', '2032-03-03 14:57:33'),
	('34.9', '11.5', '2033-07-08 16:34:23'),
	('34.9', '11.5', '2033-07-08 16:34:23'),
	('34.9', '11.5', '2033-07-08 16:34:23'),
	('34.9', '11.5', '2033-07-08 16:34:23'),
	('34.9', '11.5', '2033-07-08 16:34:23');

-- boa sorte e cuidem bem do nosso projeto :) 