// import * as React from 'react';
import React, { useEffect, useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Button,
	Alert,
	TextInput,
	ScrollView,
} from 'react-native'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: '5%',
		paddingVertical: '5%',
	},
	AlertFieldContainer: {
		flexDirection: 'column',
		width: '90%',
		margin: '1.5%',
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: '#E6F1FF',
		alignItems: 'center',
		borderRadius: 15,
	},
	fieldTitle: {
		fontSize: 20,
		marginBottom: 10,
		textDecorationLine: 'underline',
	},
	descriptionField: {
		fontSize: 15,
	},
	alertDetails: {
		flexDirection: 'column',
		fontSize: 10,
		color: '#8892B0',
	},
})

export default function ViewGovernmentAlerts() {
	const [alerts, setAlerts] = useState(null)
	const token = useSelector((state) => state.user.token)
	const url =
		Platform.OS == 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000'
	fetch(`${url}/gov_alert/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	})
		.then((response) => response.json())
		.then((json) => {
			setAlerts(json)
		})
	return (
		<ScrollView contentContainerStyle={styles.container}>
			{alerts
				? alerts.map((el) => {
						return (
							<View style={styles.AlertFieldContainer} key={el.id}>
								<Text style={styles.fieldTitle}>{el.title}</Text>
								<Text style={styles.alertDetails}>{el.time}</Text>
								<Text style={styles.descriptionField}>{el.description}</Text>
							</View>
						)
				  })
				: ''}
		</ScrollView>
	)
}
