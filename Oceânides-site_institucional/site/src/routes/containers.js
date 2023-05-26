var containerController = require('../controllers/containerController')
var Express = require('express')
var router = Express.Router()

router.get("/containersEmpresa/:idEmpresa", function(req,res) {
    containerController.listarEmpresa(req,res)
})

module.exports = router