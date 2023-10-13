import React, {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TodoContext} from '../Context/TodoContext';
import {deleteTodoWithId} from '../Helpers/utils';

interface TodoListProps {
  todo: any;
  onStatusChange: (todo: any) => void;
  onPress: () => void;
  onLongPress: () => void;
  deleteId: boolean;
}

const TodoListCard: React.FC<TodoListProps> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      style={[
        styles.container,
        {backgroundColor: props.deleteId ? 'red' : '#fff'},
      ]}
      key={props.todo.id}>
      {props.deleteId ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../Assets/Images/remove.png')}
          />
        </View>
      ) : (
        <>
          <View style={{flex: 1}}>
            <Text style={{color: '#000', fontSize: 18}}>{props.todo.todo}</Text>
            <Text style={{color: '#000', fontSize: 12}}>
              {new Date(props.todo.date).toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity>
            {props.todo.completed ? (
              <Image
                style={{width: 30, height: 30}}
                source={require('../Assets/Images/check.png')}
              />
            ) : (
              <Image
                style={{width: 30, height: 30}}
                source={require('../Assets/Images/in-progress.png')}
              />
            )}
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 15,
  },
});

export default TodoListCard;
