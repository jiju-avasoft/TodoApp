import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import WebView from 'react-native-webview';

const SplashScreen = (props: any) => {
  //   const [isLoading, setIsLoading] = useState<boolean>(true);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const initialize = async () => {
      // const tokenValue = await AsyncStorage.getItem('token');
      // if (tokenValue) {
      //   setTimeout(() => {
      //     props.navigation.navigate("Home")
      //   }, 2000);
      // } else {
      //   setTimeout(() => {
      //       props.navigation.navigate("Home")
      //   }, 2000);
      // }
      setTimeout(() => {
        props.navigation.navigate('Home');
      }, 2000);
    };
    initialize();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#000000'}}>Loading....</Text>
    </View>
  );
};

export default SplashScreen;
