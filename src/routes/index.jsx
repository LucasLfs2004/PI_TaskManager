import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import Login from '../screens/Login';
import ListTasks from '../screens/ListTasks';
import ListUsers from '../screens/ListUsers';

const Routes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name='Login'
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Home'
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Tasks'
          component={ListTasks}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Users'
          component={ListUsers}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
