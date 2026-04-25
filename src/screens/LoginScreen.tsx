import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/authService';
import { getUserRole } from '../utils/auth';

import Toast from 'react-native-toast-message';
const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'info',
        text1: 'All fields required',
      });
      return;
    }
    if (loading) return;
    setLoading(true);

    try {
      const res = await loginUser({
        username,
        password,
      });
      if (!res?.token) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
        });
        return;
      }
      // ✅ token save
      await AsyncStorage.setItem('token', res.token);
      const { token, ...userData } = res;

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('Login Response:', res.token);
      // const userRole = getUserRole(res.token);
      const userRole = res.roles?.[0];

      Toast.show({
        type: 'success',
        text1: 'Login successful',
      });
      console.log('User Role:', userRole);
      if (userRole === 'ROLE_ADMIN') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AdminDashboard' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }

      // if (username === 'user' && password === '1234') {

      //   Toast.show({
      //   type:'success',
      //   text1: 'Invalid username or password'
      // })
      // navigation.replace('Chatbot'); // go home
      // }
      // if (username === 'admin' && password === '1234') {
      //   navigation.replace('AdminDashboard'); // go home
      // }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Invalid username or password',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="username"
        style={styles.input}
        value={username}
        onChangeText={setEmail}
        placeholderTextColor={'#0000004b'}
        // keyboardType="username-address"
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
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size={'small'} color={'#ffff'} />
        ) : (
          <Text style={styles.btnText}>Log In</Text>
        )}
      </TouchableOpacity>
      <View style={{ marginTop: 20 }}>
        <Text>
          Don't have an account?
          <Text
            style={{ color: '#1E88E5', fontWeight: 'bold' }}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    color: '#0B4F8A',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    width: '100%',
    color: '#000',
  },
  btn: {
    backgroundColor: '#0B4F8A',
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
