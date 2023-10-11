import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';

interface TodoContextProviderProps {
  children: any;
}

interface TodoContextType {
  allTodos: any[];
  updateTodo: (todos: any[]) => void;
  updateTodoWithId: (todo: any) => void;
  addTodo: (todo: any) => void;
}

export const TodoContext = createContext<TodoContextType>({
  allTodos: [],
  updateTodo: () => {},
  updateTodoWithId: () => {},
  addTodo: () => {},
});

export const TodoProvider: React.FC<TodoContextProviderProps> = props => {
  const [allTodos, setAllTodos] = useState<any>([]);

  useEffect(() => {
    const initialize = async () => {
      const previousTodos = await AsyncStorage.getItem('Todos');
      if (previousTodos) {
        setAllTodos(JSON.parse(previousTodos));
      }
    };

    initialize();
  }, []);

  const updateTodo = async (todos: any[]) => {
    setAllTodos(todos);
  };

  const updateTodoWithId = async (todo: any) => {};

  const addTodo = async (todo: any) => {};

  return (
    <TodoContext.Provider
      value={{allTodos, updateTodo, updateTodoWithId, addTodo}}>
      {props.children}
    </TodoContext.Provider>
  );
};
