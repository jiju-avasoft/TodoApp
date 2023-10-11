import axios from 'axios';

export const getTodos = async (userId: number) => {
  const respone = await axios.get('https://dummyjson.com/todos/user/'+userId, {
    headers: {'Content-Type': 'application/json'},
  });

  return respone;
};
