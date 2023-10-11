import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import HeaderComponent from '../../Component/HeaderComponent';
import {getTodos} from '../../Services/TodoService';
import {UserContext} from '../../Context/UserContext';
import TodoListCard from '../../Component/TodoListCard';
import {TodoContext} from '../../Context/TodoContext';
import { useFocusEffect } from '@react-navigation/native';

const TodoScreen = (props: any) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {userDetails} = useContext(UserContext);
  const {allTodos, updateTodoWithId} = useContext(TodoContext);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      if (!userDetails.token) {
        setTimeout(() => {
          props.navigation.navigate('Explore');
        }, 2000);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, [userDetails.token]),
  );

  useEffect(() => {
    getAllTodos();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const getAllTodos = async () => {
    const todoData = await getTodos(userDetails.id);

    if (todoData) {
      setTodos(todoData.data.todos);
    }
  };

  const onStatusChange = (todo: any) => {};

  return (
    <View style={{flex: 1}}>
      <HeaderComponent
        title="Todos"
        isBackRequred={true}
        isGoRequired
        onPressBack={() => props.navigation.goBack()}
        onPressGo={() => console.log('is clicked')}
      />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : todos.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#000'}}>Create new Todo</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          style={{flex: 1}}
          ListEmptyComponent={
            <View
              style={{
                height: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
              }}>
              <Text style={{color: '#000'}}>Create New Todo</Text>
            </View>
          }
          renderItem={({item, index}) => {
            return <TodoListCard todo={item} onStatusChange={onStatusChange} />;
          }}
        />
      )}
    </View>
  );
};

export default TodoScreen;

