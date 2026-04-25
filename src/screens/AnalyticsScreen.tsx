import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { getDashboardStats } from '../api/dashboardApi';
import NavBack from '../components/NavBack';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getDashboardStats();
      setData(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0B4F8A" />
      </View>
    );
  }

  const pieData = [
    {
      name: 'Low',
      population: data.lowCount,
      color: '#2ECC71',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Medium',
      population: data.mediumCount,
      color: '#F39C12',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'High',
      population: data.highCount,
      color: '#E74C3C',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <NavBack />
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>User Risk Overview</Text>
      </View>

      {/* 🔥 STATS CARDS */}
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total</Text>
          <Text style={styles.cardValue}>{data.totalUsers}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#2ECC71' }]}>
          <Text style={styles.cardLabel}>Low</Text>
          <Text style={styles.cardValue}>{data.lowCount}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#F39C12' }]}>
          <Text style={styles.cardLabel}>Medium</Text>
          <Text style={styles.cardValue}>{data.mediumCount}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#E74C3C' }]}>
          <Text style={styles.cardLabel}>High</Text>
          <Text style={styles.cardValue}>{data.highCount}</Text>
        </View>
      </View>

      {/* 📊 PIE CHART */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Risk Distribution</Text>

        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={230}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
          chartConfig={{ color: () => '#000000' }}
        />
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },

  header: {
    backgroundColor: '#0B4F8A',
    padding: 25,
    paddingBottom: 35,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    color: '#DDEEFF',
    marginTop: 5,
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },

  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },

  card: {
    width: '48%',
    backgroundColor: '#0B4F8A',
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 5,
  },

  cardLabel: {
    color: '#fff',
    fontSize: 13,
  },

  cardValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },

  chartCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 20,
    elevation: 5,
  },

  chartTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0B4F8A',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
