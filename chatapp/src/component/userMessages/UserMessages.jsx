import { Box,Avatar} from '@mui/material'
import React, { useEffect } from 'react'
import axios from '../../axios'
import {useSelector} from 'react-redux'
import './userMessages.css'
import { timeago } from '../../timeformating'

function UserMessages({msg}) {
     
const cUser=useSelector(state=>state?.chat.currentUser)


     
  return (
       <div className='userMessages'>
            <Box className="userMessages__container">
                 <Box className={`userMessage__other ${cUser._id===msg.sender && "userMessage__own"}`}>
                      {/* <Avatar sx={{height:'30px', width:'30px'}} /> */}
                      <Box className='userMessages__msg'>
                      {msg.messageContent}
                      </Box>
                      <Box className='timeago' sx={{ fontSize: '10px',color:'rgb(50,50,50)' }}>{ timeago(msg?.createdAt)}</Box>
                 </Box>
            </Box>
       </div>
       
  )
}

export default UserMessages