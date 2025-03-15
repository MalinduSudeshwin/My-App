import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        Alert.alert('Login successfully!');
        console.log('response :', response);
        navigation.navigate('SignOut'); 
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Password is not correct!');
        }
        console.log('error :', error);
      });
  };

  const onForgotPassword = () => {
    if (email === '') {
      Alert.alert('Please enter your email address');
      return;
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Password reset email sent!');
      })
      .catch((error) => {
        console.log('Error sending password reset email:', error);
        Alert.alert('Error', 'Could not send password reset email');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signup}>My App</Text>
      <TextInput
        placeholder="Email"
        style={styles.inputBox}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder="Password"
        style={styles.inputBox}
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
      />
      <TouchableOpacity onPress={onForgotPassword}>
        <Text style={styles.ForgotPassword}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogin} style={styles.register}>
        <Text style={styles.registerTitle}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.loginText}>
          Don't have an account?{' '}
          <Text style={{ fontWeight: 'bold', color: '#FCAF03' }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '90%',
    marginTop: 20,
  },
  register: {
    width: '90%',
    backgroundColor: '#FCAF03',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  registerTitle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  signup: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#000000',
    marginTop: 20,
  },

  ForgotPassword: {
    fontSize: 12,
    color: '#000000',
    marginTop: 10,
    marginLeft: 180,
  },
});

export default SignIn;
