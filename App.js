import Accueil from "./Screens/Accueil";
import Authentification from "./Screens/Authentification";
import CreateUser from "./Screens/CreateUser";
import chat from "./Screens/HomeScreen/chat";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Authentification">
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Authentification" component={Authentification} />
        <Stack.Screen name="CreateUser" component={CreateUser} />
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="chat" component={chat} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}