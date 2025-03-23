import {createSlice} from '@reduxjs/toolkit'
import { request } from '../../utils'
import { setToken as _setToken,getToken, removeToken } from '../../utils/token'

import { loginAPI,getProfileAPI } from '../../apis/user'
const userStore=createSlice({
  name:'user',
  initialState:{
    token:getToken() || '',
    userinfo:{}
  },
  reducers:{
    setToken(state,action){
      state.token=action.payload
      _setToken(action.payload)
    },
    setUserInfo(state,action){
      state.userinfo=action.payload
    },
    clearUserInfo(state){
      state.token=''
      state.userinfo={}
      removeToken()
    }
  }
})

const {setToken,setUserInfo,clearUserInfo}=userStore.actions

const fecthLoginForm=(loginForm)=>{
  return async (dispatch)=>{
    const res=await loginAPI(loginForm)
    // console.log(res)
    dispatch(setToken(res.data.token))
  }
}

const fetchUserInfo=()=>{
  return async(dispatch)=>{
    // const res=await request.get('/user/profile')
    const res=await getProfileAPI()
    // console.log(res)
    dispatch(setUserInfo(res.data))
  }
}

const userReducer=userStore.reducer

export {setToken,setUserInfo,clearUserInfo,fecthLoginForm,fetchUserInfo}

export default userReducer
