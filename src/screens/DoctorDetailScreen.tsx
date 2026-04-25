import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import NavBack from '../components/NavBack';
import { deleteDoctorApi } from '../api/doctorApi';
import Toast from 'react-native-toast-message';

const DoctorDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const doctor = route.params?.doctor;

  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    Alert.alert('Delete Doctor', 'Are you sure you want to delete?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          if (loading) return;

          setLoading(true);

          try {
            await deleteDoctorApi(doctor.id);

            // 🔥 SUCCESS TOAST
            Toast.show({
              type: 'success',
              text1: 'Doctor Deleted',
              text2: 'Doctor removed successfully',
            });

            navigation.goBack();
          } catch (e) {
            // 🔥 ERROR TOAST
            Toast.show({
              type: 'error',
              text1: 'Delete Failed',
              text2: 'Something went wrong',
            });
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <NavBack />

      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <Image
          source={{
            uri: doctor.imageUrl || 'https://via.placeholder.com/150',
          }}
          style={styles.image}
        />

        <Text style={styles.name}>{doctor.doctorName}</Text>
        <Text style={styles.spec}>{doctor.specialization} </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Available</Text>
        </View>
      </View>

      {/* 🔥 DETAILS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Doctor Details</Text>

        <Text style={styles.label}>🏥 Hospital</Text>
        <Text style={styles.value}>{doctor.hospitalName}</Text>

        <Text style={styles.label}>📍 City</Text>
        <Text style={styles.value}>{doctor.city}</Text>

        <Text style={styles.label}>💰 Fee</Text>
        <Text style={styles.value}>₹ {doctor.consultationFee}</Text>
      </View>

      {/* 🔥 EXTRA */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Additional Info</Text>

        <Text style={styles.label}>⭐ Experience</Text>
        <Text style={styles.value}>10+ Years</Text>

        <Text style={styles.label}>📅 Availability</Text>
        <Text style={styles.value}>Mon - Sat</Text>

        <Text style={styles.label}>🕒 Time</Text>
        <Text style={styles.value}>10:00 AM - 6:00 PM</Text>
      </View>

      {/* 🔥 BUTTONS */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate('EditDoctor', { doctor })}
      >
        <Text style={styles.btnText}>✏️ Edit Doctor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.deleteBtn, loading && styles.disabled]}
        onPress={handleDelete}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>🗑 Delete Doctor</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DoctorDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },

  header: {
    backgroundColor: '#17C6D1',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  spec: {
    color: '#E0F7FA',
    marginTop: 4,
  },

  badge: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },

  badgeText: {
    color: '#17C6D1',
    fontWeight: 'bold',
    fontSize: 12,
  },

  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 18,
    borderRadius: 16,
    elevation: 5,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#0B4F8A',
  },

  label: {
    fontSize: 13,
    color: '#777',
    marginTop: 8,
  },

  value: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },

  editBtn: {
    backgroundColor: '#0B4F8A',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },

  deleteBtn: {
    backgroundColor: '#E53935',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  disabled: {
    opacity: 0.6,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
