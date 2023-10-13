import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
const {width, height} = Dimensions.get('window');

const LoginPage = (props: any) => {
  const [userDetails, setUserDetails] = useState<{
    mail: string;
    password: string;
  }>({mail: '', password: ''});

  const [inputError, setInputError] = useState<{
    mail: boolean;
    password: boolean;
  }>({mail: false, password: false});

  const validateMail = () => {
    const clonedError = {...inputError};
    clonedError.mail = userDetails.mail.trim() ? false : true;
    clonedError.password = userDetails.password.trim() ? false : true;
    setInputError(clonedError);

    if (clonedError.mail && clonedError.password) {
      return false;
    } else {
      return true;
    }
  };

  const onLogin = async () => {
    if (validateMail()) {
      props.onLogin();
    }
  };

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
            <TextInput
              style={styles.input}
              value={userDetails.mail}
              onChangeText={text => {
                const clonedDetails = {...userDetails};
                clonedDetails.mail = text;
                setUserDetails(clonedDetails);
              }}
            />
            {inputError.mail === true ? (
              <View style={{width: '90%'}}>
                <Text style={styles.error}>Please enter email</Text>
              </View>
            ) : (
              <></>
            )}
            <View style={{width: '90%', marginTop: 10}}>
              <Text style={styles.label}>Password</Text>
            </View>
            <TextInput
              style={styles.input}
              value={userDetails.password}
              onChangeText={text => {
                const clonedDetails = {...userDetails};
                clonedDetails.password = text;
                setUserDetails(clonedDetails);
              }}
            />
            {inputError.password ? (
              <View style={{width: '90%'}}>
                <Text style={styles.error}>Please enter your password</Text>
              </View>
            ) : (
              <></>
            )}
            <TouchableOpacity onPress={onLogin} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
