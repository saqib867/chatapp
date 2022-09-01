import { ArrowBack } from '@mui/icons-material'
import { Box, Input } from '@mui/material'
import './searchbar.css'
import React, { useState } from 'react'
import axios from '../../axios'
import {useSelector,useDispatch} from 'react-redux'
import { chatpage, userChat } from '../../redux/reducer'

function Searchbar({ isshow, showsearch }) {
   
  const [searchItem, setSearchItem] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [notFound,setNotFound]=useState('')
  const { users,currentUser } = useSelector(state => state.chat)
  const dispatch = useDispatch() 
  
  const onSearch = (e) => {
       
    setSearchItem(e.target.value)
    const search=e.target.value
    //console.log("e.length ",e.target.value.length)
    
    if (e.target.value.length > 1 ) {
      const regex=new RegExp(e.target.value)
      const arr = users.filter(f => f._id !==currentUser._id && regex.test(f.name) )
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
  
  const showChat = (id) => {

    dispatch(chatpage(true))
    dispatch(userChat(id))
    setSearchResult([])
    setSearchItem('')

  }

  const back = () => {
    showsearch()
    setNotFound('')
    setSearchItem('')

}
  return (
    <Box className='searchbar' sx={{ display: { xs: isshow ? 'block' : 'none', sm: 'none' }, width: '100%' }}>
      <Box className='searchbar__container' sx={{ display: { xs: 'block', sm: 'none' } }}>
        <ArrowBack onClick={back} />
        <Input placeholder='Search...' sx={{width:'90%' }} onChange={onSearch} value={searchItem} />  
      </Box>  
      { searchResult.length !==0 && 
        <Box className='searchbar__center'>
          { searchResult.map(result => {
            return (
              <div key={result?._id} onClick={()=>showChat(result)}>{result?.name}</div>
            )
          })}
        </Box>
      }
    </Box>
    
  )
}

export default Searchbar