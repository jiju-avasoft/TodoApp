import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UserContext, defaultUserValues} from '../../Context/UserContext';
import HorizontalLine from '../../Component/HorizontalLine';
import {styles} from './styles';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import HeaderComponent from '../../Component/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import LoaderComponent from '../../Component/LoaderComponent';

const AccountScreen = (props: any) => {
  const {userDetails, updateUserImage, updateUser} = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      if (!userDetails.token) {
        setTimeout(() => {
          props.navigation.navigate('Explore');
        }, 2000);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, [userDetails.token]),
  );

  const onChangeImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        updateUserImage(imageUri);
      }
    });
  };

  const onLogout = async () => {
    await AsyncStorage.clear();
    updateUser(defaultUserValues);
    props.navigation.navigate('Explore');
  };

  return (
    <View style={{flex: 1}}>
      <HeaderComponent
        title="Account"
        isBackRequred={true}
        isGoRequired={false}
        onPressBack={() => props.navigation.goBack()}
        onPressGo={() => {}}
      />
      {loading ? (
        <LoaderComponent />
      ) : (
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.profileWrapper}>
            {userDetails.image ? (
              <Image
                source={{
                  uri: userDetails.image,
                }}
                resizeMode="cover"
                style={styles.image}
              />
            ) : (
              <View style={[styles.image, styles.center]}>
                <Text style={{color: '#000000', fontSize: 45}}>!</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={onChangeImage}>
              <Text style={{color: '#FFF'}}>E</Text>
            </TouchableOpacity>
          </View>
          <HorizontalLine thickness={4} />
          <View style={styles.userInfoContainer}>
            <Text style={[styles.text]}>Name</Text>
            <Text style={styles.text}>
              {userDetails.firstName + ' ' + userDetails.lastName}
            </Text>
            <HorizontalLine thickness={2} />
            <Text style={[styles.text, {marginTop: 20}]}>Email</Text>
            <Text style={styles.text}>{userDetails.email}</Text>
            <HorizontalLine thickness={2} />
            <Text style={[styles.text, {marginTop: 20}]}>Gender</Text>
            <Text style={styles.text}>{userDetails.gender}</Text>
            <HorizontalLine thickness={2} />
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={{color: '#fff', fontWeight: '700'}}>Log out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AccountScreen;
