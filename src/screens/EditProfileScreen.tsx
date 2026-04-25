import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import NavBack from '../components/NavBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfileApi } from '../api/userApi';
// @ts-ignore
import Toast from 'react-native-toast-message';

const EditProfileScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const [user, setUser] = useState<any>(route.params?.user || {});
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setUser({ ...user, [key]: value });
  };

  // 🔥 UPDATE PROFILE
  const updateProfile = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await updateProfileApi(user);
      const { token, role, ...userData } = res;

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
      });

      navigation.goBack();
    } catch (error) {
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
      <NavBack />

      <Text style={styles.header}>Edit Profile</Text>

      <Input
        label="Full Name"
        value={user.name}
        onChange={(v: string) => handleChange('name', v)}
      />

      <Input
        label="Username"
        value={user.userName}
        onChange={() => {}}
        editable={false}
      />

      <Input
        label="Email"
        value={user.email}
        onChange={(v: string) => handleChange('email', v)}
      />

      <Input
        label="Date of Birth"
        value={user.dob}
        onChange={(v: string) => handleChange('dob', v)}
      />

      {/* 🔥 GENDER DROPDOWN */}
      <GenderDropdown
        value={user.gender}
        onChange={(v: string) => handleChange('gender', v)}
      />

      <Input
        label="Mobile Number"
        value={user.mobileNumber}
        onChange={(v: string) => handleChange('mobileNumber', v)}
      />

      <Input
        label="Address"
        value={user.address}
        onChange={(v: string) => handleChange('address', v)}
      />

      {/* 🔥 BUTTON */}
      <TouchableOpacity
        style={[styles.btn, loading && styles.disabled]}
        onPress={updateProfile}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Update Profile</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

/* 🔥 INPUT COMPONENT */
const Input = ({ label, value, onChange, editable = true }: any) => (
  <View style={styles.inputBox}>
    <Text style={styles.label}>{label}</Text>

    <TextInput
      value={value || ''}
      onChangeText={(text: string) => onChange(text)}
      style={[
        styles.input,
        !editable && { backgroundColor: '#eee', color: '#777' },
      ]}
      editable={editable}
      placeholder={`Enter ${label}`}
      placeholderTextColor="#999"
    />
  </View>
);

/* 🔥 GENDER DROPDOWN */
const GenderDropdown = ({ value, onChange }: any) => {
  const [open, setOpen] = useState(false);

  const options = ['Male', 'Female', 'Other'];

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>Gender</Text>

      <TouchableOpacity style={styles.input} onPress={() => setOpen(!open)}>
        <Text style={{ color: value ? '#000' : '#999' }}>
          {value || 'Select Gender'}
        </Text>
      </TouchableOpacity>

      {open &&
        options.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.dropdownItem}
            onPress={() => {
              onChange(item);
              setOpen(false);
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
    padding: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0B4F8A',
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

  dropdownItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 10,
    marginTop: 2,
    elevation: 2,
  },

  btn: {
    backgroundColor: '#0B4F8A',
    padding: 16,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },

  disabled: {
    opacity: 0.6,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
