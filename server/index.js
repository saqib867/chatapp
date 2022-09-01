//importing
import express, { response } from 'express'
import cors from 'cors'
import chatModel from './models/chatModel.js'
import User from './models/users.js'
import bodyparser from 'body-parser'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import chatRoute from './routes/chatRoute.js'
import path from 'path'
import {config} from 'dotenv'
import { Server} from 'socket.io'
// app configuration
const app = express()
 const dotenv=config()
const port =process.env.PORT || 5000
// middleware
app.use(cors())
app.use(express.json())
console.log("application")
const connectionUrl=`mongodb://saqib:${process.env.MONGO_PASSWORD}@ac-kt7ijcm-shard-00-00.bsspcw2.mongodb.net:27017,ac-kt7ijcm-shard-00-01.bsspcw2.mongodb.net:27017,ac-kt7ijcm-shard-00-02.bsspcw2.mongodb.net:27017/whatsapp?ssl=true&replicaSet=atlas-ikprlu-shard-0&authSource=admin&retryWrites=true&w=majority`
//const connectionUrl="mongodb://localhost:27017/whatsapp"
mongoose.connect(connectionUrl,
     {
          useNewUrlParser: true, useUnifiedTopology: true
     })
     .then(() => {
     console.log("Db connected sccessfully") 
}) 
     .catch(err => {
     console.log("error occured",err)
})
// Routes 
//mongodb password: 77hs2FqpxFXuUmc6
app.use('/api/auth',authRoute)
app.use('/api/user', userRoute)
app.use('/api/chat',chatRoute)
// listings
             console.log('done')
     //"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix chatapp && npm run build --prefix chatapp"
     // const __dirname1 = path.resolve()
     // app.use(express.static("chatapp/build"))
     //  app.get("*", (req, res) => {
     //       res.sendFile(path.resolve(__dirname1, "chatapp", "build", "index.html"))
     //  })

   
const server= app.listen(port, () => { 
     
     console.log("app is listing of port 5000")
})

let io = new Server(server, {
    
     cors: {
          origin:'http://localhost:3000',     //https://letschat--applicaiton.heroku.com
     },
    
}) 

 let users = []
 console.log("users ",users)
io.on("connection", (socket) => { 
 
     console.log("connection")
     socket.on("setup", (userData) => {
          socket.join(userData._id)
          socket.emit('connected') 
         
         !users.some((u)=>u?.curUser._id ===userData._id) && users.push({curUser:userData,sId:socket.id})  
         io.emit('users',users)
    }) 
     
     socket.on('new message', ({ messageRecived ,currentChat,cUser}) => {
     
          socket.in(currentChat).emit("msg recived", { m:messageRecived })    
     }) 
      
     socket.on('typing', ({ ui, cu,words }) => {
          socket.in(ui._id).emit("typing", ({ cu, words }))
     })
      socket.on('stop typing', ({ ui, cu, words}) => {
           socket.in(ui?._id).emit("stop typing", ({ cu, words }) )
     })
     
     socket.on('disconnect', () => {
         
          users= users.filter(fil => fil.sId !== socket.id)
          io.emit('users', users)
          
     }) 
})
     