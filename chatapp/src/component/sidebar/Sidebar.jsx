import React, { useEffect, useState } from 'react'
import {  Avatar, Box, Input, Menu} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { DonutLargeSharp, MessageSharp, MoreVert, Search} from '@mui/icons-material'
import './sidebar.css'
import { allUser, chatpage } from '../../redux/reducer';
import { users } from '../../dummyData';

import Chatusers from '../users/Chatusers';
import axios from '../../axios';
import Searchbar from '../Searchbar/Searchbar';
import Dropdown from '../dropdown/Dropdown';


function Sidebar() {
   
  const [allUsers, setAllUsers] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const [notFound, setNotFound] = useState('')
  const [toggleMenu, setToggelMenu]=useState(false)
  const cUser = useSelector(state => state.chat.currentUser)
  const {isChatpage,userInfo,userChat,users} = useSelector(state => state.chat)
  const dispatch=useDispatch()
  console.log("user chat ",userChat)


useEffect(() => {
  
  axios.get('/user/')
    .then(response => {
       console.log("response.data ",response.data)
      setAllUsers(response.data)
      dispatch(allUser(response.data))
    }
    ) 
}, [cUser])  

  const showSearch = () => {
    
    isShow?setIsShow(false):setIsShow(true)
  }

  const onSearch = (e) => {
    
     if (e.target.value.length > 1 ) {
      const regex=new RegExp(e.target.value)
      const arr = allUsers?.filter(f => f._id !==cUser._id && regex.test(f.name) )
      if (arr === '') {
        setNotFound("Not found")
      }
      else {
 
        setSearchResult(arr)
      }
    }
    if(e.target.value === ''){
      setSearchResult([])
    }
      
  }
 
  const toggleButton = () => {
   
      toggleMenu?setToggelMenu(false):setToggelMenu(true)
 } 
  return (
    
    <Box flex={3} sx={{display:{xs:isChatpage ? 'none':'block',sm:'block'}}}  className='sidebar'>
      <Box>
        
        <Box className='sidebar__header' >
          <div className='sidebar__headerLogo'>
            <Box sx={{ display: { xs:isShow?'none':'block', sm: 'none' },color:'white' }}><h4>Whatsapp</h4></Box>
            <Avatar sx={{ display: { xs: 'none', sm: 'block' }}} />
          </div>
          <Box className='sidebar__headerIcon' sx={{ display:{xs:isShow?'none':'block',sm:'block'}}} >
            {/* 03169890861 */}
            <div className='sidebar__headerIcons'  >
            <Search sx={{ display: { xs: 'block', sm: 'none' },color:'white' }} onClick={showSearch} />
            <DonutLargeSharp sx={{ display: { xs: 'none', sm: 'block' },color:'white'}} />
            <MessageSharp sx={{ display: { xs: 'none', sm: 'block' },color:'white' }}/>
              <MoreVert onClick={toggleButton} sx={{color:'white'}} />
              {toggleMenu && <Dropdown toggle={toggleMenu} />}
            </div>
          </Box> 
          <Searchbar isshow={isShow} showsearch={showSearch} />
        </Box>
            
        <Box className='sidebar__center'  sx={{display: { xs: 'block', sm: 'none' } }}>
          <Box className='sidebar__centerItem'>
          <h4>CHATS</h4>
          <h4>STATUS</h4>
          <h4>CALLS</h4>
          </Box>
        </Box>
        <Box className='sidebar__search'  sx={{display: { xs: 'none', sm: 'block' } }} >
          <Box className='sidebar__searchItem'>
               <Search />
               <input type={'search'} onChange={onSearch} />
            </Box>
          
        </Box>
        {
          searchResult.length !== 0 ?
           searchResult?.map(u => {
            return (
              <Chatusers key={u._id} chatUsers={u} />
            )
          }):
            allUsers?.map(u => {
            return (
              <Chatusers key={u._id} chatUsers={ u } />
            )
          })
        }
        
     </Box>
    </Box>
  )
}

export default Sidebar