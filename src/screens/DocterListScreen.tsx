import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import NavBack from '../components/NavBack';
import Doctors from '../utils/Doctor.js';
import { useNavigation } from '@react-navigation/native';
type Doctor = {
  id: string;
  doctorName: string;
  specialization: string;
  hospital: string;
  city: string;
  hospitalPhone: string;
  image: string | null;
  profileUrl: string;
  dataSource: string;
};
const doctorsData: Doctor[] = Doctors.map(doc => ({
  id: doc.id,
  doctorName: doc.doctorName,
  specialization: doc.specialization || '',
  hospital: doc.hospital || '',
  city: doc.city || '',
  hospitalPhone: doc.hospitalPhone || '',
  image: doc.image || null,
  profileUrl: doc.profileUrl || '',
  dataSource: doc.dataSource || '',
}));
const DoctorListScreen = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const filteredDoctors = doctorsData.filter(doc =>
    doc.doctorName.toLowerCase().includes(search.toLowerCase()),
  );

  const renderDoctor = ({ item }: { item: Doctor }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DoctorInfo', {
          doctorId: item.id,
        })
      }
    >
      <Image source={{ uri: item.image || '' }} style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.doctorName}</Text>
        <Text style={styles.specialty}>{item.specialization}</Text>

        <TouchableOpacity
          style={styles.infoBtn}
          onPress={e => {
            e.stopPropagation();
            navigation.navigate('DoctorInfo', { doctorId: item.id });
          }}
        >
          <Text style={styles.infoText}>Info</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <Text style={styles.icon}>📅</Text>
        <Text style={styles.icon}>❤️</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F6F9' }}>
      {/* HEADER */}
      <NavBack />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Pulmonology</Text>
          <Text style={styles.headerSub} numberOfLines={0}>
            Find Your Doctor
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            placeholder="Search doctor..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
        </View>
      </View>

      {/* SORT ROW */}
      <View style={styles.sortRow}>
        <Text style={styles.sortText}>Sort by A–Z</Text>
        <Text style={styles.filter}>Filter</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={item => item.id}
        renderItem={renderDoctor}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#17C6D1',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSub: {
    fontSize: 14,
    color: '#E0F7FA',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 14,
    height: 45,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },

  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sortText: {
    color: '#555',
  },
  filter: {
    color: '#17C6D1',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 3,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  infoBtn: {
    borderWidth: 1,
    borderColor: '#17C6D1',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  infoText: {
    color: '#17C6D1',
    fontSize: 12,
    width: 30,
    textAlign: 'center',
  },
  actions: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
});

export default DoctorListScreen;
