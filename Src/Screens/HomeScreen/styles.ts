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
});
