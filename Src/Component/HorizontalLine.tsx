import React from 'react';
import {View} from 'react-native';

interface HorizontalLineProps {
  thickness: number;
  color?: string;
}

const HorizontalLine = (props: any) => {
  return (
    <View
      style={{
        width: '100%',
        height: props.thickness,
        backgroundColor: props.color ? props.color : '#d3d3d3',
      }}></View>
  );
};

export default HorizontalLine;
