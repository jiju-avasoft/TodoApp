import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Switch,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-gesture-handler';
import {TodoContext} from '../Context/TodoContext';
import {UserContext} from '../Context/UserContext';
import {getLatestId, updateTodoData} from '../Helpers/utils';
import notifee, {
  AndroidStyle,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

interface ComponentProps {
  onClose: () => void;
  todo: any;
}

const CreateTodoComponent: React.FC<ComponentProps> = props => {
  const [timer, setTimer] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [title, setTitle] = useState<string>(props.todo ? props.todo.todo : '');
  const [status, setStatus] = useState<boolean>(
    props.todo ? props.todo.completed : false,
  );
  const [error, setError] = useState<boolean>(false);

  const [reminderError, setReminderError] = useState<boolean>(false);
  const {addTodo, allTodos, updateTodo} = useContext(TodoContext);
  const {userDetails} = useContext(UserContext);

  useEffect(() => {
    if (props.todo) {
      setDate(new Date(props.todo.date));
    }
  }, [props.todo]);

  const validate = () => {
    if (!title.trim()) {
      return setError(true);
    } else if (!date) {
      return setReminderError(true);
    } else {
      setError(false);
      setReminderError(false);
      const noDate = new Date();
      noDate.setHours(noDate.getHours() + 2);
      const todoItem = {
        completed: status,
        date: date ? date.getTime() : noDate.getTime(),
        id: !props.todo
          ? getLatestId(
              allTodos.map(todo => {
                return todo.id;
              }),
            )
          : props.todo.id,
        todo: title,
        userId: userDetails.id,
      };

      if (!props.todo) {
        addTodo(todoItem);
        if (date) {
          scheduleReminder(todoItem, date);
        }
      } else {
        updateTodo(updateTodoData(todoItem, allTodos));
      }

      props.onClose();
    }
  };

  const scheduleReminder = async (todo: any, reminder: Date) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default',
      vibration: true,
    });

    const dateNow = new Date(reminder);
    reminder.setHours(11);
    reminder.setMinutes(10);

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

  return (
    <View style={{padding: 20}}>
      <View style={styles.header}>
        <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
          {props.todo ? 'Update Todo' : 'Create Todo'}
        </Text>
        <TouchableOpacity onPress={props.onClose}>
          <Text style={styles.text}>Close</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingVertical: 20}}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          value={title}
          style={{color: '#000', backgroundColor: '#D3D3D31A', marginTop: 10}}
          placeholder="Enter todo title"
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => setTitle(text)}
        />
        {error ? (
          <Text style={styles.errorText}>*please enter the title</Text>
        ) : (
          <></>
        )}
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>status</Text>
          <Switch
            trackColor={{false: '#767577', true: '#767577'}}
            thumbColor={status ? '#000000' : '#f4f3f4'}
            onValueChange={value => {
              setStatus(value);
            }}
            value={status}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>Set reminder</Text>
          {date ? (
            <Text style={styles.text}>
              {date?.toLocaleString().split(' ')[1].slice(0, 5) +
                ' ' +
                date?.toLocaleString().split(' ')[2]}
            </Text>
          ) : (
            <></>
          )}
          <Pressable
            onPress={() => {
              setTimer(true);
            }}
            style={styles.remindeButton}>
            <Text style={styles.boldText}>?</Text>
          </Pressable>
        </View>
        {reminderError ? (
          <Text style={styles.errorText}>*please select an eta</Text>
        ) : (
          <></>
        )}
        <TouchableOpacity onPress={validate} style={styles.submitButton}>
          <Text style={styles.boldText}>
            {props.todo ? 'Update' : 'Create'}
          </Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={timer}
        minimumDate={new Date()}
        date={date ? date : new Date()}
        onConfirm={date => {
          setDate(date);
        }}
        onCancel={() => {
          setTimer(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  remindeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  submitButton: {
    backgroundColor: 'red',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  boldText: {color: '#fff', fontWeight: '800'},
});

export default CreateTodoComponent;
