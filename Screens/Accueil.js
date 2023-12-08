import { StatusBar } from 'expo-status-bar';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Button from "../components/Button";
import { useRef, useState } from 'react';
import ListProfil from './HomeScreen/ListProfil';
import Groupe from './HomeScreen/Groupe';
import MyAccount from './HomeScreen/MyAccount';
import chat from './HomeScreen/chat';

const Tab=createMaterialBottomTabNavigator();
export default function Accueil(props) {
  const currentid=props.route.params.currentid ;
  return (
    <Tab.Navigator screenOptions={currentid}>
      <Tab.Screen name="ListProfil" component={ListProfil} />
      <Tab.Screen name="Groupe" component={Groupe} />
      <Tab.Screen name="MyAccount" component={MyAccount} />
      <Tab.Screen name="chat" component={chat} />

    </Tab.Navigator>
  )
}