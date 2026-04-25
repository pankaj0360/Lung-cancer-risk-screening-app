// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import NavBack from '../components/NavBack';

// type Message = {
//   id: string;
//   text: string;
//   sender: 'user' | 'bot';
// };

// const ChatbotScreen = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       text: 'Hello 👋 I am your AI Health Assistant. Ask me about your symptoms.',
//       sender: 'bot',
//     },
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const flatListRef = useRef<FlatList>(null);
//   // 🔥 AI FUNCTION
//   const getAIResponse = async (userMessage: string) => {
//     setLoading(true);

//     try {
//       const prompt = `
//       You are a health and personal assistant.

//       User says: ${userMessage}

//       Give simple health advice if need .
//       Do not give dangerous or misleading info.
//       `;

//       const res = await fetch(
//         'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=AIzaSyDetPXYD3TGYe1-kY07HURG_rvirTfzdYY',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: prompt }] }],
//           }),
//         },
//       );

//       const data = await res.json();
//       const reply =
//         data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         'Sorry, I could not understand.';

//       setMessages(prev => [
//         ...prev,
//         {
//           id: Date.now().toString() + 'bot',
//           text: reply,
//           sender: 'bot',
//         },
//       ]);
//     } catch (e) {
//       setMessages(prev => [
//         ...prev,
//         {
//           id: Date.now().toString() + 'bot',
//           text: 'Something went wrong. Try again.',
//           sender: 'bot',
//         },
//       ]);
//     }

//     setLoading(false);
//   };

//   // 📤 SEND
//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMsg: Message = {
//       id: Date.now().toString(),
//       text: input,
//       sender: 'user',
//     };

//     setMessages(prev => [...prev, userMsg]);
//     setTimeout(() => {
//       flatListRef.current?.scrollToEnd({ animated: true });
//     }, 100);
//     setInput('');

//     await getAIResponse(input);
//   };

//   // 🎨 UI
//   const renderItem = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.msg,
//         item.sender === 'user' ? styles.userMsg : styles.botMsg,
//       ]}
//     >
//       <Text
//         style={[styles.msgText, item.sender === 'user' && { color: '#fff' }]}
//         numberOfLines={undefined}
//         ellipsizeMode="tail"
//       >
//         {item.text + ''}
//       </Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <NavBack />

//       <Text style={styles.header}>AI Health Assistant 🤖</Text>

//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ padding: 16 }}
//         onContentSizeChange={() =>
//           flatListRef.current?.scrollToEnd({ animated: true })
//         }
//       />

//       {loading && (
//         <View style={[styles.loader]}>
//           <ActivityIndicator size="small" color="#0B4F8A" />
//           <Text style={{ marginTop: 5 }}>Typing...</Text>
//         </View>
//       )}

//       {/* INPUT */}
//       <View style={styles.inputBox}>
//         <TextInput
//           placeholder="Ask about symptoms..."
//           value={input}
//           onChangeText={setInput}
//           style={styles.input}
//           multiline
//           placeholderTextColor={'#585858a9'}
//         />

//         <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
//           <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
//         </TouchableOpacity>
//       </View>

//       {/* DISCLAIMER */}
//       <Text style={styles.disclaimer}>
//         ⚠ AI advice is for informational purposes only.
//       </Text>
//     </KeyboardAvoidingView>
//   );
// };

// export default ChatbotScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4FBFF',
//   },

//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 10,
//     color: '#0B4F8A',
//   },

//   msg: {
//     padding: 12,
//     borderRadius: 14,
//     marginBottom: 10,
//     maxWidth: '80%',
//     flexShrink: 1,
//   },

//   userMsg: {
//     backgroundColor: '#0B4F8A',
//     alignSelf: 'flex-end',
//   },

//   botMsg: {
//     backgroundColor: '#E3F2FD',
//     alignSelf: 'flex-start',
//   },

//   msgText: {
//     fontSize: 14,
//     color: '#000',
//     flexWrap: 'wrap',
//   },

//   inputBox: {
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#fff',
//   },

//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//   },

//   sendBtn: {
//     backgroundColor: '#0B4F8A',
//     paddingHorizontal: 16,
//     justifyContent: 'center',
//     marginLeft: 8,
//     borderRadius: 20,
//   },

//   loader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     marginBottom: 5,
//   },

//   disclaimer: {
//     textAlign: 'center',
//     fontSize: 11,
//     color: '#888',
//     marginBottom: 6,
//   },
// });
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import NavBack from '../components/NavBack';
import { sendMessageApi } from '../api/chatApi';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

const ChatbotScreen = () => {

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello 👋 I am your AI Health Assistant. Ask me about your symptoms.',
      sender: 'bot',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // 🔥 API CALL (clean)
  const getAIResponse = async (userMessage: string) => {
    setLoading(true);

    try {
      const reply = await sendMessageApi(userMessage);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + 'bot',
          text: reply,
          sender: 'bot',
        },
      ]);

    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + 'bot',
          text: 'Something went wrong.',
          sender: 'bot',
        },
      ]);
    }

    setLoading(false);
  };

  // 📤 SEND
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    setInput('');

    await getAIResponse(input);
  };

  // 🎨 UI
  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.msg,
        item.sender === 'user' ? styles.userMsg : styles.botMsg,
      ]}
    >
      <Text
        style={[styles.msgText, item.sender === 'user' && { color: '#fff' }]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <NavBack />

      <Text style={styles.header}>AI Health Assistant 🤖</Text>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#0B4F8A" />
          <Text style={{ marginTop: 5 }}>Typing...</Text>
        </View>
      )}

      {/* INPUT */}
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Ask about symptoms..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
          multiline
          placeholderTextColor={'#585858a9'}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimer}>
        ⚠ AI advice is for informational purposes only.
      </Text>

    </KeyboardAvoidingView>
  );
};

export default ChatbotScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBFF',
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#0B4F8A',
  },

  msg: {
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    maxWidth: '80%',
    flexShrink: 1,
  },

  userMsg: {
    backgroundColor: '#0B4F8A',
    alignSelf: 'flex-end',
  },

  botMsg: {
    backgroundColor: '#E3F2FD',
    alignSelf: 'flex-start',
  },

  msgText: {
    fontSize: 14,
    color: '#000',
    flexWrap: 'wrap',
  },

  inputBox: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
  },

  sendBtn: {
    backgroundColor: '#0B4F8A',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 20,
  },

  loader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 5,
  },

  disclaimer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#888',
    marginBottom: 6,
  },
});