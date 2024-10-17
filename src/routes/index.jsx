import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from '../screens/home';
import Login from '../screens/Login';
import ListTasks from '../screens/ListTasks';
import ListUsers from '../screens/ListUsers';
import LoadingScreen from '../screens/Loading';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MenuLateral from '../components/MenuLateral';

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
          name='SplashScreen'
          component={LoadingScreen}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name='Login'
          component={Login}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name='Home'
          component={Home}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name='Tasks'
          component={ListTasks}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name='Users'
          component={ListUsers}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
