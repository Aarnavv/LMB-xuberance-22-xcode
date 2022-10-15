import { createStackNavigator } from '@react-navigation/stack'
// import Home from '../screens/Home'
import ReviewDetails from '../screens/ReviewDetails'
import React from 'react'
const Stack = createStackNavigator()
const MyStack = () => {
	return (
		<Stack.Navigator>
			{
				// <Stack.Screen name="Home" component={Home} />
				// <Stack.Screen name="Task" component={Task} />
			}
		</Stack.Navigator>
	)
}
export default MyStack
