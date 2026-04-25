// // import React, { useState, useRef, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Animated,
// //   Dimensions,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import NavBack from '../components/NavBack';
// // import { saveRiskAssessment } from '../api/riskApi';

// // const { width } = Dimensions.get('window');

// // type RiskLevel = 'Low Risk' | 'Medium Risk' | 'High Risk';

// // const questions = [
// //   {
// //     id: 1,
// //     question: 'Do you smoke?',
// //     options: [
// //       { label: 'Never smoked', value: 0 },
// //       { label: 'Occasionally (social smoker)', value: 2 },
// //       { label: 'Daily smoker', value: 4 },
// //     ],
// //   },
// //   {
// //     id: 2,
// //     question: 'For how many years have you been smoking?',
// //     options: [
// //       { label: 'I do not smoke', value: 0 },
// //       { label: 'Less than 5 years', value: 1 },
// //       { label: '5 to 10 years', value: 3 },
// //       { label: 'More than 10 years', value: 5 },
// //     ],
// //   },
// //   {
// //     id: 3,
// //     question: 'Are you frequently exposed to air pollution or dust?',
// //     options: [
// //       { label: 'No exposure', value: 0 },
// //       { label: 'Sometimes (traffic / city)', value: 2 },
// //       { label: 'Daily (industrial / construction)', value: 4 },
// //     ],
// //   },
// //   {
// //     id: 4,
// //     question: 'Do you have a history of lung-related diseases?',
// //     options: [
// //       { label: 'No history', value: 0 },
// //       { label: 'Asthma', value: 2 },
// //       { label: 'TB / COPD / Chronic infection', value: 4 },
// //     ],
// //   },
// //   {
// //     id: 5,
// //     question: 'Do you experience a persistent cough?',
// //     options: [
// //       { label: 'No', value: 0 },
// //       { label: 'Occasionally', value: 1 },
// //       { label: 'More than 3 weeks', value: 3 },
// //     ],
// //   },
// //   {
// //     id: 6,
// //     question: 'Have you experienced unexplained weight loss or fatigue?',
// //     options: [
// //       { label: 'No', value: 0 },
// //       { label: 'Mild fatigue', value: 1 },
// //       { label: 'Significant weight loss / weakness', value: 3 },
// //     ],
// //   },
// //   {
// //     id: 7,
// //     question: 'Do you have a family history of cancer?',
// //     options: [
// //       { label: 'No family history', value: 0 },
// //       { label: 'Other types of cancer', value: 1 },
// //       { label: 'Lung cancer in family', value: 3 },
// //     ],
// //   },
// // ];

// // const RiskAssessmentScreen = () => {
// //   const navigation = useNavigation<any>();
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [answers, setAnswers] = useState<{ [key: number]: number }>({});

// //   const fadeAnim = useRef(new Animated.Value(0)).current;
// //   const slideAnim = useRef(new Animated.Value(40)).current;
// //   const progressAnim = useRef(new Animated.Value(0)).current;

// //   const currentQuestion = questions[currentIndex];

// //   useEffect(() => {
// //     fadeAnim.setValue(0);
// //     slideAnim.setValue(40);

// //     Animated.parallel([
// //       Animated.timing(fadeAnim, {
// //         toValue: 1,
// //         duration: 400,
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(slideAnim, {
// //         toValue: 0,
// //         duration: 400,
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(progressAnim, {
// //         toValue: (currentIndex + 1) / questions.length,
// //         duration: 300,
// //         useNativeDriver: false,
// //       }),
// //     ]).start();
// //   }, [currentIndex]);

// //   const selectAnswer = (value: number) => {
// //     setAnswers({ ...answers, [currentQuestion.id]: value });
// //   };

// //   const next = () => {
// //     if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
// //   };

// //   const prev = () => {
// //     if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
// //   };

// //   const submit = async () => {
// //     const score = Object.values(answers).reduce((sum, val) => sum + val, 0);

// //     let level: RiskLevel = 'Low Risk';
// //     if (score >= 4 && score <= 6) level = 'Medium Risk';
// //     if (score > 6) level = 'High Risk';
// //     console.log(answers);
// //     // try {

// //     //   await saveRiskAssessment(score, level, answers);

// //     // } catch (error) {
// //     //   console.log('Backend not connected yet');
// //     // }
// //     navigation.replace('RiskResult', { score, level });
// //   };

// //   const isAnswered = answers[currentQuestion.id] !== undefined;
// //   const isLast = currentIndex === questions.length - 1;

// //   const progressWidth = progressAnim.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ['0%', '100%'],
// //   });

// //   return (
// //     <View style={styles.container}>
// //       <NavBack />
// //       <View style={styles.header}>
// //         <Text style={styles.title}>Risk Assessment</Text>
// //         <Text style={styles.subtitle} numberOfLines={0}>
// //           Answer the following questions to assess your lung health risk.
// //         </Text>
// //       </View>
// //       <View style={{ padding: 20 }}>
// //         {/* Progress */}
// //         <View style={styles.progressBg}>
// //           <Animated.View
// //             style={[styles.progressFill, { width: progressWidth }]}
// //           />
// //         </View>

// //         <Animated.View
// //           style={{
// //             opacity: fadeAnim,
// //             transform: [{ translateY: slideAnim }],
// //           }}
// //         >
// //           <Text style={styles.question}>{currentQuestion.question}</Text>

// //           {currentQuestion.options.map(option => (
// //             <TouchableOpacity
// //               key={option.label}
// //               style={[
// //                 styles.optionCard,
// //                 answers[currentQuestion.id] === option.value &&
// //                   styles.selectedCard,
// //               ]}
// //               onPress={() => selectAnswer(option.value)}
// //             >
// //               <Text style={styles.optionText}>{option.label}</Text>
// //             </TouchableOpacity>
// //           ))}
// //         </Animated.View>

// //         <View style={styles.navRow}>
// //           {currentIndex > 0 && (
// //             <TouchableOpacity style={styles.navBtn} onPress={prev}>
// //               <Text style={styles.navText}>Previous</Text>
// //             </TouchableOpacity>
// //           )}

// //           {!isLast ? (
// //             <TouchableOpacity
// //               style={[styles.navBtn, !isAnswered && styles.disabled]}
// //               onPress={next}
// //               disabled={!isAnswered}
// //             >
// //               <Text style={styles.navText}>Next</Text>
// //             </TouchableOpacity>
// //           ) : (
// //             <TouchableOpacity
// //               style={[styles.submitBtn, !isAnswered && styles.disabled]}
// //               onPress={submit}
// //               disabled={!isAnswered}
// //             >
// //               <Text style={styles.navText}>Submit</Text>
// //             </TouchableOpacity>
// //           )}
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };

// // export default RiskAssessmentScreen;
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F4FBFF',
// //   },
// //   header: {
// //     backgroundColor: '#17C6D1',
// //     alignItems: 'center',
// //     paddingTop: 25,
// //     borderBottomRightRadius: 20,
// //     borderBottomLeftRadius: 20,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#ffffffff',
// //     marginBottom: 6,
// //   },
// //   subtitle: {
// //     fontSize: 14,
// //     color: '#555',
// //     marginBottom: 20,
// //   },
// //   progressBg: {
// //     height: 8,
// //     backgroundColor: '#ddd',
// //     borderRadius: 10,
// //     marginTop: 55,
// //   },
// //   progressFill: {
// //     height: 8,
// //     backgroundColor: '#17C6D1',
// //     borderRadius: 10,
// //   },
// //   question: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 25,
// //   },
// //   optionCard: {
// //     backgroundColor: '#fff',
// //     padding: 18,
// //     borderRadius: 15,
// //     marginBottom: 15,
// //     elevation: 4,
// //   },
// //   selectedCard: {
// //     backgroundColor: '#17C6D1',
// //   },
// //   optionText: {
// //     fontSize: 16,
// //   },
// //   navRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 30,
// //   },
// //   navBtn: {
// //     backgroundColor: '#0B4F8A',
// //     padding: 14,
// //     borderRadius: 25,
// //     minWidth: 110,
// //     alignItems: 'center',
// //   },
// //   submitBtn: {
// //     backgroundColor: '#E53935',
// //     padding: 14,
// //     borderRadius: 25,
// //     minWidth: 110,
// //     alignItems: 'center',
// //   },
// //   navText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// //   disabled: {
// //     backgroundColor: '#aaa',
// //   },
// // });
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Animated,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import NavBack from '../components/NavBack';
// import { questionData } from '../utils/Questions.js';
// type RiskLevel = 'Low Risk' | 'Medium Risk' | 'High Risk';

// /* ---------------- JSON DATA ---------------- */

// /* -------- FLATTEN QUESTIONS -------- */

// const questions = questionData.flatMap(cat =>
//   cat.questions.map(q => ({
//     ...q,
//     category: cat.category,
//   })),
// );

// const RiskAssessmentScreen = () => {
//   const navigation = useNavigation<any>();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState<{ [key: number]: number }>({});

//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   const currentQuestion = questions[currentIndex];

//   useEffect(() => {
//     fadeAnim.setValue(0);

//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   }, [currentIndex]);

//   const selectAnswer = (value: number) => {
//     setAnswers({ ...answers, [currentQuestion.id]: value });
//   };

//   const next = () => {
//     if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
//   };

//   const prev = () => {
//     if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
//   };

//   const submit = () => {
//     const score = Object.values(answers).reduce((sum, val) => sum + val, 0);

//     let level: RiskLevel = 'Low Risk';

//     if (score >= 15 && score < 25) level = 'Medium Risk';
//     if (score >= 25) level = 'High Risk';

//     navigation.replace('RiskResult', { score, level });
//   };

//   const isAnswered = answers[currentQuestion.id] !== undefined;
//   const isLast = currentIndex === questions.length - 1;

//   return (
//     <View style={styles.container}>
//       <NavBack />

//       <View style={styles.header}>
//         <Text style={styles.title}>Risk Assessment</Text>
//         <Text style={styles.subtitle}>
//           Answer questions to evaluate lung cancer risk
//         </Text>
//       </View>

//       <View style={{ padding: 20 }}>
//         <Text style={styles.category}>{currentQuestion.category}</Text>

//         <Animated.View style={{ opacity: fadeAnim }}>
//           <Text style={styles.question}>{currentQuestion.question}</Text>

//           {currentQuestion.options.map(option => (
//             <TouchableOpacity
//               key={option.label}
//               style={[
//                 styles.optionCard,
//                 answers[currentQuestion.id] === option.value &&
//                   styles.selectedCard,
//               ]}
//               onPress={() => selectAnswer(option.value)}
//             >
//               <Text style={styles.optionText}>{option.label}</Text>
//             </TouchableOpacity>
//           ))}
//         </Animated.View>

//         <View style={styles.navRow}>
//           {currentIndex > 0 && (
//             <TouchableOpacity style={styles.navBtn} onPress={prev}>
//               <Text style={styles.navText}>Previous</Text>
//             </TouchableOpacity>
//           )}

//           {!isLast ? (
//             <TouchableOpacity
//               style={[styles.navBtn, !isAnswered && styles.disabled]}
//               onPress={next}
//               disabled={!isAnswered}
//             >
//               <Text style={styles.navText}>Next</Text>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               style={[styles.submitBtn, !isAnswered && styles.disabled]}
//               onPress={submit}
//               disabled={!isAnswered}
//             >
//               <Text style={styles.navText}>Submit</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };

// export default RiskAssessmentScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F4FBFF' },

//   header: {
//     backgroundColor: '#17C6D1',
//     alignItems: 'center',
//     paddingTop: 25,
//     paddingBottom: 20,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },

//   subtitle: {
//     fontSize: 14,
//     color: '#fff',
//   },

//   category: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: '#17C6D1',
//     marginBottom: 10,
//   },

//   question: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 25,
//   },

//   optionCard: {
//     backgroundColor: '#fff',
//     padding: 18,
//     borderRadius: 15,
//     marginBottom: 15,
//     elevation: 4,
//   },

//   selectedCard: {
//     backgroundColor: '#17C6D1',
//   },

//   optionText: {
//     fontSize: 16,
//   },

//   navRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 30,
//   },

//   navBtn: {
//     backgroundColor: '#0B4F8A',
//     padding: 14,
//     borderRadius: 25,
//     minWidth: 110,
//     alignItems: 'center',
//   },

//   submitBtn: {
//     backgroundColor: '#E53935',
//     padding: 14,
//     borderRadius: 25,
//     minWidth: 110,
//     alignItems: 'center',
//   },

//   navText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },

//   disabled: {
//     backgroundColor: '#aaa',
//   },
// });

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBack from '../components/NavBack';
import { getQuestionsPatient } from '../api/questionApi';
import { submitRisk } from '../api/riskAssess';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RiskAssessmentScreen = () => {
  const navigation = useNavigation<any>();

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 🔥 FETCH QUESTIONS
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getQuestionsPatient();

      setQuestions(data);
    } catch (e) {
      console.log('Server Error', e);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentIndex];

  // 🔥 animation
  useEffect(() => {
    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  // ✅ SELECT (optionId save होगा)
  const selectAnswer = (optionId: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    });
  };

  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // ✅ FINAL SUBMIT
  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    // 🔥 convert object → array
    const payload = Object.keys(answers).map(qId => ({
      questionId: Number(qId),
      optionId: answers[Number(qId)],
    }));
    await AsyncStorage.setItem('answers', JSON.stringify(payload));
    console.log('FINAL PAYLOAD:', payload);

    try {
      const data = await submitRisk(payload);

      // 🔥 backend response
      navigation.replace('RiskResult', {
        result: data,
      });
    } catch (e) {}
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#17C6D1" />
        <Text>Loading Questions...</Text>
      </View>
    );
  }

  if (!currentQuestion) return null;

  const isAnswered = answers[currentQuestion.id] !== undefined;
  const isLast = currentIndex === questions.length - 1;

  return (
    <View style={styles.container}>
      <NavBack />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Risk Assessment</Text>
        <Text style={styles.subtitle}>
          Answer questions to evaluate lung cancer risk
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={styles.category}>{currentQuestion.category}</Text>

        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.question}>{currentQuestion.questionText}</Text>

          {/* OPTIONS */}
          {currentQuestion.options.map((option: any) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                answers[currentQuestion.id] === option.id &&
                  styles.selectedCard,
              ]}
              onPress={() => selectAnswer(option.id)}
            >
              <Text style={styles.optionText}>{option.optionText}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* NAVIGATION */}
        <View style={styles.navRow}>
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.navBtn} onPress={prev}>
              <Text style={styles.navText}>Previous</Text>
            </TouchableOpacity>
          )}

          {!isLast ? (
            <TouchableOpacity
              style={[styles.navBtn, !isAnswered && styles.disabled]}
              onPress={next}
              disabled={!isAnswered}
            >
              <Text style={styles.navText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.submitBtn,
                (!isAnswered || submitting) && styles.disabled,
              ]}
              onPress={submit}
              disabled={!isAnswered || submitting}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.navText}>Submit</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default RiskAssessmentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FBFF' },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    backgroundColor: '#17C6D1',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    fontSize: 14,
    color: '#fff',
  },

  category: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#17C6D1',
    marginBottom: 10,
  },

  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  optionCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
  },

  selectedCard: {
    backgroundColor: '#17C6D1',
  },

  optionText: {
    fontSize: 16,
    color: '#000',
  },

  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  navBtn: {
    backgroundColor: '#0B4F8A',
    padding: 14,
    borderRadius: 25,
    minWidth: 110,
    alignItems: 'center',
  },

  submitBtn: {
    backgroundColor: '#E53935',
    padding: 14,
    borderRadius: 25,
    minWidth: 110,
    alignItems: 'center',
  },

  navText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  disabled: {
    backgroundColor: '#aaa',
  },
});
