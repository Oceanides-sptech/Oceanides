var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");


router.get("/temperatura-umidade/:idContainer", function(req,res) {
    medidaController.buscarTemperaturaUmidade(req,res)
})


module.exports = router;