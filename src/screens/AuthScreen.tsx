import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>
        Early detection can save lives. Please login or create an account.
      </Text>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      {/* Signup Button */}
      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FEFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
  },

  subtitle: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    marginBottom: 10,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#ec441ae1',
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 15,
    elevation: 3,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupBtn: {
    width: '80%',
    backgroundColor: '#dfdac2ff',
    paddingVertical: 14,
    borderRadius: 30,
  },
  signupText: {
    color: '#0D47A1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
