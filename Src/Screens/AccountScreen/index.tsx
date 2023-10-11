import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UserContext} from '../../Context/UserContext';
import HorizontalLine from '../../Component/HorizontalLine';

const AccountScreen = () => {
  const {userDetails} = useContext(UserContext);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.profileWrapper}>
        <Image
          source={{uri: userDetails.image}}
          style={{height: 140, width: 140, borderRadius: 70}}
        />
        <View style={styles.editIconContainer}>
          <Text style={{color: '#FFF'}}>E</Text>
        </View>
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
      </View>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={{color: '#fff', fontWeight: '700'}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'left',
  },
  logoutButton: {
    backgroundColor: 'red',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 20,
  },
  profileWrapper: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 80,
    backgroundColor: 'red',
    marginTop: 50,
    marginBottom: 20,
  },
  editIconContainer: {
    backgroundColor: '#000',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 0,
    position: 'absolute',
    borderRadius: 20,
  },
  userInfoContainer: {
    flex: 1,
    width: '80%',
    paddingVertical: 30,
  },
});

export default AccountScreen;
