import Accuel from "./Screens/Accuel";
import Authentification from "./Screens/Authentification";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Authentification">
            <Stack.Navigator>
        <Stack.Screen name="Authentification" component={Authentification} />
      </Stack.Navigator>
      <Stack.Navigator>
        <Stack.Screen name="Accuel" component={Accuel} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}