import express from 'express'
import User from '../models/users.js'

const router = express.Router()

router.post('/register', async (req, res) => {
     if (!req.body.name && !req.body.email && !req.body.password) {
          res.send('complete the form')
     }

     else {
        
          const userRegistered = await User.findOne({ email: req.body.email })
          if (!userRegistered) {
               
               const user = new User({
               name: req.body.name,
               email: req.body.email,
               password: req.body.password
          })
     
          try {
               
          
               const savedUser = await user.save()
               res.status(200).send(savedUser)
          }
          catch (err) {
               console.log("error occure while registering user", err)
          }
          }
          else {
               res.send("0")
          }
          
     }
})

router.post('/login', async(req, res) => {
          
     const email = req.body.email
     const password = req.body.password
     try {
          const user = await User.findOne({ email })
          if (!user) {
               res.send('0')
          }
          else {
               if (user.password !== password) {
                    res.send('0')
               }
               else {
                    res.send(user)
               }
          }
     }
     catch (err) {
          res.send(err)
     }
})

export default router