var containerModel = require('../models/containerModel')

function listarEmpresa(req,res) {
    var idEmpresa = req.params.idEmpresa
    containerModel.listarEmpresa(idEmpresa).then(function(resposta) {
        if(resposta.length > 0){
           res.status(200).json(resposta)
        }else{
            res.status(500).send("Sem containers")
        }
    })
}
function listarContainer(req,res) {
    var idContainer = req.params.idContainer
    containerModel.listarContainer(idContainer).then(function(resposta) {
        if(resposta.length > 0){
            res.status(200).json(resposta)
        }else{
            res.status(500).send("Container não encontrado")
        }
    })
}
module.exports = {
    listarEmpresa,
    listarContainer
}