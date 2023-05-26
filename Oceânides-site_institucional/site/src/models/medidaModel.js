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
    WHERE idContainer = ${idContainer} ;`
    return database.executar(instrucao)
}



function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarTemperaturaUmidade
}
