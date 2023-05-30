var database = require('../database/config')

function listar() {
    var instrucao = `SELECT * FROM usuario;`
    return database.executar(instrucao)
}

function cadastrarFuncionario(nomeUsuario,emailUsuario,senhaUsuario,fkEmpresaUsuario,fk_ADM) {
    var instrucao = `
    INSERT INTO usuario VALUES
    (null, '${nomeUsuario}', '${emailUsuario}','${senhaUsuario}', ${fkEmpresaUsuario}, ${fk_ADM});
    `
    return database.executar(instrucao)
}

module.exports = {
    listar,
    cadastrar,
}