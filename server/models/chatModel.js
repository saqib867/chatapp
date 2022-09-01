import mongoose from 'mongoose'

const chatModel = mongoose.Schema({
     
     chatName: {
          type: String,
          default:''
     },
     isGroupChat: {
          type: Boolean,
          default:false
     },
     
     members: {
          type:Array
     },
     latestMessage: {
          type: String,
          default:''
     },
     groupAdmin: {
          type: String,
          default:''
     }
}, {
     timestamps:true
})
export default mongoose.model('chatModel',chatModel)
