// import * as React from 'react';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import Button from './Button.js'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: '15%',
		paddingVertical: '5%',
	},
	heading: {
		fontSize: 30,
		marginTop: 10,
	},
	makeAlertContainer: {
		flexDirection: 'column',
		width: '100%',
		justifyContent: 'space-around',
		margin: 20,
	},
	AlertFieldContainer: {
		flexDirection: 'column',
		width: '100%',
		alignItems: 'center',
		marginBottom: 50,
	},
	fieldTitle: {
		fontSize: 20,
		textDecorationLine: 'underline',
	},
	fields: {
		height: 30,
		width: '85%',
		marginTop: 10,
	},
	descriptionField: {
		height: 100,
	},
	buttonAlert: {
		margin: 8,
	},
})

export default function GovernmentAlert({ navigation }) {
	const [description, setDescription] = useState('')
	const [title, setTitle] = useState('')
	const token = useSelector((state) => state.user.token)
	const handleSubmit = () => {
		fetch('http://localhost:8000/gov_alert/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({
				description: description,
				title: title,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json)
				navigation.navigate('Home')
			})
			.catch((error) => {
				console.log(error)
			})
	}
	return (
		<View style={styles.container}>
			<View style={{ width: '100%', alignItems: 'center' }}>
				<Text style={styles.heading}>Make a Global Alert</Text>
				<View
					style={{
						width: '100%',
						borderBottomColor: 'black',
						borderWidth: 1,
					}}
				/>
			</View>
			<View style={styles.makeAlertContainer}>
				<View style={styles.AlertFieldContainer}>
					<Text style={styles.fieldTitle}>Title</Text>
					<TextInput
						style={[styles.input, styles.fields]}
						placeholder="Title"
						textAlign="center"
						onChangeText={setTitle}
					/>
				</View>
				<View style={styles.AlertFieldContainer}>
					<Text style={styles.fieldTitle}>Description</Text>
					<TextInput
						style={[styles.input, styles.fields, styles.descriptionField]}
						placeholder="Description"
						textAlign="center"
						multiline={true}
						textAlignVertical="top"
						numberOfLines={4}
						onChangeText={setDescription}
					/>
				</View>
			</View>
			<Button title="Make Alert" page="Home" navigation={navigation} />
		</View>
	)
}
