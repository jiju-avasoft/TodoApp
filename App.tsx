import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './Src/Routes/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserProvider} from './Src/Context/UserContext';
import {LocationProvider} from './Src/Context/LocationContext';
import {TodoProvider} from './Src/Context/TodoContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <UserProvider>
        <LocationProvider>
          <TodoProvider>
            <SafeAreaProvider>
              <Navigation />
            </SafeAreaProvider>
          </TodoProvider>
        </LocationProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
};

export default App;
