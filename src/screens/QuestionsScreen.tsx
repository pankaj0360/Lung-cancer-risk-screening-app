import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBack from '../components/NavBack';
import { getQuestions, deleteQuestionApi } from '../api/questionApi';

const QuestionsScreen = () => {
  const navigation = useNavigation<any>();

  const [categories, setCategories] = useState<any[]>([]);

  // 🔥 GROUP FUNCTION
  const groupByCategory = (data: any[]) => {
    const grouped: any = {};

    data.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }

      grouped[item.category].push({
        id: item.id,
        question: item.questionText,
        options: item.options.map((o: any) => ({
          id: o.id,
          label: o.optionText,
          value: o.score,
        })),
      });
    });

    // convert object → array
    return Object.keys(grouped).map(cat => ({
      category: cat,
      questions: grouped[cat],
    }));
  };

  // ================================
  // 🔥 FETCH FROM BACKEND
  // ================================
  const loadQuestions = async () => {
    try {
      const res = await getQuestions(); // axios

      const grouped = groupByCategory(res);

      setCategories(grouped);
    } catch (error) {
      console.log('API error', error);
    }
  };
  useEffect(() => {
    loadQuestions();
  }, []);

  // ================================
  // DELETE
  // ================================
  const deleteQuestion = (categoryIndex: number, questionId: number) => {
    Alert.alert('Delete Question', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteQuestionApi(questionId);
            loadQuestions();
          } catch (e) {
            Alert.alert('Delete failed');
          }
        },
      },
    ]);
  };

  // ================================
  // RENDER QUESTION
  // ================================
  const renderQuestion = (item: any, categoryIndex: number) => {
    return (
      <View style={styles.card}>
        <Text style={styles.questionText}>Q. {item.question}</Text>

        <Text style={styles.options}>
          Options: {item.options.map((o: any) => o.label).join(' / ')}
        </Text>

        <View style={styles.actions}>
          {/* <TouchableOpacity
            style={styles.editBtn}
            onPress={() =>
              navigation.navigate('EditQuestion', { question: item })
            }
          >
            <Text style={styles.editText}>Edit </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => deleteQuestion(categoryIndex, item.id)}
          >
            <Text style={styles.deleteText}>Delete </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // ================================
  // RENDER CATEGORY
  // ================================
  const renderCategory = ({ item, index }: any) => {
    return (
      <View style={styles.categorySection}>
        <Text style={styles.categoryTitle}>{item.category}</Text>

        {item.questions.map((q: any) => renderQuestion(q, index))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavBack />

      <View style={styles.header}>
        <Text style={styles.title}>Manage Questions</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCategory}
      />
    </View>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },

  header: {
    backgroundColor: '#17C6D1',
    alignItems: 'center',
    padding: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  categorySection: {
    paddingHorizontal: 15,
    marginTop: 20,
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0B4F8A',
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
  },

  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  options: {
    color: '#666',
    marginBottom: 10,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  editBtn: {
    backgroundColor: '#0B4F8A',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  editText: {
    color: '#fff',
  },

  deleteBtn: {
    backgroundColor: '#E53935',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  deleteText: {
    color: '#fff',
  },
});
