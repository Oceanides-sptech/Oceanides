var database = require('../database/config')

// Esse listar empresa tá alimentando a página de containers da dashboard

// inicialmente ela parte da registro e agr vou explicar um a um dos campos

// primeiro campo pede todos os elementos do container

/* esse segundo da é uma especie de 'if else' de select, 
caso a fk da faixa de temperatura seja uma ou outra ele 
aplica a formula condizente. Ex: fk 1 é a faixa baixa, entao aplica a formula da temperatura baixa
*/

// após o end, que no caso é o fim do case (if e else), ele dá um nome de temperatura, entao nao importa a faixa, sempre se chamará temperatura
// ou seja, pra cada container com uma fk de temperatura diferente, terá uma temperatura simulada diferente
// após isso vem a umidade que já ta sendo simulada direto do arduino
// agora vem os alertas da faixa de cada container
// essa tabela faixa temperatura tem essa utilidade, deixar melhor a forma como a gente vai validar se esta adequado ou nao
// também vem com os valores de acordo com a fk da faixa 
// 1 = baixa
// 2 = intermediaria
// 3 = alta
// por ultimo temos a da umidade, que se mantem fixa

// os joins passa desde de a registro até o container e suas faixas
// agora o where, bem o where pega apenas o id de registro da ultima medição de cada sensor / container
// já que estamos trabalhando simulando um container por sensor, ele agrupa 
// ou seja, digamos que tem 5 registros de um sensor A e 10 de um sensor B
// ele vai pegar o registro de numero 5 do sensor A e apresentar sua temperatura e umidade
// e tbm vai fazer o msm para o sensor B, porem com 10 registro
// Ao final ele apenas apresenta o sensor de uma empresa em específico, ou seja, do usuário que logou


function listarEmpresa(idEmpresa) {
    var instrucao = ` 
    SELECT container.*, 
	CASE 
    WHEN fkFaixaTemperatura = 1 THEN (SELECT TRUNCATE((temperatura * 0.09345 - 1.90654),2)) 
	WHEN fkFaixaTemperatura = 2 THEN (SELECT  TRUNCATE((temperatura * 0.467228972 - 6.53),2))
	WHEN fkFaixaTemperatura = 3 THEN (SELECT TRUNCATE((temperatura * 0.373832 + 2.373832),2)) 
    end as temperatura,
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
    JOIN FaixaUmidade ON fkFaixaUmidade = idFaixaUmidade
    JOIN FaixaTemperatura ON fkFaixaTemperatura = idFaixaTemperatura
    where idRegistro IN (

    SELECT MAX(idRegistro) FROM registro 
    JOIN sensor on fkSensor = idSensor 
    JOIN container ON fkContainer = idContainer
    GROUP BY idContainer) 
    AND fkEmpresaContainer = ${idEmpresa};
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