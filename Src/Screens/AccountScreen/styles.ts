import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    borderWidth: 5,
    borderColor: '#000',
    borderRadius: 80,
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
  image: {
    height: 150,
    width: 150,
    borderRadius: 70,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
