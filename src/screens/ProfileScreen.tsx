// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const ProfileScreen = () => {
//   const navigation = useNavigation<any>();
//   const token = AsyncStorage.getItem('token');
//   // ✅ Dummy user object (as if fetched from backend)
//   const user = {
//     name: 'Rahul Kumar',
//     email: 'rahul.kumar@gmail.com',
//     mobile: '********21',
//     role: 'Patient',
//     dob: '15 Aug 2001',
//     gender: 'Male',
//     address: 'Lucknow, Uttar Pradesh, India',
//     bloodGroup: 'B+',
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* 🔷 HEADER */}
//       <View style={styles.header}>
//         <View style={styles.avatar}>
//           <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
//         </View>
//         <Text style={styles.name}>{user.name}</Text>
//         <Text style={styles.role}>{user.role}</Text>
//       </View>

//       {/* 📄 DETAILS */}
//       <View style={styles.detailsCard}>
//         <Detail label="Email" value={user.email} />
//         <Detail label="Mobile Number" value={user.mobile} />
//         <Detail label="Date of Birth" value={user.dob} />
//         <Detail label="Gender" value={user.gender} />
//         <Detail label="Blood Group" value={user.bloodGroup} />
//         <Detail label="Address" value={user.address} />
//       </View>

//       {/* 🚪 LOGOUT */}
//       <TouchableOpacity
//         style={styles.logoutBtn}
//         onPress={async () => {
//           await AsyncStorage.removeItem('token');
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Auth' }],
//           });
//         }}
//       >
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// /* 🔹 Reusable row (simple, no component complexity) */
// const Detail = ({ label, value }: any) => (
//   <View style={styles.row}>
//     <Text style={styles.label}>{label}</Text>
//     <Text style={styles.value}>{value}</Text>
//   </View>
// );

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4FBFF',
//   },

//   /* 🔷 Header */
//   header: {
//     backgroundColor: '#0B4F8A', // lung blue
//     alignItems: 'center',
//     paddingVertical: 35,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     marginBottom: 25,
//   },

//   avatar: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: '#E3F2FD',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },

//   avatarText: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     color: '#0B4F8A',
//   },

//   name: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },

//   role: {
//     fontSize: 14,
//     color: '#CFE8FF',
//     marginTop: 4,
//   },

//   /* 📄 Details Card */
//   detailsCard: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 20,
//     borderRadius: 18,
//     padding: 20,
//     elevation: 5,
//   },

//   row: {
//     marginBottom: 15,
//   },

//   label: {
//     fontSize: 13,
//     color: '#777',
//     marginBottom: 2,
//   },

//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },

//   /* 🚪 Logout */
//   logoutBtn: {
//     backgroundColor: '#E53935', // cancer red
//     marginHorizontal: 20,
//     marginTop: 30,
//     paddingVertical: 14,
//     borderRadius: 30,
//   },

//   logoutText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // ✅ Data outside se aa raha hai
  const user = route.params?.user;

  if (!user) {
    return <Text style={{ marginTop: 50, textAlign: 'center' }}>No Data</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* 🔷 HEADER */}
      <View style={styles.header}>
        {/* ✏️ EDIT BUTTON */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('EditProfile', { user })}
        >
          <Text style={{ color: '#fff' }}>✏️ Edit </Text>
        </TouchableOpacity>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name?.charAt(0) || 'U'}</Text>
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.userName}</Text>
        {/* <Text style={styles.role}>{user.role}</Text> */}
      </View>

      {/* 📄 DETAILS */}
      <View style={styles.detailsCard}>
        <Detail label="Email" value={user.email} />
        <Detail label="Mobile" value={user.mobileNumber} />
        <Detail label="Date of Birth" value={user.dob} />
        <Detail label="Gender" value={user.gender} />
        <Detail label="Address" value={user.address} />
      </View>

      {/* 🚪 LOGOUT */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={async () => {
          await AsyncStorage.removeItem('token');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

/* 🔹 Reusable Detail Row */
const Detail = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || '-'}</Text>
  </View>
);

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },

  header: {
    backgroundColor: '#0B4F8A',
    alignItems: 'center',
    paddingVertical: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 25,
  },

  editBtn: {
    position: 'absolute',
    right: 20,
    top: 40,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  avatarText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#0B4F8A',
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  username: {
    color: '#CFE8FF',
    fontSize: 13,
  },

  role: {
    fontSize: 14,
    color: '#CFE8FF',
    marginTop: 4,
  },

  detailsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 20,
    elevation: 5,
  },

  row: {
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    color: '#777',
  },

  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  logoutBtn: {
    backgroundColor: '#E53935',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 30,
  },

  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
