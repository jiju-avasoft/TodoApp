import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {LocationContext} from '../../Context/LocationContext';
import {UserContext} from '../../Context/UserContext';
import {loginUser} from '../../Services/AuthService';
import LoginPage from '../Login';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const HomeScreen = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const {updateUser, userDetails} = useContext(UserContext);
  const {locations, updateLocations} = useContext(LocationContext);

  useFocusEffect(
    useCallback(() => {
      setVisible(false);
      const initialize = async () => {
        const tokenValue = await AsyncStorage.getItem('token');
        if (!tokenValue) {
          setTimeout(() => {
            setVisible(true);
          }, 2000);
        }
      };
      initialize();
    }, [userDetails.token]),
  );

  const onLogin = async () => {
    const login = await loginUser();

    if (login) {
      await AsyncStorage.setItem('token', login.data.token);

      const userDetails = {
        email: 'kminchelle@qq.com',
        firstName: 'Jeanne',
        gender: 'female',
        id: 15,
        image: 'https://robohash.org/autquiaut.png',
        lastName: 'Halvorson',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTY5NzAxMDY0OSwiZXhwIjoxNjk3MDE0MjQ5fQ.rcmo1BYZJUCdRZXX94ElHu58b65SC_3EJ6Iw14IuaKE',
        username: 'kminchelle',
      };

      await AsyncStorage.setItem('UserDetails', JSON.stringify(login.data));

      updateUser(login.data);

      setVisible(false);
    }
  };

  const updateNewLocation = (location: any) => {
    const newLocation = {
      lat: location.latitude,
      lng: location.longitude,
    };

    updateLocations(newLocation);
  };

  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll={true}
      enableOnAndroid={true}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={{width: width, height: '95%'}}
            region={{
              latitude: 12.8412615,
              longitude: 80.2209664,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={event => {
              updateNewLocation(event.nativeEvent.coordinate);
            }}>
            {locations.map((location, index) => {
              return (
                <Marker
                  key={location.lat}
                  coordinate={{
                    latitude: parseFloat(location.lat),
                    longitude: parseFloat(location.lng),
                  }}>
                  <View style={styles.locationMarker}>
                    <Text style={styles.markerNumber}>{index + 1}</Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
        </View>
        {visible ? <LoginPage onLogin={onLogin} /> : <></>}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default HomeScreen;
