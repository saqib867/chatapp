import { Mic, Search } from '@mui/icons-material'
import './userchat.css'
import { Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../axios'
import UserMessages from '../userMessages/UserMessages'
import {useRef} from 'react'
import {setChatId} from '../../redux/reducer'
import { io } from 'socket.io-client'
import typingData from '../../typing.json'



const endPoint = 'https://letschatt--application.herokuapp.com'
let socket
function UserChats({userInfo,currentUser,isTypingFunc}) {

 //const { userInfo,currentUser } = useSelector(state => state.chat)
  const [chatId,setChatId]=useState('')
  const [text, setText] = useState('')
  const [messageContent, setMessageContent] = useState([])
  const [socektConnected, setSocketConnected] = useState()
  const [arrivalMsg,setArrivalMsg]=useState(false)
  const [typing, setTyping] = useState(false)
  const [typingMem,setTypingMem]=useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [notification, setNotification] = useState([])
  const [onlineUser, setOnlineUser] = useState([])
  const [typer,setTyper]=useState([])
  
   
  let selectedChat
  console.log('user info ',userInfo)
  const dispatch = useDispatch()
  const scrollRef = useRef()
  
  useEffect(() => {

    const reqBody = {
      userId: userInfo?._id,
      cUser:currentUser?._id
    }
    
    userInfo &&
      axios.post('/chat/', reqBody)
      .then(response => {
        setChatId(response.data)
       axios.get(`/chat/getMessages/${response.data?._id}`)
           .then(res => {
             setMessageContent(res.data)
             
      })
      })
    selectedChat=chatId
    
  }, [userInfo, chatId._id]) 

  useEffect(() => {
  socket = io(endPoint)
  socket.emit('setup',currentUser)
    socket.on('connected', (l) => { setSocketConnected(true) })
    socket.on('typing', ({ cu,words }) => {
       
      
      setIsTyping(true)
     // setTypingMem(cu)
     // setTyper(words)
      isTypingFunc(cu,words)
    })
    socket.on('stop typing', ({cu,words}) => {
      setIsTyping(false)
      // setTypingMem('')
      // setTyper('')
      isTypingFunc('','')
    })
    
}, [currentUser,messageContent]) 
   

 useEffect(() => {
   
    socket.on("msg recived", ({ m }) => {
     
      const memberId = chatId.members?.find(member => member !== currentUser._id)
      console.log("chatid ",chatId)
        if (chatId._id !== m.chatId) {
             setNotification(n=>[...n,m])
           }        
      
      
        setMessageContent([...messageContent, m])
    })
    
  },[messageContent])
  
  useEffect(() => {
      scrollRef?.current?.scrollIntoView({behavior:'smooth'})
  }, [messageContent])

 
  const setMessage = (e) => {
    
    const memberId = chatId.members?.find(member => member !== currentUser._id)
    setText(e.target.value)
    if (!socektConnected) return
    if (e.target.value) {
      //setTyping(true)
      socket.emit('typing', { ui:userInfo,cu:currentUser,words:e.target.value })
    } 

    else if (!e.target.value) {
      socket.emit('stop typing', {ui:userInfo,cu: currentUser,words:e.target.value })
      //setTyping(false)
      
    }
    
      
    
 }

  const messageHandler = (e) => {
  
    if (e.key === 'Enter') {
      console.log("notification ",notification)
      const memberId = chatId.members?.find(member => member !== currentUser._id)
      setText('')
      socket.emit('stop typing',memberId)
      axios.post('/chat/newMessage', { messageContent: text, sender: currentUser?._id, chatId:chatId._id })
        .then(response => {
          const memberId = chatId.members?.find(member => member !== currentUser._id)
          socket.emit('new message',({messageRecived:response.data,currentChat:memberId,cUser:currentUser}))
          setMessageContent(v => [...v, response.data])
          setArrivalMsg(true)
          socket.emit('stop typing', {ui:userInfo,cu: currentUser,words:e.target.value })
          setText('')
          
        })
      
    }
   
  }
    
  return (
    <Box className='userchat' >
       
      <Box className='userchat__message'>
        { messageContent.map(msg=>{
          return (
            <div key={msg._id} ref={scrollRef} >
              <UserMessages  msg={msg} /> 
            </div>
            
          )
        })
          
        }
       
      </Box>
      
      <Box className='userchat__container' sx={{width:{xs:'95%',sm:'69%'}}}  onKeyPress={messageHandler} >
        <Mic color='disabled'/>
        <input style={{width:'100%'}} 
        type='text' className='userchat__input'
        placeholder='send a message'
         value={text} onChange={setMessage} />
      </Box>
    </Box>
  )
}

export default UserChats