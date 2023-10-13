import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import HeaderComponent from '../../Component/HeaderComponent';
import {getTodos} from '../../Services/TodoService';
import {UserContext} from '../../Context/UserContext';
import TodoListCard from '../../Component/TodoListCard';
import {TodoContext} from '../../Context/TodoContext';
import {useFocusEffect} from '@react-navigation/native';
import notifee, {
  AndroidStyle,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CreateTodoComponent from '../../Component/CreateTodoComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteTodoWithId} from '../../Helpers/utils';
import DeleteComponent from '../../Component/DeleteComponent';
import BottomSheetComponent from '../../Component/BottomSheetComponent';

const TodoScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {userDetails} = useContext(UserContext);
  const {allTodos, updateTodoWithId, updateTodo} = useContext(TodoContext);
  const [todo, setTodo] = useState<any>();
  const [ondelete, setOnDelete] = useState<number>();

  const bottomSheet = useRef<RBSheet>(null);
  const deleteSheet = useRef<RBSheet>(null);

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
      const previous = await AsyncStorage.getItem('todos');

      if (previous) {
        return updateTodo(JSON.parse(previous));
      } else {
        const modifiedTodo = todoData.data.todos.map((todo: any) => {
          const date = new Date();

          date.setMinutes(date.getMinutes() + 1);

          const modified = {...todo, ...{date: date.getTime()}};
          console.log('todo', modified);
          return modified;
        });
        await AsyncStorage.setItem('todos', JSON.stringify(modifiedTodo));
        updateTodo(modifiedTodo);
      }
    }
  };

  const onStatusChange = async (todo: any) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const date = new Date();

    date.setMinutes(date.getMinutes() + 1);

    console.log(date);

    const dateNow = new Date(date);
    date.setHours(11);
    date.setMinutes(10);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: dateNow.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: 'Todo',
        body: todo.todo,
        android: {
          channelId,
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture:
              'https://fastly.picsum.photos/id/321/200/300.jpg?grayscale&hmac=D5790v3-WRSsWA1tXPYvnlZQ-MMnOj25MTv-P5O5tQ4',
          },
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger,
    );
  };

  const onDeleteClicked = () => {
    if (ondelete) {
      updateTodo(deleteTodoWithId(ondelete, allTodos));
      deleteSheet.current?.close();
      setOnDelete(0);
    }
  };

  return (
    <View style={{flex: 1}}>
      <HeaderComponent
        title="Todos"
        isBackRequred={true}
        isGoRequired
        onPressBack={() => props.navigation.goBack()}
        onPressGo={() => {
          setTodo(undefined);
          bottomSheet?.current?.open();
        }}
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
      ) : allTodos.length == 0 ? (
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
          data={allTodos}
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
            return (
              <TodoListCard
                onPress={() => {
                  if (ondelete == item.id) {
                    deleteSheet?.current?.open();
                  } else {
                    setTodo(item);
                    setOnDelete(0);
                    bottomSheet?.current?.open();
                  }
                }}
                todo={item}
                onStatusChange={onStatusChange}
                onLongPress={() => {
                  if (ondelete == item.id) {
                    setOnDelete(0);
                  } else {
                    setOnDelete(item.id);
                  }
                }}
                deleteId={ondelete === item.id}
              />
            );
          }}
        />
      )}
      <RBSheet
        ref={bottomSheet}
        height={500}
        openDuration={50}
        closeDuration={50}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            elevation: 20,
          },
        }}
        animationType="slide">
        <CreateTodoComponent
          todo={todo}
          onClose={() => bottomSheet?.current?.close()}
        />
      </RBSheet>
      <RBSheet
        ref={deleteSheet}
        height={250}
        openDuration={50}
        closeDuration={50}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            elevation: 20,
          },
        }}
        animationType="slide">
        <DeleteComponent
          onConfirm={onDeleteClicked}
          onCancel={() => {
            setOnDelete(0);
            deleteSheet.current?.close();
          }}
        />
      </RBSheet>
    </View>
  );
};

export default TodoScreen;
