var database = require("../database/config");


function buscarTemperaturaUmidade(idContainer) {
    var instrucao = `SELECT container.*, 
	CASE 
    WHEN fkFaixaTemperatura = 1 THEN (SELECT TRUNCATE((temperatura * 0.09345 - 1.90654),2)) 
	WHEN fkFaixaTemperatura = 2 THEN (SELECT  TRUNCATE((temperatura * 0.467228972 - 6.53),2))
	WHEN fkFaixaTemperatura = 3 THEN (SELECT TRUNCATE((temperatura * 0.373832 + 2.373832),2)) 
    end as temperatura,
    DATE_FORMAT(dtRegistro, '%H:%i:%s') as momento_grafico,
    umidade,
    temperaturaAltaCritica,
    temperaturaAltaAlerta,
    temperaturaIdeal,
    temperaturaBaixaAlerta,
    temperaturaBaixaCritica,
    umidadeAltaCritica,
    umidadeAltaAlerta,
    umidadeIdeal,
    umidadeBaixaAlerta,
    umidadeBaixaCritica
    FROM registro  
    JOIN sensor ON fkSensor = idSensor 
    JOIN container ON fkContainer = idContainer 
    JOIN faixaUmidade ON fkFaixaUmidade = idFaixaUmidade
    JOIN faixaTemperatura ON fkFaixaTemperatura = idFaixaTemperatura
    WHERE idContainer = ${idContainer} ORDER BY momento_grafico DESC LIMIT 11;`
    return database.executar(instrucao)
}





module.exports = {

    buscarTemperaturaUmidade
}
