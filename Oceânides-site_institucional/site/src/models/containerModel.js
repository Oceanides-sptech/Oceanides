var database = require('../database/config')

function listarEmpresa(idEmpresa) {
    var instrucao = ` 
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
    GROUP BY idContainer) AND fkEmpresaContainer = ${idEmpresa};
    `
    return database.executar(instrucao)
}

function listarContainer(idContainer) {
    var instrucao = ` SELECT *  FROM container JOIN faixaTemperatura on fkFaixaTemperatura = idFaixaTemperatura where idContainer = ${id};`
    return database.executar(instrucao)
} 
module.exports = {
    listarEmpresa,
    listarContainer,
}