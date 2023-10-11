import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';
import {StaticLatLong} from '../constants/LatLong';

interface LocationContextProviderProps {
  children: any;
}

interface LocationContextType {
  locations: any[];
  updateLocations: (location: any) => void;
}

export const LocationContext = createContext<LocationContextType>({
  locations: [],
  updateLocations: () => {},
});

export const LocationProvider: React.FC<
  LocationContextProviderProps
> = props => {
  const [locations, setLocations] = useState<any[]>(StaticLatLong);

  const updateLocations = async (location: any) => {
    setLocations([...locations, location]);
  };

  return (
    <LocationContext.Provider value={{locations, updateLocations}}>
      {props.children}
    </LocationContext.Provider>
  );
};
