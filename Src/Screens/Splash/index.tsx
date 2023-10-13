import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const SplashScreen = (props: any) => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const initialize = async () => {
      setTimeout(() => {
        props.navigation.navigate('Home');
      }, 2000);
    };
    initialize();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require('../../Assets/Lottie/splash.json')}
        autoPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
});

export default SplashScreen;
