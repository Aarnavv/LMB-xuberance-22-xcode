import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'

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
