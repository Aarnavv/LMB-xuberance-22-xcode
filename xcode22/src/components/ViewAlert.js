// import * as React from 'react';
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native'

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
})

export default function ViewAlert({ title, description }) {
	return (
		<View style={styles.AlertFieldContainer}>
			<Text style={styles.fieldTitle}>{title}</Text>
			<Text style={styles.descriptionField}>{description}</Text>
		</View>
	)
}
