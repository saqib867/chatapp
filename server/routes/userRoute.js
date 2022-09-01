import express from 'express'
import User from '../models/users.js'

const router = express.Router()


router.get('/', async(req, res) => {
     
     const findAll = await User.find()
     
     res.send(findAll)
})

router.get('/search/:cId', async (req, res) => {
     
        console.log("req.body",req.params.cId)
     const keyword = req.query.search ?
          {
               $or: [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { email:{ $regex: req.query.search, $options: 'i' } }
               ]
          }
          :{}
     try { 
          const searchUser = await User.find(keyword).find({_id:{$ne:req.params.cId}})
          res.send(searchUser)
     }
     catch (err) {
          console.log(err)
     }
})



export default router