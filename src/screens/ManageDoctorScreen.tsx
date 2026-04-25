import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import NavBack from '../components/NavBack';
import { getDoctorsApi } from '../api/doctorApi';
import { useNavigation } from '@react-navigation/native';

const ManageDoctorScreen = () => {
  const navigation = useNavigation<any>();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const data = await getDoctorsApi();
      setDoctors(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDoctors();
    setRefreshing(false);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const openDoctor = (doctor: any) => {
    navigation.navigate('DoctorDetail', { doctor });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => openDoctor(item)}
    >
      {/* 🔥 ROUND IMAGE */}
      <Image
        source={{
          uri: item.imageUrl || 'https://via.placeholder.com/150',
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{item.doctorName}</Text>

        <Text style={styles.spec}>{item.specialization}</Text>

        <Text style={styles.hospital}>
          {item.hospitalName}, {item.city}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.fee}>₹ {item.consultationFee}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Available</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NavBack />

      {/* 🔥 HEADER */}
      <Text style={styles.header}>👨‍⚕️ Manage Doctors</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0B4F8A" />
      ) : doctors.length === 0 ? (
        <Text style={styles.empty}>No Doctors Found</Text>
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default ManageDoctorScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#0B4F8A',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 18,
    marginBottom: 14,

    // 🔥 premium shadow
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  // 🔥 ROUND IMAGE
  image: {
    width: 70,
    height: 70,
    borderRadius: 35, // 🔥 circle
    marginRight: 12,
  },

  info: {
    flex: 1,
    justifyContent: 'space-between',
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0B4F8A',
  },

  spec: {
    color: '#17C6D1',
    fontWeight: '600',
    marginTop: 2,
  },

  hospital: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },

  fee: {
    fontWeight: 'bold',
    color: '#0B4F8A',
  },

  badge: {
    backgroundColor: '#E3F7F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  badgeText: {
    color: '#17C6D1',
    fontSize: 11,
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
  },
});
