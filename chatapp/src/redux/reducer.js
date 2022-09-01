import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     
     isChatpage: false,
     userInfo: '',
     currentUser: '',
     chatId: '',
     notifi: [],
     users:[]
}
export const reducerSlice = createSlice({
     name:'chatReducer',
     initialState,
     reducers: {
          
          chatpage: (state, action) => {
                 
               state.isChatpage=action.payload
          },
          userChat: (state, action) => {
               state.userInfo=action.payload
          },
          allUser: (state, action) => {
               state.users=action.payload
          },
          currentUserAction: (state, action) => {
               console.log("action.payload==>> ",action.payload)
               state.currentUser=action.payload
          },
          setChatId: (state, action) => {
               state.chatId=action.payload
          },
          setNotifi: (state, action) => {
               state.notifi=action.payload
          }
     }

})

export const { chatpage,userChat,currentUserAction,setChatId,setNotifi,allUser} = reducerSlice.actions
export default reducerSlice.reducer