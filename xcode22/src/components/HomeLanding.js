import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ViewAlert from './ViewAlert'
import { useSelector } from 'react-redux'
import Button from './Button.js'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: '5%',
		paddingVertical: '5%',
	},
	viewContainer: {
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	title: {
		fontSize: 15,
	},
	heading: {
		fontSize: 30,
		marginTop: 10,
	},
	HomeButton: {
		margin: 10,
	},
})

export default function HomeLanding({ navigation }) {
	const [alerts, setAlerts] = useState(null)
	const token = useSelector((state) => state.user.token)
	const user = useSelector((state) => state.user)
	const group = useSelector((state) => state.user.user.user.groups[0].name)
	function getAlerts() {
		const url =
			Platform.OS == 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000'
		fetch(`${url}/user_alerts/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.error) {
				} else {
					setAlerts(json)
				}
			})
	}
	getAlerts()

	return (
		<View style={styles.container}>
			<View style={{ width: '100%', alignItems: 'center' }}>
				<Text style={styles.heading}>Auxilio</Text>
				<View
					style={{
						width: '80%',
						borderBottomColor: 'black',
						borderWidth: 1,
					}}
				/>
				<Text>{'\n'}</Text>
			</View>
			{user !== null && group !== null ? (
				<Text style={styles.title}>
					Welcome {`${user.user.username}/${group} User`} {'\n'}{' '}
				</Text>
			) : (
				''
			)}

			{group == 'Citizen' ? (
				<View style={styles.viewContainer}>
					<Button
						title="View Government Alerts"
						page="View Government Alert"
						navigation={navigation}
					/>
					<Button
						title="Make Health Alert"
						page="Ambulance Alert"
						navigation={navigation}
					/>
					<Button
						title="Make Fire Alert"
						page="Fire Alert"
						navigation={navigation}
					/>
					<Button
						title="Make Police Alert"
						page="Police Alert"
						navigation={navigation}
					/>
				</View>
			) : (
				''
			)}
			{group == 'Police' || group == 'Firefighter' || group == 'Ambulance'
				? group == 'Firefighter' && alerts
					? alerts.map((el) => {
							if (el.category == 'FireAlert') {
								return (
									<ViewAlert
										title={el.title}
										description={el.description}
										time={el.created}
										location={el.location}
										key={el.id}
									/>
								)
							}
					  })
					: group == 'Police' && alerts
					? alerts.map((el) => {
							if (el.category == 'PoliceAlert') {
								return (
									<ViewAlert
										title={el.title}
										description={el.description}
										time={el.created}
										location={el.location}
										key={el.id}
									/>
								)
							}
					  })
					: group == 'Ambulance' && alerts
					? alerts.map((el) => {
							if (el.category == 'AmbulanceAlert') {
								return (
									<ViewAlert
										title={el.title}
										description={el.description}
										time={el.created}
										location={el.location}
										key={el.id}
									/>
								)
							}
					  })
					: null
				: null}
			{group == 'Government' ? (
				<View>
					<Button
						title="View All Fire Alerts"
						page="View Fire Alerts"
						navigation={navigation}
					/>
					<Button
						title="View All Police Alerts"
						page="View Police Alerts"
						navigation={navigation}
					/>
					<Button
						title="View All Health Alerts"
						page="View Health Alerts"
						navigation={navigation}
					/>
					<Button
						title="Make a Global Alert"
						page="Government Alert"
						navigation={navigation}
					/>
				</View>
			) : (
				''
			)}
		</View>
	)
}
