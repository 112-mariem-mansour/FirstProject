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
    activeTintColor: '#FFFFFF', 
    inactiveTintColor: '#757575', 
    showLabel: false, 
    style: {
      backgroundColor: '#6200EE',
    },
  };

  return (
    <Tab.Navigator
      initialRouteName="ListProfil"
      shifting={true} 
      barStyle={{ backgroundColor: '#6200EE' }} 
      activeColor="#FFFFFF" 
      inactiveColor="#757575"
    >
      <Tab.Screen
        name="ListProfil"
        component={ListProfil}
        initialParams={currentid}

        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Groupe"
        component={Groupe}
        initialParams={currentid}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        initialParams={currentid}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}