import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import Chatpage from './component/chat/Chatpage';
import { Provider } from 'react-redux'
import store from './redux/store'
import Signup from './component/signup/signup';
import Login from './component/login/login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<Provider store={store}> 
    
<BrowserRouter>
      <Routes>

        <Route  path='/' element={<App />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login/>} />  
        <Route path='/chatpage' element={<Chatpage />} />
        
         
            
  </Routes>
    </BrowserRouter>

</Provider>
  
);


