import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // 🔥 ADD

  useEffect(() => {
    loadUserFromStorage();
  }, [user]);

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        console.log('No user found');
      }
    } catch (error) {
      console.log('Error loading user:', error);
    } finally {
      setLoading(false); // 🔥 MOST IMPORTANT
    }
  };

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0B4F8A" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // 🔥 USER NOT FOUND → REDIRECT
  if (!user) {
    navigation.replace('Auth');
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0B4F8A" barStyle="light-content" />
      <ScrollView>
        {/* HEADER */}
        <LinearGradient colors={['#0B4F8A', '#17C6D1']} style={styles.header}>
          <Text style={styles.welcome}>Welcome Back</Text>

          {/* 🔥 Dynamic Name */}
          <Text style={styles.username}>{user.name}</Text>

          {/* HEALTH CARD */}
          <View style={styles.healthCard}>
            <Text style={styles.healthTitle}>Your Lung Health</Text>
            <Text style={styles.healthScore}>Risk Score: Medium</Text>

            <TouchableOpacity
              style={styles.healthBtn}
              onPress={() => navigation.navigate('RiskAssessment')}
            >
              <Text style={styles.healthBtnText}>Check Again</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* GRID */}
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('RiskAssessment')}
            >
              <Text style={styles.icon}>🧠</Text>
              <Text style={styles.gridTitle}>Risk Test</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('DoctorList')}
            >
              <Text style={styles.icon}>🏥</Text>
              <Text style={styles.gridTitle}>Find Doctor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Awareness')}
            >
              <Text style={styles.icon}>📘</Text>
              <Text style={styles.gridTitle}>Awareness</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('HealthSummary')}
            >
              <Text style={styles.icon}>📄</Text>
              <Text style={styles.gridTitle}>My Reports</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.gridCard, styles.aiCard]}
              onPress={() => navigation.navigate('Chatbot')}
            >
              <Text style={styles.icon}>🤖</Text>
              <Text style={[styles.gridTitle, styles.aiText]}>
                AI Assistant
              </Text>
            </TouchableOpacity>
          </View>

          {/* GUIDE CARD */}
          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => navigation.navigate('Guide', { from: 'home' })}
          >
            <Text style={styles.infoTitle}>Risk Factors Guide</Text>
            <Text style={styles.infoText}>
              Learn major causes like smoking, pollution and lung diseases
            </Text>
          </TouchableOpacity>

          {/* 🔥 PROFILE CARD (DYNAMIC) */}
          <TouchableOpacity
            style={styles.profileCard}
            onPress={() => navigation.navigate('Profile', { user })}
          >
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.name?.charAt(0)}</Text>
              </View>

              <View>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileLink}>View Profile →</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* FLOATING BUTTON */}
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => navigation.navigate('Chatbot')}
      >
        <Text style={{ color: '#fff', fontSize: 22 }}>🤖</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },

  header: {
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  welcome: {
    color: '#E3F2FD',
    fontSize: 14,
  },

  username: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  healthCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    elevation: 3,
  },

  healthTitle: {
    fontSize: 14,
    color: '#555',
  },

  healthScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B4F8A',
    marginTop: 4,
  },

  healthBtn: {
    marginTop: 10,
    backgroundColor: '#17C6D1',
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },

  healthBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  gridCard: {
    backgroundColor: '#fff',
    width: '47%',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
  },

  aiCard: {
    backgroundColor: '#0B4F8A',
  },

  icon: {
    fontSize: 28,
    marginBottom: 6,
  },

  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0B4F8A',
  },

  aiText: {
    color: '#fff',
  },

  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
    elevation: 5,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B4F8A',
  },

  infoText: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },

  profileCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    elevation: 5,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B4F8A',
  },

  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B4F8A',
  },

  profileLink: {
    fontSize: 13,
    color: '#555',
  },

  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0B4F8A',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});
