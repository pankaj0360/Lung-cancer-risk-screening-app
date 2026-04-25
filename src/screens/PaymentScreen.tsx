import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import NavBack from '../components/NavBack';

const PaymentScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { amount, doctor, date, slot } = route.params;

  const handlePayment = () => {
    // 🔥 Fake payment success (demo ke liye)
    Alert.alert('Payment Success ✅', 'Appointment Confirmed!', [
      {
        text: 'OK',
        onPress: () => navigation.replace('Home'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <NavBack />

      <Text style={styles.title}>Payment</Text>

      {/* DETAILS */}
      <View style={styles.card}>
        <Text style={styles.label}>Doctor</Text>
        <Text style={styles.value}>{doctor?.doctorName}</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{new Date(date).toDateString()}</Text>

        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{slot}</Text>
      </View>

      {/* PAYMENT */}
      <View style={styles.card}>
        <Text style={styles.label}>Consultation Fee</Text>
        <Text style={styles.amount}>₹{amount}</Text>
      </View>

      {/* PAY BUTTON */}
      <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>

      <Text style={styles.note}>🔒 Secure Payment (Demo Mode)</Text>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0B4F8A',
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 4,
  },

  label: {
    fontSize: 13,
    color: '#777',
  },

  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  amount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#17C6D1',
  },

  payBtn: {
    backgroundColor: '#0B4F8A',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  payText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  note: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    color: '#777',
  },
});
