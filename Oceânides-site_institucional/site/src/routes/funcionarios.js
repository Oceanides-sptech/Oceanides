var express= require('express')
var router = express.Router()

var funcionarioController = require('../controllers/funcionarioController');
const { listar } = require('../models/funcionarioModel');

router.get("/listar",function(req,res) {
    funcionarioController;listar(req,res)    
})

router.post("/cadastrarFuncionario", function(req,res){
    funcionarioController.cadastrarFuncionario(req,res)
})

module.exports = router