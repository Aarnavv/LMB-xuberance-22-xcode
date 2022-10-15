import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function Button({ navigation, title, page, onPress = null, color }) {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      padding: 5,
      backgroundColor: `#${color}`,
      color: '#000',
      minWidth: '100%',
      borderStyle: 'solid',
      borderBottomColor: 'black',
      borderWidth: 1,
      marginVertical: 5,
    },
  })
  return (
    <TouchableOpacity style={{ width: '60%' }} onPress={() => {
      if (onPress)
        onPress()
      else
        navigation.navigate(page)
    }}>
      <View style={styles.button}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity >
  )
}