import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
	loading: true,
	user: null,
	token: null,
	error: null,
}

const reducer = {
	user: userReducer,
}

export const store = configureStore({
	reducer: reducer,
	preloadedState: {
		user: initialState,
	},
})

export default store
