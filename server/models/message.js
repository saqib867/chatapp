import mongoose from "mongoose";

const messageScheme = mongoose.Schema({
     
     sender: {
          type: String,
          default:''
     },
     messageContent: {
          type: String,
          default:''
     },
     chatId: {
          type: String,
          default:''
     }
}, {
     timestamps:true
}
)
export default mongoose.model('Messages',messageScheme)