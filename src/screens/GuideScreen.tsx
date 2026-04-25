import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavBack from '../components/NavBack';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Lung Cancer Awareness',
    text: 'Understand the importance of early detection and awareness.',
  },
  {
    id: '2',
    title: 'Risk Assessment',
    text: 'Answer simple questions to evaluate your lung cancer risk.',
  },
  {
    id: '3',
    title: 'Get Medical Guidance',
    text: 'Consult doctors if your risk level is medium or high.',
  },
];

const GuideScreen = () => {
  const navigation = useNavigation<any>();
  const [index, setIndex] = useState(0);
  const route = useRoute<any>();
  const fromHome = route.params?.from === 'home';

  return (
    <View style={styles.container}>
      {fromHome && <NavBack />}

      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const slideIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(slideIndex);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* IMAGE PLACEHOLDER */}
            <View style={styles.imageBox}>
              <Text style={styles.imageText}>🫁</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />

      {/* DOT INDICATOR */}
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, index === i && styles.activeDot]} />
        ))}
      </View>

      {/* BUTTON */}
      {index === slides.length - 1 && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            fromHome ? navigation.goBack() : navigation.replace('Auth')
          }
        >
          <Text style={styles.btnText}>
            {fromHome ? 'Back to Home' : 'Get Started'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GuideScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 30,
  },
  imageBox: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  imageText: {
    fontSize: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0B4F8A',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B0BEC5',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#0B4F8A',
  },
  btn: {
    backgroundColor: '#E53935',
    marginHorizontal: 40,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 30,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
