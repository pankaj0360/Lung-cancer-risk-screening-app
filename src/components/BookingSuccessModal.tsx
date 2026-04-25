import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
type BookingSuccessModalProps = {
  visible: boolean;
  onClose: () => void;
};
const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {/* SUCCESS ICON */}
          <View style={styles.iconCircle}>
            <Text style={styles.check}>✓</Text>
          </View>

          {/* TEXT */}
          <Text style={styles.title}>Appointment Booked!</Text>
          <Text style={styles.subText}>
            Your appointment has been successfully scheduled.
          </Text>

          {/* BUTTON */}
          <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.btnText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BookingSuccessModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: '#17C6D1',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  check: {
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0B4F8A',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#0B4F8A',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
