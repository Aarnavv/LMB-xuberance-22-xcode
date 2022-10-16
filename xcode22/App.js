import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import store from './store'
import Stack from './index'
import { Provider } from 'react-redux'

function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack />
			</NavigationContainer>
		</Provider>
	)
}

export default App
