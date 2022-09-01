import './App.css';
import Sidebar from './component/sidebar/Sidebar'
import Chatpage from './component/chat/Chatpage'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import io from 'socket.io-client'
import { currentUserAction } from './redux/reducer';


let socket
function App() {
  
  const cUser = useSelector(state => state.chat.currentUser)
  const cu = JSON.parse(localStorage.getItem('user'))
               
  const dispatch=useDispatch()
  console.log("cuser==>> ",cUser)
  const navigate = useNavigate()
  useEffect(() => {
    
      dispatch(currentUserAction(cu))
      cu ? navigate('/') : navigate('/login') 
    
  }, [])    
  
// useEffect(() => {
//    socket = io(endPoint)
//   socket.on('connection', (user) => {
//     console.log("current user connected ",user)
//   })
// }, [endPoint])
  

  return (
    <div className="App">
      
      <Sidebar />
      <Chatpage/>
     
    </div>
  );
}

export default App;
