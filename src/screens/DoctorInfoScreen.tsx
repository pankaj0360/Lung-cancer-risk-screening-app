import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import NavBack from '../components/NavBack';
import Doctors from '../utils/Doctor';

const DoctorInfoScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const doctorId = route?.params?.doctorId;
  const doctor = Doctors.find(d => d.id === doctorId);

  if (!doctor) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Doctor not found</Text>
      </SafeAreaView>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${doctor.hospitalPhone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBack />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* PREMIUM HEADER */}
        <LinearGradient
          colors={['#0F2027', '#203A43', '#2C5364']}
          style={styles.header}
        >
          <Image source={{ uri: doctor.image }} style={styles.avatar} />

          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>{doctor.doctorName}</Text>
            <Text style={styles.specialty}>{doctor.specialization}</Text>
          </View>

          <View style={styles.badgeRow}>
            <Text style={styles.badgeText}>🏥 {doctor.hospital}</Text>

            <Text style={styles.badgeText}>📍 {doctor.city}</Text>
          </View>
        </LinearGradient>

        {/* CONTENT */}
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hospital Contact</Text>
            <Text style={styles.cardText}>{doctor.hospitalPhone}</Text>

            <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
              <Text style={styles.btnText}>Call Hospital</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Experience</Text>
            <Text style={styles.cardText}>20+ Years in Pulmonology</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Professional Summary</Text>
            <Text style={styles.cardText}>
              {doctor.doctorName} is a leading specialist in respiratory
              medicine with extensive experience in lung diseases, pulmonary
              infections and advanced treatment protocols.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Source</Text>
            <Text style={styles.cardText}>{doctor.dataSource}</Text>
          </View>

          {/* <TouchableOpacity
            style={styles.bookBtn}
            onPress={() =>
              navigation.navigate('Appointment', {
                doctorId: doctor.id,
              })
            }
          >
            <Text style={styles.bookText}>Book Appointment</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorInfoScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 15,
  },

  headerTextContainer: {
    width: '100%',
    marginTop: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  specialty: {
    paddingVertical: 8,
    paddingHorizontal: 14,

    fontSize: 14,
    color: '#CFE8FF',
    marginTop: 4,
    marginBottom: 15,
    textAlign: 'center',
  },

  badgeRow: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  badgeText: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 8,
    marginRight: 5,
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0B4F8A',
  },

  cardText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },

  callBtn: {
    backgroundColor: '#17C6D1',
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  bookBtn: {
    backgroundColor: '#0B4F8A',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  bookText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
