import { Avatar, Backdrop, Box } from '@mui/material'
import {AddIcCall, ArrowBack, Videocam} from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import './chatpage.css'
import {useDispatch, useSelector} from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { chatpage, userChat } from '../../redux/reducer'
import UserChats from '../UserChats/UserChats'
import { io } from 'socket.io-client'


const endPoint = 'https://letschatt--application.herokuapp.com'
let socket


function Chatpage() {
  const { isChatpage, userInfo, currentUser } = useSelector(state => state.chat)
  const [isOnline, setIsOnline] = useState(false)
   const[onlineUser, setOnlineUser]=useState([])
  const [tmem, setTmem] = useState('')
  const [typingLetter,setTypingLetter]=useState('')
  
  const dispatch=useDispatch()
  const navigate = useNavigate()

const isTypingFunc=(typingMem,typer)=>{

  setTmem(typingMem)
  setTypingLetter(typer)
}
    
 useEffect(() => {
    socket = io(endPoint)
    socket.on('users', (onlineUsers) => {
    setOnlineUser(onlineUsers)
    })
     
  },[])   
 

  const back = () => {
    dispatch(chatpage(false))
    dispatch(userChat(''))
  }
 
  return (
    <Box flex={8} sx={{ display: { xs: isChatpage ? 'block' : 'none', sm: 'block' } }} className='chat'>
      {!userInfo ? <div className='chatStart'>Start chat with one of your friend</div> :
        <>
        <Box className='chatbar'>
        
            <Box className='chatbar__user'>
              <ArrowBack sx={{ display: { sm: 'none' } }} onClick={back} />
              <Box className='chatbar__userInfo' >
                <Avatar />
                <div>
                  <div className='chatbar__userInfoName'>{userInfo?.name}</div>
                  <div className='chatbar__userInfoOnline'>{onlineUser?.map(u => {
                    return (
                      <div key={u?.curUser._id}>
                        {u?.curUser._id === userInfo?._id &&
                          (typingLetter === '' ? <div style={{fontSize:'15px',color:'white'}} >online</div> :
                          <div style={{fontSize:'12px',color:'white'}}> {typingLetter.length>25? `${typingLetter.slice(0,25)}...`:typingLetter}</div>)}
                        
                      </div>
                    )
                  })}</div>
                </div>
              
              </Box>
            </Box>
      
     
            <Box className='chatbar__icons'>
              <AddIcCall sx={{ color: 'white' }} />
              <Videocam sx={{ color: 'white' }}/>
            </Box>
        
          </Box>
          
          </>
        
      }
      <Box className='chatBody'>{userInfo &&
        <UserChats userInfo={userInfo} currentUser={currentUser} isTypingFunc={isTypingFunc} />}</Box>
    </Box>
  )
}

export default Chatpage