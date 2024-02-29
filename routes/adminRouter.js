const express = require('express')
const adminRouter = express()
const adminController = require('../controller/adminController')
const adminMiddleware = require('../middleware/admin')
adminRouter.set('views','./views/admin')



adminRouter.get('/',adminMiddleware.notLoged,adminController.home)
adminRouter.get('/login',adminMiddleware.isLoged,adminController.login)
adminRouter.post('/loginSubmit',adminController.loginSubmit)
adminRouter.get('/deleteuser/:id',adminController.deleteuser)
adminRouter.get('/updateuser/:id',adminController.updateUser)
adminRouter.post('/userEdit/:id',adminController.editUser)
adminRouter.get('/createUser',adminController.createUser)
adminRouter.post('/createUserSubmit',adminController.createUserSubmit)
adminRouter.get('/logout',adminController.logout)
module.exports = adminRouter