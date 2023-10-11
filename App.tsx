import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './Src/Routes/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserProvider} from './Src/Context/UserContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <UserProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
};

export default App;
