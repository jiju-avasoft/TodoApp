import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';

interface UserContextProviderProps {
  children: any;
}

interface UserContextType {
  userDetails: any;
  updateUser: (name: any) => void;
  updateUserImage: (image: string) => void;
}

export const UserContext = createContext<UserContextType>({
  userDetails: '',
  updateUser: () => {},
  updateUserImage: () => {},
});

export const defaultUserValues = {
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
  const [userDetails, setUser] = useState<any>(defaultUserValues);

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

  const updateUserImage = async (image: string) => {
    const clonedUser = {...userDetails};
    clonedUser.image = image;
    updateUser(clonedUser);
    await AsyncStorage.setItem('UserDetails', JSON.stringify(clonedUser));
  };

  return (
    <UserContext.Provider value={{userDetails, updateUser, updateUserImage}}>
      {props.children}
    </UserContext.Provider>
  );
};
