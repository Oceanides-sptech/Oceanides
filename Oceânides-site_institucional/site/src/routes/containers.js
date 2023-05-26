var containerController = require('../controllers/containerController')
var Express = require('express')
var router = Express.Router()

router.get("/containersEmpresa/:idEmpresa", function(req,res) {
    containerController.listarEmpresa(req,res)
})
router.get("/dadosContainer/:idContainer",function(req,res) {
    containerController.listarContainer(req,res)
})
module.exports = router