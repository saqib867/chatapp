import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './reducer'

export default configureStore({

     reducer: {
          chat:chatReducer
     }
})