import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

interface TodoListProps {
  todo: any;
  onStatusChange: (todo: any) => void;
}

const TodoListCard: React.FC<TodoListProps> = props => {
  return (
    <View style={styles.container} key={props.todo.id}>
      <Text style={{color: '#000'}}>{props.todo.todo}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#767577'}}
        thumbColor={props.todo.completed ? '#000000' : '#f4f3f4'}
        onValueChange={() => props.onStatusChange(props.todo)}
        value={props.todo.completed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default TodoListCard;
