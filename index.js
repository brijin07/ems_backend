// import dotenv file

require('dotenv').config()

// create server  -use express 

const express=require('express')

// import cors

const cors=require('cors')

// import mongo db connction file

require('./db-connection/connection')


// create server express

const emsserver=express()

// import router
const router=require('./routes/router')

// use cors in server

emsserver.use(cors())

// parse json data using  server app

emsserver.use(express.json())

// user router in server
emsserver.use(router)

// it is used to images in server show in front end
emsserver.use('/uploads',express.static('./uploads'))



// customize port for server -when 4000 server is not available

const PORT=4000||process.env.PORT

// to run server using listen method 

emsserver.listen(PORT,()=>{
    console.log(`ems server started at port:${PORT}`);
})


// to resolve request

// emsserver.post('/',(req,res)=>{
//     res.send(`<h1>ems server started</h1>`)
// })