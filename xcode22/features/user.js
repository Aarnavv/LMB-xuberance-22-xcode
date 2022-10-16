import { createSlice } from '@reduxjs/toolkit'
import { AsyncStorage } from 'react-native'

const initialState = {
	loading: false,
	user: null,
	token: '',
	error: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		initiateRequest: (state) => {
			state.loading = true
		},
		setInitialState: (state, action) => {
			state.user = action.payload.user
			state.token = action.payload.token
			state.loading = false
		},
		loginSuccess: (state, action) => {
			state.user = action.payload.user
			state.loading = false
			state.token = action.payload.token
			if (!state.error) {
				state.error = null
			}
		},
		loginFail: (state, action) => {
			state.loading = false
			state.error = action.payload.error
		},
		logout: (state, action) => {
			state.loading = false
			state.user = null
			state.token = ''
		},
	},
})

export const {
	loginSuccess,
	loginFail,
	logout,
	initiateRequest,
	setInitialState,
} = userSlice.actions

export default userSlice.reducer
