// import * as React from 'react';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
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
		alignItems: 'center',
	},
})

export default function ViewAlert({ title, description, time, location }) {
	return (
		<View style={styles.AlertFieldContainer}>
			<Text style={styles.fieldTitle}>{title}</Text>
			<View style={styles.alertDetails}>
				<Text style={styles.alertDetails}>{time}</Text>
				<Text style={styles.alertDetails}>{location}</Text>
			</View>
			<Text style={styles.descriptionField}>{description}</Text>
		</View>
	)
}
