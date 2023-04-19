import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {rootReducer} from './characterList';
// import { routerMiddleware } from 'connected-react-router';


export const store = configureStore({
	reducer: rootReducer, middleware: [thunk]  //routerMiddleware(history)
});


export type AppDispatch = typeof store.dispatch;
