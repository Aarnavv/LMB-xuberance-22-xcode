// import * as React from 'react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	loginFail,
	loginSuccess,
	logout,
	initiateRequest,
} from '../../features/user'
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native'
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
	loginContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around',
		margin: 20,
	},
	inputFieldText: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flex: 1,
	},
	inputFields: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		flex: 2,
	},
	inputFieldTextHeading: {
		flexDirection: 'column',
		justifyContent: 'center',
		fontSize: 15,
		minWidth: '100%',
		minHeight: 30,
		textAlignVertical: 'middle',
	},
	fields: {
		minHeight: 30,
	},
	buttonLogin: {
		margin: 8,
	},
	link: {
		color: 'blue',
		textDecorationLine: 'underline',
		textAlign: 'center',
	},
})

export default function Login({ navigation }) {
	const [aadhar, setAadhar] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [isInValid, setInValid] = useState(false)
	const dispatch = useDispatch()
	const user = useSelector((state) => {
		state.user
	})
	function handleLogin() {
		if (password == '' || email == '') {
			setInValid(true)
			return
		}
		const url =
			Platform.OS == 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000'
		fetch(`${url}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				aadhar_id: aadhar,
				password: password,
				email: email,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.error) {
					console.log(json.error)
					setInValid(true)
				} else {
					dispatch(loginSuccess(json))
					navigation.navigate('Home')
				}
			})
			.catch((error) => {
				setInValid(true)
				dispatch(loginFail(error))
			})
	}
	return (
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
			<View style={styles.loginContainer}>
				<View style={styles.inputFieldText}>
					<View style={[styles.fields, styles.inputFieldTextHeading]}>
						<Text>Email</Text>
					</View>
					<View style={[styles.fields, styles.inputFieldTextHeading]}>
						<Text>Password</Text>
					</View>
					<View style={[styles.fields, styles.inputFieldTextHeading]}>
						<Text>Aadhar ID</Text>
					</View>
				</View>
				<View style={styles.inputFields}>
					<TextInput
						style={[styles.input, styles.fields]}
						placeholder="Email"
						autoCapitalize="none"
						onChangeText={setEmail}
					/>
					<TextInput
						style={[styles.input, styles.fields]}
						placeholder="Password"
						textContentType="password"
						secureTextEntry={true}
						onChangeText={setPassword}
					/>
					<TextInput
						style={[styles.input, styles.fields]}
						placeholder="Last 4 digits of Aadhar ID"
						keyboardType="numeric"
						onChangeText={setAadhar}
					/>
				</View>
			</View>
			{isInValid ? <Text style={{ color: 'red' }}>*Invalid Input</Text> : ''}
			<Text style={styles.link} onPress={() => navigation.navigate('Register')}>
				Not yet registered? Click here to register
			</Text>
			<Button
				title="Login"
				page="Home"
				navigation={navigation}
				onPress={handleLogin}
			/>
		</View>
	)
}
