import jwtDecode from 'jwt-decode';

export const getLatestId = (todos: number[]) => {
  if (todos.length == 0) {
    return 1;
  }
  const number = todos.sort((a, b) => b - a)[0] + 1;

  return number;
};

export const isTokenValid = (token: string) => {
  const decodedValue: any = jwtDecode(token);

  if (decodedValue) {
    if (new Date().getTime() > decodedValue.exp) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const updateTodoData = (todo: any, allTodo: any[]) => {
  const updatedData = allTodo.map(item => {
    if (item.id === todo.id) {
      return {
        ...item,
        todo: todo.todo,
        completed: todo.completed,
        date: todo.date,
      };
    }
    return item;
  });

  return updatedData;
};

export const deleteTodoWithId = (id: number, allTodo: any[]) => {
  const updatedData = allTodo.filter(item => {
    return item.id !== id;
  });

  return updatedData;
};
