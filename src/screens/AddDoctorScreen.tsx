import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavBack from '../components/NavBack';
import { addDoctorApi } from '../api/doctorApi';
import { useNavigation } from '@react-navigation/native';
const AddDoctorScreen = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [city, setCity] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [fee, setFee] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigation = useNavigation<any>();
  const handleSave = async () => {
    if (!doctorName || !specialization || !hospitalName) {
      Alert.alert('Error', 'Please fill required fields');
      return;
    }

    const payload = {
      doctorName,
      specialization,
      hospitalName,
      city,
      contactNumber,
      consultationFee: Number(fee),
      imageUrl,
    };

    console.log('Doctor Payload:', payload);

    // 🔥 Future API
    await addDoctorApi(payload);

    Alert.alert('Success', 'Doctor Added');
    navigation.replace('AdminDashboard');
  };

  return (
    <View style={styles.container}>
      <NavBack />

      {/* HEADER */}
      <LinearGradient colors={['#0B4F8A', '#17C6D1']} style={styles.header}>
        <Text style={styles.title}>Add Doctor</Text>
        <Text style={styles.subtitle}>Create new doctor profile</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.body}>
        {/* IMAGE PREVIEW */}
        <View style={styles.imageCard}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Text style={{ color: '#888' }}>Image Preview</Text>
          )}
        </View>

        {/* FORM */}
        <View style={styles.card}>
          <Input
            label="Doctor Name"
            value={doctorName}
            onChange={setDoctorName}
          />
          <Input
            label="Specialization"
            value={specialization}
            onChange={setSpecialization}
          />
          <Input
            label="Hospital"
            value={hospitalName}
            onChange={setHospitalName}
          />
          <Input label="City" value={city} onChange={setCity} />
          <Input
            label="Contact Number"
            value={contactNumber}
            onChange={setContactNumber}
          />
          <Input
            label="Consultation Fee"
            value={fee}
            onChange={setFee}
            keyboard="numeric"
          />
          <Input label="Image URL" value={imageUrl} onChange={setImageUrl} />
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.btn} onPress={handleSave}>
          <Text style={styles.btnText}>Save Doctor</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddDoctorScreen;

// 🔥 REUSABLE INPUT COMPONENT
const Input = ({ label, value, onChange, keyboard = 'default' }: any) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      style={styles.input}
      keyboardType={keyboard}
      placeholder={`Enter ${label}`}
      placeholderTextColor="#888"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },

  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    color: '#E0F7FA',
    marginTop: 4,
  },

  body: {
    padding: 20,
  },

  imageCard: {
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#0B4F8A',
  },

  input: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 12,
  },

  btn: {
    backgroundColor: '#0B4F8A',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
