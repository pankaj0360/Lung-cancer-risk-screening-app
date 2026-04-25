// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import NavBack from '../components/NavBack';
// import BookingSuccessModal from '../components/BookingSuccessModal';
// import { useNavigation } from '@react-navigation/native';

// const dates = [
//   { day: '9', label: 'MON' },
//   { day: '10', label: 'TUE' },
//   { day: '11', label: 'WED' },
//   { day: '12', label: 'THU' },
//   { day: '13', label: 'FRI' },
//   { day: '14', label: 'SAT' },
// ];

// const times = [
//   '09:00 AM',
//   '09:30 AM',
//   '10:00 AM',
//   '11:30 AM',
//   '01:00 PM',
//   '01:30 PM',
//   '02:30 PM',
//   '03:00 PM',
//   '04:00 PM',
// ];

// const AppointmentScreen = () => {
//   const [selectedDate, setSelectedDate] = useState('11');
//   const [selectedTime, setSelectedTime] = useState('10:00 AM');
//   const [gender, setGender] = useState('Female');

//   const [successVisible, setSuccessVisible] = useState<boolean>(false);
//   const navigation = useNavigation<any>();
//   return (
//     <View style={{ flex: 1, backgroundColor: '#F2F6F9' }}>
//       <NavBack />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Dr. Emma Hall, M.D.</Text>
//         <Text style={styles.headerSub}>Book Appointment</Text>
//       </View>

//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         {/* DATE */}
//         <Text style={styles.sectionTitle}>Upcoming Schedule</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {dates.map(d => (
//             <TouchableOpacity
//               key={d.day}
//               onPress={() => setSelectedDate(d.day)}
//               style={[
//                 styles.dateCard,
//                 selectedDate === d.day && styles.activeCard,
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.dateDay,
//                   selectedDate === d.day && styles.activeText,
//                 ]}
//               >
//                 {d.day}
//               </Text>
//               <Text
//                 style={[
//                   styles.dateLabel,
//                   selectedDate === d.day && styles.activeText,
//                 ]}
//               >
//                 {d.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* TIME */}
//         <Text style={styles.sectionTitle}>Available Time</Text>
//         <View style={styles.timeGrid}>
//           {times.map(time => (
//             <TouchableOpacity
//               key={time}
//               onPress={() => setSelectedTime(time)}
//               style={[
//                 styles.timePill,
//                 selectedTime === time && styles.activePill,
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.timeText,
//                   selectedTime === time && styles.activeText,
//                 ]}
//               >
//                 {time}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* PATIENT */}
//         <Text style={styles.sectionTitle}>Patient Details</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Full Name"
//           placeholderTextColor={'rgba(80, 80, 80, 0.77)'}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Age"
//           placeholderTextColor={'rgba(80, 80, 80, 0.77)'}
//           keyboardType="number-pad"
//         />

//         <View style={styles.genderRow}>
//           {['Male', 'Female', 'Other'].map(g => (
//             <TouchableOpacity
//               key={g}
//               onPress={() => setGender(g)}
//               style={[styles.genderBtn, gender === g && styles.activePill]}
//             >
//               <Text
//                 style={[styles.genderText, gender === g && styles.activeText]}
//               >
//                 {g}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <TextInput
//           style={[styles.input, { height: 100 }]}
//           placeholder="Describe your problem"
//           placeholderTextColor={'#646464'}
//           multiline
//         />

//         {/* CONFIRM */}
//         <TouchableOpacity
//           style={styles.confirmBtn}
//           onPress={() => setSuccessVisible(true)}
//         >
//           <Text style={styles.confirmText}>Book Appointment</Text>
//         </TouchableOpacity>
//       </ScrollView>
//       <BookingSuccessModal
//         visible={successVisible}
//         onClose={() => {
//           setSuccessVisible(false);
//           navigation.navigate('Home');
//         }}
//       />
//     </View>
//   );
// };

// export default AppointmentScreen;
// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#17C6D1',
//     paddingTop: 70,
//     paddingBottom: 25,
//     alignItems: 'center',
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   headerSub: {
//     fontSize: 14,
//     color: '#E0F7FA',
//     marginTop: 6,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginVertical: 12,
//     color: '#0B4F8A',
//   },
//   dateCard: {
//     backgroundColor: '#fff',
//     width: 70,
//     height: 90,
//     borderRadius: 14,
//     marginRight: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 2,
//   },
//   dateDay: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   dateLabel: {
//     fontSize: 12,
//     color: '#555',
//   },
//   timeGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   timePill: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     borderRadius: 20,
//     width: '30%',
//     marginBottom: 10,
//     alignItems: 'center',
//     elevation: 2,
//   },
//   timeText: {
//     fontSize: 13,
//     color: '#333',
//   },
//   activeCard: {
//     backgroundColor: '#17C6D1',
//   },
//   activePill: {
//     backgroundColor: '#17C6D1',
//   },
//   activeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 12,
//     color: '#333',
//   },
//   genderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   genderBtn: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     borderRadius: 20,
//     width: '30%',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   genderText: {
//     fontSize: 13,
//     color: '#333',
//   },
//   confirmBtn: {
//     backgroundColor: '#0B4F8A',
//     padding: 16,
//     borderRadius: 14,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   confirmText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NavBack from '../components/NavBack';
import { useRoute, useNavigation } from '@react-navigation/native';

const AppointmentScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const doctor = route.params?.doctor;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [showDOB, setShowDOB] = useState(false);
  const [dob, setDob] = useState(new Date());

  const [selectedSlot, setSelectedSlot] = useState('');
  const [gender, setGender] = useState('Male');

  const [name, setName] = useState('');
  const [problem, setProblem] = useState('');

  // 🔥 STATIC SLOTS (abhi ke liye)
  const slots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '01:30 PM',
    '02:30 PM',
    '03:00 PM',
  ];

  const handleBooking = () => {
    if (!name || !selectedSlot) {
      Alert.alert('Fill all details');
      return;
    }

    navigation.navigate('Payment', {
      amount: 500,
      doctor,
      date: selectedDate,
      slot: selectedSlot,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F4FBFF' }}>
      <NavBack />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>{doctor?.doctorName}</Text>
        <Text style={styles.sub}>Book Appointment</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* DATE */}
        <Text style={styles.section}>Select Date</Text>

        <TouchableOpacity
          style={styles.box}
          onPress={() => setShowCalendar(true)}
        >
          <Text>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>

        {showCalendar && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            minimumDate={new Date()}
            onChange={(e, date) => {
              setShowCalendar(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}

        {/* SLOTS */}
        <Text style={styles.section}>Available Slots</Text>

        <View style={styles.slotContainer}>
          {slots.map(slot => (
            <TouchableOpacity
              key={slot}
              style={[styles.slot, selectedSlot === slot && styles.activeSlot]}
              onPress={() => setSelectedSlot(slot)}
            >
              <Text
                style={{
                  color: selectedSlot === slot ? '#fff' : '#000',
                }}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PATIENT DETAILS */}
        <Text style={styles.section}>Patient Details</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#888"
        />

        {/* DOB */}
        <TouchableOpacity style={styles.box} onPress={() => setShowDOB(true)}>
          <Text>DOB: {dob.toDateString()}</Text>
        </TouchableOpacity>

        {showDOB && (
          <DateTimePicker
            value={dob}
            mode="date"
            onChange={(e, date) => {
              setShowDOB(false);
              if (date) setDob(date);
            }}
          />
        )}

        {/* GENDER */}
        <View style={styles.genderRow}>
          {['Male ', 'Female ', 'Other '].map(g => (
            <TouchableOpacity
              key={g}
              style={[styles.genderBtn, gender === g && styles.activeSlot]}
              onPress={() => setGender(g)}
            >
              <Text
                style={{
                  color: gender === g ? '#fff' : '#000',
                }}
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          placeholder="Describe Problem"
          value={problem}
          onChangeText={setProblem}
          style={[styles.input, { height: 80 }]}
          placeholderTextColor={'#6361618f'}
          multiline
        />

        {/* PAYMENT */}
        <View style={styles.paymentBox}>
          <Text style={styles.paymentText}>Consultation Fee</Text>
          <Text style={styles.amount}>₹500</Text>
        </View>

        {/* BOOK */}
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.btnText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#17C6D1',
    padding: 25,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sub: {
    color: '#E0F7FA',
    marginTop: 4,
  },

  section: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#0B4F8A',
  },

  box: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  slot: {
    backgroundColor: '#E3F2FD',
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },

  activeSlot: {
    backgroundColor: '#17C6D1',
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  genderBtn: {
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 20,
    width: '30%',
    alignItems: 'center',
  },

  paymentBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  paymentText: {
    fontSize: 14,
  },

  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B4F8A',
  },

  button: {
    backgroundColor: '#0B4F8A',
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
