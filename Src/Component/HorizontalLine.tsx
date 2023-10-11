import React from 'react';
import {View} from 'react-native';

const HorizontalLine = (props: any) => {
  return (
    <View style={{width: '100%', height: props.thickness, backgroundColor: '#d3d3d3'}}></View>
  );
};

export default HorizontalLine;
