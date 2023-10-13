import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  loginWrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'flex-start',

  },
  loginContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    width: '80%',
    borderRadius: 20,
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  buttonText: {color: '#fff', fontWeight: '800', fontSize: 16},
  logoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#0000009A',
    elevation: 10,
  },
  inputConatiner: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    color: '#000',
  },
  label: {color: '#000000', fontSize: 16},
  error: {
    fontSize: 10,
    color: 'red',
  },
});
