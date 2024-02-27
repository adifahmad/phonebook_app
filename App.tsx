import React from 'react';
import { legacy_createStore, applyMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './src/reducers'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/components/TodoBox';
import AddForm from './src/components/AddForm';
import AvatarForm from './src/components/AvatarForm';

const Stack = createNativeStackNavigator();

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


const App = () => {
    return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen name="Add Form" component={AddForm} />
          <Stack.Screen name="Avatar Form" component={AvatarForm} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    );
  };

export default App
