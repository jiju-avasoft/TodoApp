import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface HeaderProps {
  title: string;
  onPressBack: () => void;
  onPressGo: () => void;
  isBackRequred: boolean;
  isGoRequired: boolean;
}

const HeaderComponent: React.FC<HeaderProps> = props => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftIcon}>
        {props.isBackRequred ? (
          <Pressable
            onPress={props.onPressBack}
            style={{flex: 1, backgroundColor: '#d3d3d3'}}></Pressable>
        ) : (
          <></>
        )}
      </View>
      <Text style={{color: '#000', fontSize: 18}}>{props.title}</Text>
      <View
        style={{
          marginRight: 20,
        }}>
        {props.isGoRequired ? (
          <Pressable style={styles.goWrapper} onPress={props.onPressGo}>
            <Text style={{color: '#000'}}>Add New</Text>
          </Pressable>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#d3d3d3',
  },
  goWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    height: 35,
    paddingHorizontal: 5,
  },
  leftIcon: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
});

export default HeaderComponent;
