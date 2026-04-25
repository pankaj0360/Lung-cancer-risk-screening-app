import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserRole } from '../utils/auth';
const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const role = user ? JSON.parse(user).roles?.[0] : null;
    setTimeout(() => {
      if (token) {
        const userRole = role;
        if (userRole === 'ROLE_ADMIN') {
          navigation.replace('AdminDashboard'); // ✅ already login
        } else {
          navigation.replace('Home'); // ✅ already login
        }
      } else {
        navigation.replace('Guide', { from: 'splash' }); // or Login
      }
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 380,
    height: 380,
  },
});

export default SplashScreen;
