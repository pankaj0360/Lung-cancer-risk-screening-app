// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';

// import { useRoute } from '@react-navigation/native';
// import NavBack from '../components/NavBack';

// const EditQuestionScreen = () => {
//   const route = useRoute<any>();

//   const questionData = route.params.question;

//   const [question, setQuestion] = useState(questionData.question);

//   const [options, setOptions] = useState([
//     { text: questionData.options[0], weight: '1' },
//     { text: questionData.options[1], weight: '2' },
//     { text: questionData.options[2], weight: '3' },
//   ]);

//   const handleOptionChange = (index: number, value: string) => {
//     const newOptions = [...options];
//     newOptions[index].text = value;
//     setOptions(newOptions);
//   };

//   const handleWeightChange = (index: number, value: string) => {
//     const newOptions = [...options];
//     newOptions[index].weight = value;
//     setOptions(newOptions);
//   };

//   const updateQuestion = () => {
//     console.log(question, options);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <NavBack />

//       <View style={styles.card}>
//         <Text style={styles.label}>Question</Text>

//         <TextInput
//           style={styles.input}
//           value={question}
//           onChangeText={setQuestion}
//         />
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.label}>Options</Text>

//         {options.map((opt, index) => (
//           <View key={index} style={styles.optionRow}>
//             <TextInput
//               style={styles.optionInput}
//               value={opt.text}
//               onChangeText={text => handleOptionChange(index, text)}
//             />

//             <TextInput
//               style={styles.weightInput}
//               value={opt.weight}
//               keyboardType="numeric"
//               onChangeText={text => handleWeightChange(index, text)}
//             />
//           </View>
//         ))}
//       </View>

//       <TouchableOpacity style={styles.updateBtn} onPress={updateQuestion}>
//         <Text style={styles.updateText}>Update Question</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default EditQuestionScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4FBFF',
//     padding: 20,
//   },

//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 16,
//     marginBottom: 20,
//     elevation: 4,
//   },

//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },

//   input: {
//     backgroundColor: '#F1F5F9',
//     padding: 14,
//     borderRadius: 10,
//   },

//   optionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },

//   optionInput: {
//     backgroundColor: '#F1F5F9',
//     padding: 12,
//     borderRadius: 10,
//     width: '70%',
//   },

//   weightInput: {
//     backgroundColor: '#F1F5F9',
//     padding: 12,
//     borderRadius: 10,
//     width: '25%',
//     textAlign: 'center',
//   },

//   updateBtn: {
//     backgroundColor: '#0B4F8A',
//     padding: 16,
//     borderRadius: 25,
//     alignItems: 'center',
//   },

//   updateText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import NavBack from '../components/NavBack';

// import { updateQuestionApi } from '../api/questionApi';

type OptionType = {
  label: string;
  value: number;
};

const EditQuestionScreen = () => {
  const route = useRoute<any>();

  const questionData = route.params.question;

  const [question, setQuestion] = useState<string>(questionData.question);

  const [options, setOptions] = useState<OptionType[]>(
    questionData.options.map((o: any) => ({
      label: o.label,
      value: o.value,
    })),
  );

  const handleOptionChange = (index: number, text: string) => {
    const updated = [...options];
    updated[index].label = text;
    setOptions(updated);
  };

  const handleWeightChange = (index: number, value: string) => {
    const updated = [...options];

    const num = Number(value);

    if (!isNaN(num)) {
      updated[index].value = num;
      setOptions(updated);
    }
  };

  const updateQuestion = async () => {
    const updatedData = {
      id: questionData.id,
      question,
      options,
    };

    console.log('Updated Question:', updatedData);

    /*
    // Future backend API

    try {
      await updateQuestionApi(updatedData);
      console.log("Question updated successfully");
    } catch (error) {
      console.log("API not connected yet");
    }
    */
  };

  return (
    <ScrollView style={styles.container}>
      <NavBack />

      {/* Question Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Question</Text>

        <TextInput
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
        />
      </View>

      {/* Options */}
      <View style={styles.card}>
        <Text style={styles.label}>Options</Text>

        {options.map((opt: OptionType, index: number) => (
          <View key={index} style={styles.optionRow}>
            <TextInput
              style={styles.optionInput}
              value={opt.label}
              placeholder="Option"
              onChangeText={text => handleOptionChange(index, text)}
            />

            <TextInput
              style={styles.weightInput}
              value={String(opt.value)}
              placeholder="Weight"
              keyboardType="numeric"
              onChangeText={text => handleWeightChange(index, text)}
            />
          </View>
        ))}
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateBtn} onPress={updateQuestion}>
        <Text style={styles.updateText}>Update Question</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
    padding: 20,
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

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
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

  updateBtn: {
    backgroundColor: '#0B4F8A',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },

  updateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
