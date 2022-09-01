import React, { useState } from 'react'
import {Box, Button,  TextField} from '@mui/material'
import './signup.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from '../../axios'
import {useDispatch} from 'react-redux'
import { currentUserAction } from '../../redux/reducer'


function Signup() {

     const [name, setName] = useState('')
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [err, setErr] = useState('')
     const [currentUser, setCurrentUser] = useState('')
     const navigate=useNavigate()
     const dispatch=useDispatch()
     const register = async () => {
          try{
               const registerUser = await axios.post('/auth/register', { name, email, password })
               
               if (registerUser.data === 0) {
               setErr("User is already registered with this email")
               }
               else {
                    
                    
                    localStorage.setItem('user', JSON.stringify(registerUser.data))
                    
                    navigate('/')
               }
          }
          catch (err) {
               console.log('error occured while registering user')
          }
     }  
  
  return (
       <Box className='signup'>
            <h2>Signup</h2>
            <Box className='signup__container'>
                 <TextField label='name' variant='outlined'
                      onChange={(e)=>setName(e.target.value)}
                      className='signup__input' />
                 <TextField label='email' variant='outlined'
                      onChange={(e)=>setEmail(e.target.value)}
                      className='signup__input' />
                 <TextField label='password' variant='outlined'
                     onChange={(e)=>setPassword(e.target.value)}
                      className='signup__input' />
                 <Box className='signup__btns' >
                      <Link to={'/login'} >Login</Link>
                      <Button variant='outlined' onClick={register}>Signup</Button>
                 </Box>
                 <div>{ err }</div>
            </Box>        
    </Box>
  )
}

export default Signup