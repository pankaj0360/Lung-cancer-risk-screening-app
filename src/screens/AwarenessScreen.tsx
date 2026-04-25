import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import NavBack from '../components/NavBack';
const AwarenessScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F6F9' }}>
      {/* HEADER */}
      <NavBack />
      <View style={styles.topBanner}>
        <Text style={styles.bannerTitle}>Lung Cancer Awareness</Text>
        <Text style={styles.bannerSub}>
          Awareness • Prevention • Early Action
        </Text>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: '#EEF2F5' }}>
        {/* SYMPTOMS BOX */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Symptoms</Text>

          <View style={styles.row}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.text}>Persistent cough (2–3 weeks)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.text}>Chest pain while breathing</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.text}>Shortness of breath</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.text}>Wheezing sound</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.text}>Coughing blood</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.text}>Fatigue and weakness</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.text}>Unexplained weight loss</Text>
          </View>
        </View>

        {/* RISK FACTORS BOX */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Risk Factors</Text>

          <Text style={styles.text}>• Smoking and tobacco use</Text>
          <Text style={styles.text}>• Passive smoking</Text>
          <Text style={styles.text}>• Air pollution</Text>
          <Text style={styles.text}>• TB or asthma history</Text>
          <Text style={styles.text}>• Family history of cancer</Text>
        </View>

        {/* PREVENTION BOX */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Prevention Tips</Text>

          <Text style={styles.text}>✔ Quit smoking completely</Text>
          <Text style={styles.text}>✔ Avoid polluted environments</Text>
          <Text style={styles.text}>✔ Wear mask in high pollution areas</Text>
          <Text style={styles.text}>✔ Eat fruits & vegetables</Text>
          <Text style={styles.text}>✔ Exercise for lung health</Text>
          <Text style={styles.text}>✔ Regular medical checkups</Text>
        </View>

        {/* SUGGESTION BOX */}
        <View style={[styles.box, styles.highlightBox]}>
          <Text style={styles.boxTitle}>Doctor’s Suggestion</Text>
          <Text style={styles.text}>
            Do not ignore symptoms lasting more than a few weeks. High-risk
            individuals should consult a pulmonologist for early screening and
            better treatment outcomes.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topBanner: {
    backgroundColor: '#17C6D1',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bannerSub: {
    fontSize: 13,
    marginTop: 6,
    color: '#E3F2FD',
  },
  box: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
  },
  highlightBox: {
    borderLeftWidth: 5,
    borderLeftColor: '#2E7D32',
  },
  boxTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0D47A1',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    fontSize: 16,
    marginRight: 6,
  },
  text: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 6,
  },
});

export default AwarenessScreen;
