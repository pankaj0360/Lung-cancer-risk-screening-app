import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RiskResultScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  // 🔥 Backend result object
  const { result } = route.params;
  console.log(result);
  // 🔥 Extract values safely
  const percentage = result?.percentage || 0;
  const totalScore = result?.totalScore || 0;
  const maxScore = result?.maxScore || 100;
  const level = result?.riskLevel || 'LOW';
  const aiText =
    result?.aiRecommendation ===
    'AI service unavailable. Please consult a doctor.'
      ? 'We recommend consulting a specialist for better diagnosis.'
      : result?.aiRecommendation || 'No recommendation';

  // 🔥 Format level
  const formattedLevel =
    level === 'LOW'
      ? 'Low Risk'
      : level === 'MEDIUM'
      ? 'Medium Risk'
      : 'High Risk';

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    Animated.timing(progress, {
      toValue: percentage, // 🔥 animation based on %
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, []);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const getColor = () => {
    if (level === 'LOW') return '#2ECC71';
    if (level === 'MEDIUM') return '#F39C12';
    return '#E74C3C';
  };

  return (
    <LinearGradient
      colors={['#0F2027', '#203A43', '#2C5364']}
      style={styles.container}
    >
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        {/* 🔵 Circular Progress */}
        <View style={styles.circleWrapper}>
          <Svg width={220} height={220}>
            <G rotation="-90" origin="110,110">
              <Circle
                stroke="#2C3E50"
                fill="none"
                cx="110"
                cy="110"
                r={radius}
                strokeWidth="12"
              />

              <AnimatedCircle
                stroke={getColor()}
                fill="none"
                cx="110"
                cy="110"
                r={radius}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </G>
          </Svg>

          {/* CENTER TEXT */}
          <View style={styles.centerText}>
            <Text style={[styles.level, { color: getColor() }]}>
              {formattedLevel}
            </Text>

            <Text style={styles.score}>
              {totalScore} / {maxScore}
            </Text>

            <Text style={styles.percent}>{percentage.toFixed(1)}%</Text>
          </View>
        </View>

        {/* 🤖 AI RECOMMENDATION */}
        <View style={styles.suggestionBox}>
          <Text style={styles.suggestionTitle}>Health Recommendation</Text>

          <Text style={styles.message}>{aiText}</Text>
        </View>

        {/* 🔘 BUTTONS */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.replace('DoctorList')}
        >
          <Text style={styles.btnText}>Consult Specialist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.btnText}>Go Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

export default RiskResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
  },

  circleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerText: {
    position: 'absolute',
    alignItems: 'center',
  },

  level: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  score: {
    color: '#fff',
    marginTop: 6,
    fontSize: 16,
  },

  percent: {
    color: '#ccc',
    marginTop: 4,
    fontSize: 14,
  },

  suggestionBox: {
    marginTop: 30,
    marginBottom: 25,
  },

  suggestionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    textAlign: 'center',
  },

  message: {
    textAlign: 'center',
    color: '#EAEAEA',
    lineHeight: 22,
  },

  primaryBtn: {
    backgroundColor: '#0B4F8A',
    paddingVertical: 14,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },

  secondaryBtn: {
    backgroundColor: '#17C6D1',
    paddingVertical: 14,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
