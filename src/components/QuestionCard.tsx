import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const QuestionCard = ({ question, options, selected, onSelect }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>

      {options.map((opt: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={[styles.option, selected === opt.value && styles.selected]}
          onPress={() => onSelect(opt.value)}
        >
          <View style={styles.radio}>
            {selected === opt.value && <View style={styles.dot} />}
          </View>
          <Text style={styles.optionText} numberOfLines={0}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B4F8A',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0B4F8A',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E53935',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    flex: 1, // 👈 ALLOW FULL WIDTH
    flexWrap: 'wrap', // 👈 ALLOW TEXT WRAP
  },
  selected: {
    backgroundColor: '#F1F8FF',
    borderRadius: 10,
  },
});
