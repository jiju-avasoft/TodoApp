import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import AccountScreen from '../Screens/AccountScreen';
import TodoScreen from '../Screens/TodoScreen';
import {WithLocalSvg} from 'react-native-svg';

const HomePageRoute = () => {
  function SettingsScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true}}>
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#f25c1c',
          tabBarInactiveTintColor: '#495bb6',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <WithLocalSvg
                  height={25}
                  width={25}
                  asset={require('../Assets/Images/active-explore.svg')}
                />
              );
            } else {
              return (
                <WithLocalSvg
                  height={25}
                  width={25}
                  asset={require('../Assets/Images/explore.svg')}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#f25c1c',
          tabBarInactiveTintColor: '#495bb6',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <WithLocalSvg
                  height={25}
                  width={25}
                  asset={require('../Assets/Images/active-todo.svg')}
                />
              );
            } else {
              return (
                <WithLocalSvg
                  height={25}
                  width={25}
                  asset={require('../Assets/Images/todo.svg')}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#f25c1c',
          tabBarInactiveTintColor: '#495bb6',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <WithLocalSvg
                  height={22}
                  width={22}
                  asset={require('../Assets/Images/active-account.svg')}
                />
              );
            } else {
              return (
                <WithLocalSvg
                  height={22}
                  width={22}
                  asset={require('../Assets/Images/account.svg')}
                />
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomePageRoute;
