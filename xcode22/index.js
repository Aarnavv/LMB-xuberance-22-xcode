import HomeLanding from './src/components/HomeLanding.js'
import LoginSignup from './src/components/LoginSignup.js'
import SignUp from './src/components/SignUp.js'
import Login from './src/components/Login.js'
import GovernmentAlert from './src/components/GovernmentAlert.js'
import PoliceAlert from './src/components/PoliceAlert.js'
import ViewGovernmentAlerts from './src/components/ViewGovernmentAlerts'
import ViewFireAlerts from './src/components/ViewFireAlerts.js'
import ViewHealthAlerts from './src/components/ViewHealthAlerts.js'
import ViewPoliceAlerts from './src/components/ViewPoliceAlerts.js'
import AmbulanceAlert from './src/components/AmbulanceAlert.js'
import { Button } from 'react-native'
import FireAlert from './src/components/FireAlert.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default function Stack() {
	const Stack = createNativeStackNavigator()
	const navigation = useNavigation()
	const user = useSelector((state) => state.user.user)
	const handleLogout = () => {
		navigation.navigate('Login')
	}
	return (
		<Stack.Navigator>
			{!user ? <Stack.Screen name="Welcome" component={LoginSignup} /> : null}
			<Stack.Screen
				name="Home"
				component={HomeLanding}
				options={{
					headerRight: () => (
						<Button onPress={() => handleLogout()} title="Logout" color="red" />
					),
				}}
			/>
			<Stack.Screen name="Register" component={SignUp} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Police Alert" component={PoliceAlert} />
			<Stack.Screen name="Government Alert" component={GovernmentAlert} />
			<Stack.Screen
				name="View Government Alert"
				component={ViewGovernmentAlerts}
			/>
			<Stack.Screen name="Ambulance Alert" component={AmbulanceAlert} />
			<Stack.Screen name="Fire Alert" component={FireAlert} />
			<Stack.Screen name="View Police Alerts" component={ViewPoliceAlerts} />
			<Stack.Screen name="View Fire Alerts" component={ViewFireAlerts} />
			<Stack.Screen name="View Health Alerts" component={ViewHealthAlerts} />
		</Stack.Navigator>
	)
}
