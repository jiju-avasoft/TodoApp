import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  locationMarker: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerNumber: {color: '#fff', fontWeight: '800'},
  currentLocation: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  currentLocationNavigator: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 10,
  },
});
