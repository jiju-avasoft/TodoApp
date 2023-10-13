import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface DeleteComponentProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteComponent: React.FC<DeleteComponentProps> = props => {
  return (
    <View style={{flex: 1, padding: 20}}>
      <View style={styles.headerWarapper}>
        <Text style={{color: '#000', fontSize: 20}}>
          Are you sure want to delete?
        </Text>
      </View>
      <TouchableOpacity
        onPress={props.onConfirm}
        style={[styles.submitWrapper, styles.center, {backgroundColor: 'red'}]}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onCancel}
        style={[styles.center, styles.submitWrapper]}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWarapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  confirmText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  cancelText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 16,
  },
  center: {justifyContent: 'center', alignItems: 'center'},
  submitWrapper: {
    height: 60,
    borderRadius: 30,
    marginTop: 10,
  },
});

export default DeleteComponent;
