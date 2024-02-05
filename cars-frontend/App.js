import CarList from './screens/CarList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCarScreen from './screens/AddCarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={CarList} />
        <Stack.Screen name="AddCar" component={AddCarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
