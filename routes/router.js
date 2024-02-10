// import express 
const express=require('express')

// import user controller 

const userController=require('../controller/userController')

// using express create an object for router class

const multerConfiq=require('../middleware/multermiddleware')

const router=new express.Router()

router.post('/add',multerConfiq.single("profile"),userController.addUser)

router.get('/get/allusers',userController.getallUsers)

router.delete('/delete/user/:id',userController.deleteUser)

router.put('/edit/user/:id',multerConfiq.single("profile"),userController.editUser)


module.exports=router