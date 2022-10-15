import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
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
