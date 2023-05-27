var medidaModel = require("../models/medidaModel");



function buscarTemperaturaUmidade(req, res) {
    var idContainer = req.params.idContainer
    medidaModel.buscarTemperaturaUmidade(idContainer).then(function(resposta) {
        res.status(200).json(resposta)
    })
}


module.exports = {

    buscarTemperaturaUmidade
}