import React, { useEffect, useState } from 'react';
import SignOut from './src/components/SignOut';
import SignIn from './src/components/SignIn';
import auth from '@react-native-firebase/auth';
import SignUp from './src/components/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignOut" component={SignOut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;