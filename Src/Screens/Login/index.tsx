import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
const {width, height} = Dimensions.get('window');

const LoginPage = (props: any) => {
  return (
    <View style={styles.loginWrapper}>
      <View style={styles.loginContainer}>
        <View style={{flex: 1, width: width}}>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}></View>
          </View>
          <View style={styles.inputConatiner}>
            <View style={{width: '90%'}}>
              <Text style={styles.label}>User Name</Text>
            </View>
            <TextInput style={styles.input} />
            <View style={{width: '90%', marginTop: 10}}>
              <Text style={styles.label}>Password</Text>
            </View>
            <TextInput style={styles.input} />
            <TouchableOpacity onPress={props.onLogin} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
