var database = require('../database/config')

function listarEmpresa(idEmpresa) {
    var instrucao = ` 
    SELECT container.*,temperatura, umidade FROM registro JOIN sensor ON fkSensor = idSensor 
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