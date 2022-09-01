import React, { useState } from 'react'
import {Box, Button, TextField} from '@mui/material'
import './login.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from '../../axios'
import { currentUserAction } from '../../redux/reducer'
import {useDispatch} from 'react-redux'

function Login() {

     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [err, setErr] = useState('')
     const [currentUser, setCurrentUser] = useState('')
     const [isLoading,setIsLoading]=useState(false)
     const navigate = useNavigate()
     const dispatch=useDispatch()

     const login = async () => {
          setIsLoading(true)
          if (!email && !password) {

               setErr("Please fill email/password fields")
          } 
          else {
               const logUser = await axios.post('/auth/login', { email, password })
          if (logUser.data === 0) {
               setErr('Incorrect username/password')
               setIsLoading(false)
          }
          else {
               setIsLoading(false)
               
               localStorage.setItem('user', JSON.stringify(logUser.data))
               
               navigate("/")
          }
          }
          
     }
  return (
       <Box className='login'>
            <h2>Login</h2>
            <Box className='login__container' >
                 <div className='error'>{ err }</div>
                 <TextField label='email' variant='outlined'
                      onChange={e=>setEmail(e.target.value)}
                      className='login__input' />
                 <TextField label='password' variant='outlined'
                      onChange={e=>setPassword(e.target.value)}
                      className='login__input' />
                 <Box className='login__btns' >
                      
                      <Link to={"/signup"} >Signup</Link>
                      <Button variant='outlined' onClick={login}>
                           {isLoading ?'loging in ...' : 'Login'}</Button>
                 </Box>
            </Box>        
    </Box>
  )
}

export default Login