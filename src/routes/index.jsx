import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from '../screens/home';
import Login from '../screens/Login';
import ListTasks from '../screens/ListTasks';
import ListUsers from '../screens/ListUsers';
import LoadingScreen from '../screens/Loading';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MenuLateral from '../components/MenuLateral';
import TarefaScreen from '../screens/Tarefa';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <MenuLateral {...props} />}
        screenOptions={{
          drawerType: 'front',

          drawerPosition: 'right',
          drawerHideStatusBarOnOpen: false,
          // CardStyleInterpolators: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Drawer.Screen
          options={{ headerShown: false }}
          name='Stack'
          component={StackNavigator}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='SplashScreen'>
      <Stack.Screen
        options={{ headerShown: false }}
        name='SplashScreen'
        component={LoadingScreen}
      />
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
      <Stack.Screen
        options={{ headerShown: false }}
        name='Task'
        component={TarefaScreen}
      />
    </Stack.Navigator>
  );
};

export default Routes;
