import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import NavBack from '../components/NavBack';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-toast-message';
import { getHealthSummary } from '../api/healthApi';
import { getQuestionsPatient } from '../api/questionApi';
import { mapAnswers } from '../utils/mapAnswers';
import { generatePDF } from '../utils/pdfGenerator';

const HealthSummaryScreen = () => {
  const navigation = useNavigation<any>();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const res = await getHealthSummary();

      if (res && res.length > 0) {
        // ✅ SORT → latest first
        const sorted = [...res].sort(
          (a, b) =>
            new Date(b.assessedAt).getTime() - new Date(a.assessedAt).getTime(),
        );

        const latest = sorted[0];

        setData({
          latest: {
            riskScore: Math.round(latest.percentage),
            riskLevel: latest.riskLevel,
            date: latest.assessedAt,
          },
          history: sorted,
        });
      } else {
        throw new Error('No data');
      }
    } catch (err) {
      console.log('Health Summary Error:', err);

      setData({
        latest: {
          riskScore: 0,
          riskLevel: 'LOW',
          date: 'N/A',
        },
        history: [],
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 PDF HANDLER
  const handlePDF = async () => {
    if (pdfLoading) return;

    setPdfLoading(true);
    try {
      // 👤 user
      const user = JSON.parse((await AsyncStorage.getItem('user')) || '{}');

      // 🧠 answers (id)
      const storedAnswers = JSON.parse(
        (await AsyncStorage.getItem('answers')) || '[]',
      );

      // 📋 questions
      const questions = await getQuestionsPatient();

      // 🔥 readable answers
      const readableAnswers = mapAnswers(storedAnswers, questions);

      // 📄 generate pdf
      await generatePDF(user, data.latest, readableAnswers);
      Toast.show({
        type: 'success',
        text1: 'Report Downloaded',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'PDF Generation Failed',
      });
      console.log('PDF Error:', err);
    } finally {
      setPdfLoading(false);
    }
  };

  // ⏳ LOADING
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0B4F8A" />
      </View>
    );
  }

  if (!data) return null;

  const { latest, history } = data;

  const level = latest.riskLevel?.toUpperCase();

  return (
    <ScrollView style={styles.container}>
      <NavBack />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Health Summary</Text>
        <Text style={styles.headerSub}>AI Powered Health Insights</Text>
      </View>

      {/* 🔥 LATEST RISK */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Latest Risk</Text>

        <View style={{ alignItems: 'center', marginVertical: 15 }}>
          <Progress.Circle
            size={120}
            progress={latest.riskScore / 100}
            showsText
            formatText={() => `${latest.riskScore}`}
            thickness={8}
            color={
              level === 'HIGH'
                ? '#D32F2F'
                : level === 'MEDIUM'
                ? '#F9A825'
                : '#2E7D32'
            }
          />
          <Text style={styles.scoreOut}>{latest.riskScore}/100</Text>
        </View>

        <Text style={styles.riskText}>
          Risk Level: <Text style={styles.riskLevel}>{latest.riskLevel}</Text>
        </Text>

        <Text style={styles.smallText}>
          {latest.date !== 'N/A' ? new Date(latest.date).toDateString() : 'N/A'}
        </Text>

        {/* 🔥 ACTION BUTTONS */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('RiskAssessment')}
        >
          <Text style={styles.btnText}>Recheck Risk</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.secondaryBtn, pdfLoading && styles.disabled]}
          onPress={handlePDF}
          disabled={pdfLoading}
        >
          {pdfLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.btnText}>Download Report</Text>
          )}
        </TouchableOpacity> */}
      </View>

      {/* 🔥 HISTORY */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>History</Text>

        {history.length === 0 ? (
          <Text>No history available</Text>
        ) : (
          history.map((item: any, index: number) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyDate}>
                {new Date(item.assessedAt).toDateString()}
              </Text>

              <Text style={styles.historyText}>
                {Math.round(item.percentage)}% ({item.riskLevel})
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default HealthSummaryScreen;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F6F9' },
  disabled: { opacity: 0.7 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    backgroundColor: '#17C6D1',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  headerSub: {
    fontSize: 13,
    color: '#E0F7FA',
    marginTop: 6,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 4,
    marginHorizontal: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B4F8A',
    marginBottom: 10,
  },

  scoreOut: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },

  riskText: {
    textAlign: 'center',
    fontSize: 14,
  },

  riskLevel: {
    fontWeight: 'bold',
    color: '#17C6D1',
  },

  smallText: {
    fontSize: 12,
    color: '#777',
    marginTop: 8,
    textAlign: 'center',
  },

  primaryBtn: {
    backgroundColor: '#0B4F8A',
    padding: 14,
    borderRadius: 14,
    marginTop: 14,
    alignItems: 'center',
  },

  secondaryBtn: {
    backgroundColor: '#17C6D1',
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  historyItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },

  historyDate: {
    fontSize: 12,
    color: '#777',
  },

  historyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
