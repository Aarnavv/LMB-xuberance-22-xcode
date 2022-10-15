// import * as React from 'react';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useDispatch } from 'react-redux'
import { loginFail, loginSuccess, initiateRequest } from '../../features/user'
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
	signupContainer: {
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
	dropdown: {
		height: 30,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		minWidth: '80%',
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 12,
	},
	placeholderStyle: {
		fontSize: 14,
	},
	selectedTextStyle: {
		fontSize: 14,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 14,
	},
	buttonSignup: {
		margin: 8,
	},
	link: {
		color: 'blue',
		textDecorationLine: 'underline',
		textAlign: 'center',
	},
})

export default function Signup({ navigation }) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user_state, setUserState] = useState('')
	const [aadhar, setAadhar] = useState('')
	const dispatch = useDispatch()
	function handleSignup() {
		if (firstName == '' || lastName == '' || email == '') {
		}
		const url =
			Platform.OS == 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000'
		fetch(`${url}/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: `${firstName}_${lastName}`,
				aadhar_id: aadhar,
				password: password,
				email: email,
				state: user_state,
				group: 'Citizen',
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json)
				dispatch(loginSuccess(json))
				navigation.navigate('Welcome')
			})
			.catch((error) => {
				console.log('Error', error)
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
			<View style={styles.signupContainer}>
				<View style={styles.inputFieldText}>
					<View style={[styles.fields, styles.inputFieldTextHeading]}>
						<Text>First Name</Text>
					</View>
					<View style={[styles.fields, styles.inputFieldTextHeading]}>
						<Text>Last Name</Text>
					</View>
					<View style={[styles.fields, styles.inputFieldTextHeading]}>
						<Text>Email</Text>
					</View>
					<View style={[styles.fields, styles.inputFieldTextHeading]}>
						<Text>Password</Text>
					</View>
					<View style={[styles.fields, styles.inputFieldTextHeading]}>
						<Text>Aadhar ID</Text>
					</View>
					<View style={[styles.fields, styles.inputFieldTextHeading]}>
						<Text>State</Text>
					</View>
				</View>
				<View style={styles.inputFields}>
					<TextInput
						style={[styles.input, styles.fields]}
						placeholder="First Name"
						onChangeText={setFirstName}
					/>
					<TextInput
						style={[styles.input, styles.fields]}
						placeholder="Last Name"
						onChangeText={setLastName}
					/>
					<TextInput
						style={[styles.input, styles.fields]}
						placeholder="Email"
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
						placeholder="Aadhar ID Number"
						keyboardType="numeric"
						onChangeText={setAadhar}
					/>
					<DropdownComponent handleChange={setUserState} />
					<View></View>
				</View>
			</View>
			<Text style={styles.link} onPress={() => navigation.navigate('Login')}>
				Already registered? Login
			</Text>
			<Button
				title="Sign Up"
				page="Welcome"
				navigation={navigation}
				onPress={handleSignup}
			/>
		</View>
	)
}

const data = [
	{ label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
	{ label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
	{ label: 'Assam', value: 'Assam' },
	{ label: 'Bihar', value: 'Bihar' },
	{ label: 'Chhattisgarh', value: 'Item 5' },
	{ label: 'Goa', value: 'Goa' },
	{ label: 'Gujarat', value: 'Gujarat' },
	{ label: 'Haryana', value: 'Haryana' },
	{ label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
	{ label: 'Jharkhand', value: 'Jharkhand' },
	{ label: 'Karnataka', value: 'Karnataka' },
	{ label: 'Kerala', value: 'Kerala' },
	{ label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
	{ label: 'Maharashtra', value: 'Maharashtra' },
	{ label: 'Manipur', value: 'Manipur' },
	{ label: 'Meghalaya', value: 'Meghalaya' },
	{ label: 'Mizoram', value: 'Mizoram' },
	{ label: 'Nagaland', value: 'Nagaland' },
	{ label: 'Odisha', value: 'Odisha' },
	{ label: 'Punjab', value: 'Punjab' },
	{ label: 'Rajasthan', value: 'Rajasthan' },
	{ label: 'Sikkim', value: 'Sikkim' },
	{ label: 'Tamil Nadu', value: 'Tamil Nadu' },
	{ label: 'Telangana', value: 'Telangana' },
	{ label: 'Tripura', value: 'Tripura' },
	{ label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
	{ label: 'Uttarakhand', value: 'Uttarakhand' },
	{ label: 'West Bengal', value: 'West Bengal' },
	{
		label: 'Andaman and Nicobar Islands',
		value: 'Andaman and Nicobar Islands',
	},
	{ label: 'Chandigarh', value: 'Chandigarh' },
	{
		label: 'Dadra & Nagar Haveli and Daman & Diu',
		value: 'Dadra & Nagar Haveli and Daman & Diu',
	},
	{ label: 'Delhi', value: 'Delhi' },
	{ label: 'Jammu and Kashmir', value: 'Jammu and Kashmir' },
	{ label: 'Lakshadweep', value: 'Lakshadweep' },
	{ label: 'Puducherry', value: 'Puducherry' },
	{ label: 'Ladakh', value: 'Ladakh' },
]

const DropdownComponent = ({ handleChange }) => {
	const [value, setValue] = useState(null)
	const [isFocus, setIsFocus] = useState(false)
	return (
		<View>
			<Dropdown
				style={[
					styles.dropdown,
					isFocus && { borderColor: 'blue' },
					styles.input,
					styles.fields,
				]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? 'Select item' : ''}
				searchPlaceholder="State"
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					setValue(item.value)
					setIsFocus(false)
					handleChange(item.value)
				}}
			/>
		</View>
	)
}
