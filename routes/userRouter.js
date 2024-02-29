const express = require('express')
const router = express()
const userController = require('../controller/userController')
const middleware = require('../middleware/user')
router.set('views','./views/user')


router.get('/',middleware.notLoged,userController.home)
router.get('/login',middleware.isLoged,userController.login)
router.get('/register',middleware.isLoged,userController.register)
router.post('/registerSubmit',userController.registerSubmit)
router.post('/loginSubmit',userController.loginSubmit)
router.get('/logout',userController.logout)


module.exports = router
