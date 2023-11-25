import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Button from "../components/Button";
import { useRef, useState } from 'react';
import ListProfil from './HomeScreen/ListProfil';
import Groupe from './HomeScreen/Groupe';
import MyAccount from './HomeScreen/MyAccount';
const Tab=createMaterialBottomTabNavigator();
export default function Accueil() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListProfil" component={ListProfil} />
      <Tab.Screen name="Groupe" component={Groupe} />
      <Tab.Screen name="MyAccount" component={MyAccount} />

    </Tab.Navigator>
  )
}