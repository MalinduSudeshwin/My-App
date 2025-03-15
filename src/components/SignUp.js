import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Import navigation

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(''); // State for password error

  const navigation = useNavigation(); // Initialize navigation

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Uppercase, number, and min 8 chars
    return passwordRegex.test(password);
  };

  const onRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, and one number.');
      return;
    } else {
      setPasswordError(''); // Clear the error message if password is valid
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User account created!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signup}>My App</Text>
      <TextInput
        placeholder="Name"
        style={styles.inputBox}
        value={name}
        onChangeText={value => setName(value)}
      />
      <TextInput
        placeholder="Email"
        style={styles.inputBox}
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <TextInput
        placeholder="Password"
        style={styles.inputBox}
        value={password}
        onChangeText={value => setPassword(value)}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null} {/* Display error message */}
      <TextInput
        placeholder="Confirm Password"
        style={styles.inputBox}
        value={confirmPassword}
        onChangeText={value => setConfirmPassword(value)}
        secureTextEntry
      />
      <TouchableOpacity onPress={onRegister} style={styles.register}>
        <Text style={styles.registerTitle}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={styles.signInText}>
          Have an account?{' '}
            <Text  onPress={() => navigation.navigate('SignIn')} style={{ fontWeight: 'bold', color: '#FCAF03' }}>Sign In</Text>
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
    marginTop: 20,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
  signInLink: {
    marginTop: 20,
  },
  signInText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    marginTop: 20,
  },
});

export default SignUp;
