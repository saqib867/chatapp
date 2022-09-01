import express, { application } from 'express'
import Chat from '../models/chatModel.js'
import User from '../models/users.js'
import Message from '../models/message.js'
const router = express.Router()


// run this post after user search for contact
router.post('/', async(req, res) => {
    
     const { userId } = req.body
     
     if (req.body.userId==='') {
          console.log('No user was sent to make chat with')
     }
     
     try {
          let isChat = await Chat.findOne({
               
          isGroupChat: false,
          $and: [
               { members: { $elemMatch: { $eq: req.body.cUser } } },
               { members: { $elemMatch: { $eq: req.body.userId } } }
          ]
     })
          if (!isChat) {
               const s = await Chat.create({members:[userId,req.body.cUser]})
               
               res.send(s)
          }   
          else {
               res.send(isChat)
               
         } 
     }
     catch (error) {
            console.log(error)  
        }  
     
})

// return user  which has contact with current user or current has contact with the intended user
router.get('/:userId',async (req, res) => {
     
           try {
                 
                    const conversation = await Chat.find({
                     
                     members:{$in:[req.params.userId]}
                })
                
                res.send(conversation)
                
           } catch (error) {
                console.log(error)
           }
})

router.get('/getMessages/:chatId',async(req, res) => {
        
        // console.log('chat id ',req.params.chatId)
     
          try {
               const getMessages = await Message.find({chatId:req.params.chatId})
               //console.log("get messages=", getMessages)
          
               res.status(200).json(getMessages)
          
          } catch (error) {
                console.log(error)
          }
               
})
router.post('/newMessage', async(req, res) => {
     
     const newMessage = new Message(req.body)
     try {
          const saveMessage = await newMessage.save()
          res.send(saveMessage)
     } catch (error) {
          console.log(error)
     }
})



export default router