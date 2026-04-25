import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import GuideScreen from '../screens/GuideScreen';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
//admin
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AddQuestionScreen from '../screens/AddQuestionScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
import EditQuestionScreen from '../screens/EditQuestionScreen';
//user
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RiskAssessmentScreen from '../screens/RiskAssessmentScreen';
import RiskResultScreen from '../screens/RiskResultScreen';
import AwarenessScreen from '../screens/AwarenessScreen';
import DoctorListScreen from '../screens/DocterListScreen';
import DoctorInfoScreen from '../screens/DoctorInfoScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import HealthSummaryScreen from '../screens/HealthSummaryScreen';
import AddDoctorScreen from '../screens/AddDoctorScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import PaymentScreen from '../screens/PaymentScreen';
import DoctorDetailScreen from '../screens/DoctorDetailScreen';
import EditDoctorScreen from '../screens/EditDoctorScreen';
import ManageDoctorScreen from '../screens/ManageDoctorScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AddQuestion" component={AddQuestionScreen} />
        <Stack.Screen name="Questions" component={QuestionsScreen} />
        <Stack.Screen name="EditQuestion" component={EditQuestionScreen} />
        <Stack.Screen name="AddDoctor" component={AddDoctorScreen} />
        <Stack.Screen name="ManageDoctor" component={ManageDoctorScreen} />
        <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
        <Stack.Screen name="EditDoctor" component={EditDoctorScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RiskAssessment" component={RiskAssessmentScreen} />
        <Stack.Screen name="RiskResult" component={RiskResultScreen} />
        <Stack.Screen name="Awareness" component={AwarenessScreen} />
        <Stack.Screen name="DoctorList" component={DoctorListScreen} />
        <Stack.Screen name="DoctorInfo" component={DoctorInfoScreen} />
        <Stack.Screen name="Appointment" component={AppointmentScreen} />
        <Stack.Screen name="HealthSummary" component={HealthSummaryScreen} />
        <Stack.Screen name='EditProfile' component= {EditProfileScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
