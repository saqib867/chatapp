import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
     
     name: {
          type: String,
          default:''
     },
     email: {
          type: String,
          default: '',
          
     },
     password: {
          type: String,
          default:''
     } 
}, {
     timestamps:true
})
export default mongoose.model('User',userSchema)