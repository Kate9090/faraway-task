import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {rootReducer} from './characterList';
// import { routerMiddleware } from 'connected-react-router';


export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});


export type AppDispatch = typeof store.dispatch;
