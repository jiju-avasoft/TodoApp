import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
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
import Geolocation from '@react-native-community/geolocation';
import RBSheet from 'react-native-raw-bottom-sheet';
import {isTokenValid} from '../../Helpers/utils';
const {width, height} = Dimensions.get('window');

const HomeScreen = (props: any) => {
  const {updateUser, userDetails} = useContext(UserContext);
  const {locations, updateLocations} = useContext(LocationContext);
  const [cordinates, setCordinates] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  let watchID: any;
  const mapRef = useRef<MapView>(null);
  const loginSheet = useRef<RBSheet>(null);

  useFocusEffect(
    useCallback(() => {
      loginSheet?.current?.close();
      const initialize = async () => {
        const tokenValue = await AsyncStorage.getItem('token');
        if (!tokenValue) {
          setTimeout(() => {
            loginSheet?.current?.open();
          }, 2000);
        } else {
          if (!isTokenValid(tokenValue)) {
            await AsyncStorage.clear();
            loginSheet?.current?.open();
          }
        }
      };
      initialize();
    }, [userDetails.token]),
  );
  useFocusEffect(
    useCallback(() => {
      const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          // getOneTimeLocation();
          // subscribeLocationLocation();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              getOneTimeLocation();
            } else {
            }
          } catch (err) {
            console.warn(err);
          }

          moveToCurrentLocation();
        }
      };
      requestLocationPermission();
    }, []),
  );

  const moveToCurrentLocation = () => {
    if (cordinates.latitude && cordinates.longitude) {
      if (mapRef.current) {
        mapRef?.current?.animateToRegion({
          latitude: cordinates.latitude,
          longitude: cordinates.longitude,
          latitudeDelta: 0.12,
          longitudeDelta: 0.12,
        });
      }
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const clonedCords = {...cordinates};
        clonedCords.latitude = position.coords.latitude;
        clonedCords.longitude = position.coords.longitude;
        setCordinates(clonedCords);

        if (mapRef.current) {
          mapRef?.current?.animateToRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.12,
            longitudeDelta: 0.12,
          });
        }
      },
      error => {},
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

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

      loginSheet?.current?.close();
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
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <TouchableOpacity
          onPress={moveToCurrentLocation}
          style={styles.currentLocationNavigator}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../Assets/Images/current-location-icon.png')}
          />
        </TouchableOpacity>
        <MapView
          ref={mapRef}
          style={{width: width, height: '95%'}}
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
          {cordinates.latitude && cordinates.longitude ? (
            <Marker
              key={'current'}
              coordinate={{
                latitude: parseFloat(cordinates.latitude.toString()),
                longitude: parseFloat(cordinates.longitude.toString()),
              }}>
              <View style={[styles.currentLocation, {elevation: 20}]}>
                <View
                  style={[
                    {
                      width: 20,
                      height: 20,
                      backgroundColor: '#3064CE',
                      elevation: 20,
                      borderRadius: 10,
                    },
                  ]}></View>
              </View>
            </Marker>
          ) : (
            <></>
          )}
        </MapView>
      </View>
      <RBSheet
        ref={loginSheet}
        height={550}
        openDuration={50}
        closeDuration={50}
        closeOnPressBack={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          },
        }}
        animationType="slide">
        <LoginPage onLogin={onLogin} />
      </RBSheet>
    </View>
  );
};

export default HomeScreen;
