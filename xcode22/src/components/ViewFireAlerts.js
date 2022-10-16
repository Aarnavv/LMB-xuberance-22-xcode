// import * as React from 'react';
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native'
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
    alignItems: 'center',
  }
})

export default function ViewFireAlerts() {
  const [alerts, setAlerts] = useState(null)
  const group = useSelector((state) => state.user.user.user.groups[0].name)
  const token = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user)
  console.log(user)
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
          console.log(json.error)
        } else {
          setAlerts(json)
        }
      })
  }
  getAlerts()
  return (
    <View style={styles.container}>
      {alerts != null
        ? alerts.map((el) => {
          if (el.category == 'FireAlert') {
            return (
              <View style={styles.AlertFieldContainer}>
                <Text style={styles.fieldTitle}>{el.description}</Text>
                <View style={styles.alertDetails}>
                  <Text style={styles.alertDetails}>{'{time}'}</Text>
                  <Text style={styles.alertDetails}>{'{location}'}</Text>
                </View>
                <Text style={styles.descriptionField}>{el.title}</Text>
              </View>
            )
          }
        })
        : null}
    </View>
  )
}
