import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useMemo, useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import {loginUser} from '../../Services/AuthService';
const {width, height} = Dimensions.get('window');

const HomeScreen = (props: any) => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const initialize = async () => {
      const tokenValue = await AsyncStorage.getItem('token');
      if (!tokenValue) {
        setTimeout(() => {
          setVisible(true);
        }, 2000);
      }
    };
    initialize();
  }, []);

  const onLogin = async () => {
    const login = await loginUser();

    console.log(login.data);

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
      
      await AsyncStorage.setItem("UserDetails", JSON.stringify(login.data))

      setVisible(false);
    }
  };

  return (
    <View
      style={{
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      <View style={{height: '100%', width: '100%', position: 'absolute'}}>
        <WebView
          source={{
            uri: 'https://maps.google.com/maps?q=,&t=&z=13&ie=UTF8&iwloc=&output=embed`',
          }}
          style={{flex: 1}}
        />
      </View>
      {visible ? (
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '75%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View style={{flex: 1, width: width}}>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    backgroundColor: '#d3d3d3',
                  }}></View>
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View style={{width: '90%'}}>
                  <Text style={{color: '#000000', fontSize: 18}}>
                    User Name
                  </Text>
                </View>
                <TextInput
                  style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#d3d3d3',
                  }}
                />
                <View style={{width: '90%', marginTop: 20}}>
                  <Text style={{color: '#000000', fontSize: 18}}>Password</Text>
                </View>
                <TextInput
                  style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#d3d3d3',
                  }}
                />
                <TouchableOpacity
                  onPress={onLogin}
                  style={{
                    width: '90%',
                    borderRadius: 20,
                    height: 50,
                    backgroundColor: 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: '#fff', fontWeight: '800', fontSize: 16}}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default HomeScreen;
