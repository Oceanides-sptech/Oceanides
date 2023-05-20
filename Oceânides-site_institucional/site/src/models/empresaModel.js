var database = require('../database/config')

function listar() {
    var instrucao = `SELECT * FROM empresa;`
    return database.executar(instrucao)
}
function cadastrar(email, cnpj, nome) {
    var instrucao = `
        INSERT INTO empresa VALUES
        (null, '${nome}', '${cnpj}', '${email}');`   
        return database.executar(instrucao)
}

function verificarCNPJ(cnpj) {
    var instrucao = `SELECT idEmpresa FROM empresa WHERE CNPJEmpresa = '${cnpj}';`
    return database.executar(instrucao)
}

module.exports = {
    listar,
    cadastrar,
    verificarCNPJ
}