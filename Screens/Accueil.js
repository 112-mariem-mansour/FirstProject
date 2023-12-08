import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import ListProfil from './HomeScreen/ListProfil';
import Groupe from './HomeScreen/Groupe';
import MyAccount from './HomeScreen/MyAccount';
import chat from './HomeScreen/chat';

const Tab = createMaterialBottomTabNavigator();

export default function Accueil(props) {
  const currentid = props.route.params.currentid;

  const tabBarOptions = {
    activeTintColor: '#FFFFFF', // Active tab text color
    inactiveTintColor: '#757575', // Inactive tab text color
    showLabel: false, // Hide tab labels
    style: {
      backgroundColor: '#6200EE', // Tab bar background color
    },
  };

  return (
    <Tab.Navigator
      initialRouteName="ListProfil"
      shifting={true} // Enables shifting behavior for icons
      barStyle={{ backgroundColor: '#6200EE' }} // Background color for the entire bottom tab navigator
      activeColor="#FFFFFF" // Active tab text color
      inactiveColor="#757575" // Inactive tab text color
    >
      <Tab.Screen
        name="ListProfil"
        component={ListProfil}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Groupe"
        component={Groupe}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={chat}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}