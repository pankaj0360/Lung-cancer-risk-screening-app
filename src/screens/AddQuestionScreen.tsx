import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import NavBack from '../components/NavBack';
import { addQuestionApi } from '../api/questionApi';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

type OptionType = {
  label: string;
  value: number;
};

const AddQuestionScreen = () => {
  const navigation = useNavigation<any>();

  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('SMOKING_HISTORY');

  const [options, setOptions] = useState<OptionType[]>([
    { label: '', value: 0 },
    { label: '', value: 0 },
    { label: '', value: 0 },
    { label: '', value: 0 },
  ]);

  // 🔥 OPTION TEXT CHANGE
  const handleOptionChange = (index: number, text: string) => {
    const updated = [...options];
    updated[index].label = text;
    setOptions(updated);
  };

  // 🔥 SCORE CHANGE
  const handleWeightChange = (index: number, value: string) => {
    const updated = [...options];
    const num = Number(value);

    if (!isNaN(num)) {
      updated[index].value = num;
      setOptions(updated);
    }
  };

  // 🔥 SAVE QUESTION
  const saveQuestion = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Enter question');
      return;
    }

    const filteredOptions = options.filter(o => o.label.trim() !== '');

    if (filteredOptions.length < 2) {
      Alert.alert('Error', 'Minimum 2 options required');
      return;
    }

    const maxScore = Math.max(...filteredOptions.map(o => o.value));

    const payload = {
      questionText: question,
      category: category,
      maxScore: maxScore,
      options: filteredOptions.map(opt => ({
        optionText: opt.label,
        score: opt.value,
      })),
    };

    try {
      await addQuestionApi(payload);

      Alert.alert('Success', 'Question Added Successfully');

      // reset form
      setQuestion('');
      setCategory('SMOKING_HISTORY');
      setOptions([
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
      ]);

      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to add question');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F4FBFF' }}>
      <NavBack />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Add New Question</Text>
      </View>

      <ScrollView style={styles.container}>
        {/* QUESTION */}
        <View style={styles.card}>
          <Text style={styles.label}>Question</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter question"
            value={question}
            onChangeText={setQuestion}
            placeholderTextColor={'#3b3b3bde'}
          />
        </View>

        {/* CATEGORY DROPDOWN 🔥 */}
        <View style={styles.card}>
          <Text style={styles.label}>Category</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={category}
              onValueChange={itemValue => setCategory(itemValue)}
            >
              <Picker.Item label="Smoking History" value="SMOKING_HISTORY" />
              <Picker.Item
                label="Environmental Exposure"
                value="ENVIRONMENTAL_EXPOSURE"
              />
              <Picker.Item label="Symptoms" value="SYMPTOMS" />
              <Picker.Item label="Medical History" value="MEDICAL_HISTORY" />
              <Picker.Item label="Lifestyle" value="LIFESTYLE" />
            </Picker>
          </View>
        </View>

        {/* OPTIONS */}
        <View style={styles.card}>
          <Text style={styles.label}>Options</Text>

          {options.map((opt, index) => (
            <View key={index} style={styles.optionRow}>
              <TextInput
                style={styles.optionInput}
                placeholder={`Option ${index + 1}`}
                value={opt.label}
                placeholderTextColor={'#464646b7'}
                onChangeText={text => handleOptionChange(index, text)}
              />

              <TextInput
                style={styles.weightInput}
                placeholder="Score"
                keyboardType="numeric"
                value={String(opt.value)}
                onChangeText={text => handleWeightChange(index, text)}
              />
            </View>
          ))}
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveBtn} onPress={saveQuestion}>
          <Text style={styles.saveText}>Save Question</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    backgroundColor: '#17C6D1',
    alignItems: 'center',
    padding: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#F1F5F9',
    padding: 14,
    borderRadius: 10,
  },

  pickerWrapper: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  optionInput: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 10,
    width: '70%',
  },

  weightInput: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 10,
    width: '25%',
    textAlign: 'center',
  },

  saveBtn: {
    backgroundColor: '#0B4F8A',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
