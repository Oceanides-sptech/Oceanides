var containerModel = require('../models/containerModel')

function listarEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa
    containerModel.listarEmpresa(idEmpresa).then(function (resposta) {
        if (resposta.length > 0) {
            res.status(200).json(resposta)
        } else {
            res.status(500).send("Sem containers")
        }
    })
}
function listarContainer(req, res) {
    var idContainer = req.params.idContainer
    containerModel.listarContainer(idContainer).then(function (resposta) {
        if (resposta.length > 0) {
            res.status(200).json(resposta)
        } else {
            res.status(500).send("Container não encontrado")
        }
    })
}

function contarContainer(req, res) {
    var idEmpresa = req.params.idEmpresa
    containerModel.contarContainer(idEmpresa).then(function (resposta) {
        if (resposta.length > 0) {
            res.status(200).json(resposta)
        } else {
            res.status(500).send("Container não encontrado")
        }
    })
}

function cadastrarContainer(req, res) {
    var nome = req.body.nomeServer;
    var fkFaixaTemperatura = Number (req.body.fkTemperaturaServer);
    var fkEmpresa = Number (req.body.fkEmpresaServer);
    var codigo = req.body.codigoServer;
    
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (fkFaixaTemperatura == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (codigo == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {



        containerModel.cadastrarContainer(codigo, nome, fkEmpresa, fkFaixaTemperatura).then(function (resposta) {
            if (resposta.ok) {
                res.status(200).json(resposta)
            } else {
                res.status(500).send("Container não cadastrado")
            }
        })
    }
}

module.exports = {
    listarEmpresa,
    listarContainer,
    contarContainer,
    cadastrarContainer
}