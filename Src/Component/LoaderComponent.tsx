import React from 'react';
import {ActivityIndicator, View} from 'react-native';
interface LoaderProps {
  color?: string;
  size?: 'large' | 'small';
}

const LoaderComponent: React.FC<LoaderProps> = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator
        size={props.size ? props.size : 'large'}
        color={props.color ? props.color : '#0000ff'}
      />
    </View>
  );
};

export default LoaderComponent;
