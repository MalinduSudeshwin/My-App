import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const SignOut = () => {
  const onLogout = () => {
    auth()
      .signOut()
      .then(response => {
        console.log('response :', response);
        Alert.alert('User signed out!');
        navigation.navigate('SignIn'); 
      })
      .catch(error => {
        console.log('error :', error);
        Alert.alert('Not able to logout!');
      });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters list goes here! You are free to come up with a design</Text>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
    marginTop: 60,
    width: 230,
  },
  logout: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FCAF03',
    padding: 12,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default SignOut;