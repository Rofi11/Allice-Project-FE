import { combineReducers } from 'redux'
import userReducer from './user'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// import postReducer from "./post"

const rootReducer = combineReducers({
    userReducer,
    // postReducer
})

//membuat store sekarang disini
const store = configureStore({
    reducer : rootReducer,
    middleware: [thunk]
})

export default store