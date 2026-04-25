import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { updateDoctorApi } from '../api/doctorApi';
import Toast from 'react-native-toast-message';

const EditDoctorScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const doctor = route.params?.doctor;

  const [name, setName] = useState(doctor.doctorName);
  const [city, setCity] = useState(doctor.city);
  const [imageUrl, setImageUrl] = useState(doctor.imageUrl);

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await updateDoctorApi(doctor.id, {
        doctorName: name,
        city: city,
        imageUrl: imageUrl,
      });

      Toast.show({
        type: 'success',
        text1: 'Doctor Updated Successfully',
      });

      navigation.goBack();
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>Edit Doctor</Text>

      {/* IMAGE PREVIEW */}
      <View style={styles.imageBox}>
        <Image
          source={{
            uri: imageUrl || 'https://via.placeholder.com/150',
          }}
          style={styles.image}
        />
      </View>

      {/* IMAGE URL INPUT */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Enter Image URL"
        />
      </View>

      {/* NAME */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Doctor Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
        />
      </View>

      {/* CITY */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter city"
        />
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={[styles.btn, loading && styles.disabled]}
        onPress={handleUpdate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Update Doctor</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditDoctorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B4F8A',
    textAlign: 'center',
    marginBottom: 20,
  },

  imageBox: {
    alignItems: 'center',
    marginBottom: 20,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60, // 🔥 round image
    borderWidth: 3,
    borderColor: '#17C6D1',
  },

  inputBox: {
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    color: '#555',
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    elevation: 3,
  },

  btn: {
    backgroundColor: '#0B4F8A',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  disabled: {
    opacity: 0.6,
  },
});
