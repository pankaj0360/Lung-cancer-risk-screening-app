import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDashboardStats } from '../api/dashboardApi';
import { getDoctorsApi } from '../api/doctorApi';
import { getQuestions } from '../api/questionApi';
const AdminDashboardScreen = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = React.useState(true);
  const [totalUsers, setTotalUsers] = React.useState(0);
  const [totalDoctors, setTotalDoctors] = React.useState(0);
  const [totalQuestions, setTotalQuestions] = React.useState(0);
  useEffect(() => {
    loadCounts();
  }, []);
  const loadCounts = async () => {
    try {
      setLoading(true);

      const [stats, doctors, questions] = await Promise.all([
        getDashboardStats(),
        getDoctorsApi(),
        getQuestions(),
      ]);

      // 👤 USERS
      setTotalUsers(stats?.totalUsers || 0);

      // 👨‍⚕️ DOCTORS
      setTotalDoctors(doctors?.length || doctors?.totalElements || 0);

      // ❓ QUESTIONS
      setTotalQuestions(questions?.length || questions?.totalElements || 0);
    } catch (e) {
      console.log('Dashboard Error:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0B4F8A" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome Admin 👋</Text>
        <Text style={styles.headerSub}>Lung Risk Screening Panel</Text>
      </View>

      {/* OVERVIEW */}
      <Text style={styles.section}>Overview</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalUsers}</Text>
          <Text style={styles.statLabel}>Patient</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalQuestions}</Text>
          <Text style={styles.statLabel}>Questions</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalDoctors}</Text>
          <Text style={styles.statLabel}>Doctors</Text>
        </View>

        {/* 🔥 NEW CARD */}
        <View style={[styles.statCard, { backgroundColor: '#17C6D1' }]}>
          <Text style={[styles.statNumber, { color: '#fff' }]}>📊</Text>
          <Text style={[styles.statLabel, { color: '#fff' }]}>Analytics</Text>
        </View>
      </View>

      {/* QUICK ACTIONS */}
      <Text style={styles.section}>Quick Actions</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => navigation.navigate('Questions')}
        >
          <Text style={styles.gridText}>📋 Manage Questions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => navigation.navigate('AddQuestion')}
        >
          <Text style={styles.gridText}>➕ Add Question</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => navigation.navigate('ManageDoctor')}
        >
          <Text style={styles.gridText}>👨‍⚕️ Manage Doctors</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => navigation.navigate('AddDoctor')}
        >
          <Text style={styles.gridText}>➕ Add Doctor</Text>
        </TouchableOpacity>

        {/* 🔥 ANALYTICS BUTTON */}
        <TouchableOpacity
          style={[styles.gridCard, { backgroundColor: '#17C6D1' }]}
          onPress={() => navigation.navigate('Analytics')}
        >
          <Text style={[styles.gridText, { color: '#fff' }]}>
            📊 View Analytics
          </Text>
        </TouchableOpacity>
      </View>

      {/* ACTIVITY */}
      <Text style={styles.section}>Recent Activity</Text>

      <View style={styles.activityCard}>
        <Text>• New question added</Text>
        <Text>• Doctor removed</Text>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logout}
        onPress={() => navigation.replace('Auth')}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdminDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },
  center: {
    flex: 1,
    backgroundColor: '#F4FBFF',
    padding: 20,
  },
  header: {
    backgroundColor: '#0B4F8A',
    padding: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  headerSub: {
    color: '#DDEEFF',
    marginTop: 5,
  },

  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },

  statCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  statLabel: {
    color: '#777',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },

  gridCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },

  gridText: {
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  activityCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
  },

  logout: {
    backgroundColor: '#E53935',
    margin: 20,
    padding: 14,
    borderRadius: 25,
  },

  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
