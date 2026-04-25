import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { registerUser } from '../api/authService';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const SignupScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const handleSignup = async () => {
    if (!name || !username || !email || !mobileNumber || !password) {
      Toast.show({
        type: 'info',
        text1: 'All Fields are required',
      });
      // Alert.alert('Error', 'All fields are required');
      return;
    }
    if (password.length < 7) {
      Toast.show({
        type: 'info',
        text1: 'Password must be at least 7 characters',
      });
      return;
    }
    if (mobileNumber.length < 10) {
      Toast.show({
        type: 'info',
        text1: 'Enter a valid mobile number',
      });
      return;
    }
    if (!email.includes('@')) {
      Toast.show({
        type: 'info',
        text1: 'Enter a valid email address',
      });
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const res = await registerUser({
        name,
        username,
        email,
        mobileNumber,
        password,
      });
      Toast.show({
        type: 'success',
        text1: 'Account created successfully',
      });

      navigation.navigate('Login'); // go login
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'username already exists or server error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="name"
        style={styles.input}
        value={name}
        onChangeText={setName}
        // keyboardType="username-address"
        placeholderTextColor={'#0000004b'}
      />
      <TextInput
        placeholder="username"
        style={styles.input}
        value={username}
        onChangeText={setUserName}
        // keyboardType="username-address"
        placeholderTextColor={'#0000004b'}
      />
      <TextInput
        placeholder="email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        // keyboardType="username-address"
        placeholderTextColor={'#0000004b'}
      />
      <TextInput
        placeholder="mobileNumber"
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        // keyboardType="username-address"
        placeholderTextColor={'#0000004b'}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        placeholderTextColor={'#0000004b'}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.btn, loading && styles.disabled]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.btnText}>SignUp</Text>
        )}
      </TouchableOpacity>
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text>Already have an account? </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#1E88E5', fontWeight: 'bold', marginTop: 5 }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.7,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E53935',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    width: '100%',
  },
  btn: {
    backgroundColor: '#E53935',
    padding: 14,
    borderRadius: 30,
    marginTop: 10,
    width: '100%',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
