import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBack = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backBtn}
      activeOpacity={0.7}
    >
      <Text style={styles.backArrow}>←</Text>
    </TouchableOpacity>
  );
};

export default NavBack;

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: 20, // 🔼 PNG jaisa top spacing
    left: 16, // ⬅️ left aligned
    zIndex: 1000, // ⬆️ always on top
  },
  backArrow: {
    fontSize: 28, // PNG jaisa size
    color: '#FFFFFF', // header blue pe white
    fontWeight: 'bold',
  },
});
