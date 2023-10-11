import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

const LoginPage = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{height: 200, width: 200, backgroundColor: '#d3d3d3'}}></View>
      </View>
      <View
        style={{flex: 4, justifyContent: 'flex-start', alignItems: 'center'}}>
        <View style={{width: '90%'}}>
          <Text style={{color: '#000000', fontSize: 18}}>User Name</Text>
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
          style={{
            width: '90%',
            borderRadius: 20,
            height: 50,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 16}}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
