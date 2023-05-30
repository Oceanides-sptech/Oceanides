var containerController = require('../controllers/containerController')
var Express = require('express')
var router = Express.Router()

router.get("/containersEmpresa/:idEmpresa", function(req,res) {
    containerController.listarEmpresa(req,res)
})
router.get("/dadosContainer/:idContainer",function(req,res) {
    containerController.listarContainer(req,res)
})

router.get("/contagemContainer/:idEmpresa",function(req,res) {
    containerController.contarContainer(req,res)
})

router.post("/cadastrarContainer", function(req,res){
    containerController.cadastrarContainer(req,res)
})
module.exports = router