import { View, Text } from 'react-native'
import React from 'react'
import firebase from '../../Config'
const database=firebase.database();
export default function MyAccount() {
  return (
    <View>
      <Text>MyAccount</Text>
    </View>
  )
}