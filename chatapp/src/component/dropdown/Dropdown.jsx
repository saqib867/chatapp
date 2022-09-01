import { Box } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { currentUserAction } from '../../redux/reducer'
import './dropdown.css'

function Dropdown({ toggle }) {
     
     const dispatch=useDispatch()
const logout = () => {
      console.log('logout')
     localStorage.removeItem('user')
     dispatch(currentUserAction(''))
     window.location.reload()
}     
  return (
       <Box className="dropdown" sx={{display:toggle?'block':"none"}}>
            <Box className='dropdown__container'>
                 <p>Edit profile</p>
                 <p onClick={logout} >Logout</p>
                 <p>change photo</p>
            </Box>
            
       </Box>
       
  )
}

export default Dropdown