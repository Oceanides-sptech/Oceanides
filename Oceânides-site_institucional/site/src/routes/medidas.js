var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");


router.get("/temperatura-umidade/:idContainer", function(req,res) {
    medidaController.buscarTemperaturaUmidade(req,res)
})

router.get("/obterMediaTemperaturaUmidade/:idEmpresa", function(req,res) {
    medidaController.buscarMediaTemperaturaUmidade(req,res)
})

module.exports = router;