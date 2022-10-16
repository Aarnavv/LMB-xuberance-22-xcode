import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Dimensions } from 'react-native'
import Button from './Button.js'

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 0.35,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: '15%',
		paddingVertical: '5%',
	},
	heading: {
		fontSize: 30,
		marginTop: 10,
	},
})

export default function LoginSignup({ navigation }) {
	return (
		<View style={{ height: '100%', backgroundColor: '#fff' }}>
			<View style={styles.container}>
				<View style={{ width: '100%', alignItems: 'center' }}>
					<Text style={styles.heading}>Auxilio</Text>
					<View
						style={{
							width: '100%',
							borderBottomColor: 'black',
							borderWidth: 1,
						}}
					/>
				</View>
				<Text style={{ fontSize: 20 }}>
					{'\n'} Log in or sign up to use the app in case of an emergency!{' '}
					{'\n'}
				</Text>
				<Button title="Login" page="Login" navigation={navigation} />
				<Button title="Sign Up" page="Register" navigation={navigation} />
			</View>
		</View>
	)
}
