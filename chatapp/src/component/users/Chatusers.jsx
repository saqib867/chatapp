import { Avatar } from '@mui/material'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { chatpage, userChat } from '../../redux/reducer';
import {Link} from 'react-router-dom'
import './chatusers.css'
function Chatusers({ chatUsers}) {
     
     const isChat = useSelector(state => state.chat.isChatpage)
     const cUser = useSelector(state => state.chat.currentUser)
     
const dispatch = useDispatch()
const showChat = (chatUser) => {
     
     dispatch(chatpage(true))
     dispatch(userChat(chatUser))
}
let a=2,b=11,c=5
     if ((4 + 5) < (6 + b)) {
     b=c&a
     }
     console.log(a+b+c)
     return (
          <>{ cUser._id !==chatUsers._id &&
               <div className='chatusers' onClick={() => showChat(chatUsers)} >
                    <div className='chatusers__avatar'>
                         <Avatar />
                    </div>
                    <div className='chatusers__desc'>
                         <div>{chatUsers?.name}</div>
                      
                    </div>
               </div>
          }
          </>
  )
}

export default Chatusers