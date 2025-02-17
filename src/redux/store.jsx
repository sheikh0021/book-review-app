import {configureStore} from '@reduxjs/toolkit';
import bookReducer from './bookslice'

const store = configureStore({
    reducer: {
       books: bookReducer
    }
})
export default store;