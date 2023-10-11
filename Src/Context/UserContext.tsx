import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';

interface UserContextProviderProps {
  children: any;
}

interface UserContextType {
  userDetails: any;
  updateUser: (name: string) => void;
}

export const UserContext = createContext<UserContextType>({
  userDetails: '',
  updateUser: () => {},
});

const defaultValues = {
  email: '',
  firstName: '',
  gender: '',
  id: 0,
  image: '',
  lastName: '',
  token: '',
  username: '',
};

export const UserProvider: React.FC<UserContextProviderProps> = props => {
  const [userDetails, setUser] = useState<any>(defaultValues);

  useEffect(() => {
    const initialize = async () => {
      const userDetails = await AsyncStorage.getItem('UserDetails');
      if (userDetails) {
        setUser(JSON.parse(userDetails));
      }
    };

    initialize();
  }, []);

  const updateUser = async (user: any) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{userDetails, updateUser}}>
      {props.children}
    </UserContext.Provider>
  );
};
