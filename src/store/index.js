import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import post from './Post'

const reducer = combineReducers({
  post
})

const store = configureStore({
  reducer,
})

export default store;