// import * as React from 'react';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import Button from './Button'
import { useSelector } from 'react-redux'

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
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    minWidth: '85%',
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
  }
})

export default function FireAlert({ navigation }) {
	const token = useSelector((state) => state.user.token)
	const [condition, setCondition] = useState('')
	const [description, setDescription] = useState('')
	const handleSubmit = () => {
		const url =
			Platform.OS == 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000'
		fetch(`${url}/user_alerts/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({
				title: condition,
				description: description,
				category: 'FireAlert',
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.error) {
					console.log(json.error)
				} else {
					navigation.navigate('Home')
				}
			})
			.catch((error) => {})
	}
	return (
		<View style={styles.container}>
			<View style={{ width: '100%', alignItems: 'center' }}>
				<Text style={styles.heading}>Alert the Fire Department</Text>
				<View
					style={{
						width: '100%',
						borderBottomColor: 'black',
						borderWidth: 1,
					}}
				/>
			</View>
			<View style={styles.makeAlertContainer}>
				<Text style={{ color: 'red' }}>
					*Not specifying details will result in the assumption that health
					services are required immediately.{'\n'}
				</Text>
				<View style={styles.AlertFieldContainer}>
					<Text style={styles.fieldTitle}>Condition</Text>
					<TextInput
						style={[styles.input, styles.fields]}
						placeholder="Condition"
						textAlign="center"
						onChangeText={setCondition}
					/>
				</View>
				<View style={styles.AlertFieldContainer}>
					<Text style={styles.fieldTitle}>Description</Text>
					<DropdownComponent handleChange={setDescription} />
				</View>
			</View>
			<Button
				title="Make Alert"
				page="Home"
				navigation={navigation}
				onPress={handleSubmit}
			/>
		</View>
	)
}

const data = [
	{ label: 'Fire in a building', value: 'Fire in a building' },
	{ label: 'Human/Animal stuck', value: 'Human/Animal stuck' },
	{
		label: 'Short Circuiting in a powerhouse',
		value: 'Short Circuiting in a powerhouse',
	},
	{ label: 'Other', value: 'Other' },
]

const DropdownComponent = ({ handleChange }) => {
	const [value, setValue] = useState(null)
	const [isFocus, setIsFocus] = useState(false)
	return (
		<View style={styles.container}>
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
