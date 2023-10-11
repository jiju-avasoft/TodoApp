import axios from 'axios';

export const loginUser = async () => {
  const body = JSON.stringify({
    username: 'kminchelle',
    password: '0lelplR',
  });
  const respone = await axios.post('https://dummyjson.com/auth/login', body, {
    headers: {'Content-Type': 'application/json'},
  });

  return respone;
};
