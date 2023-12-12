import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import firebase from '../../Config';

const database = firebase.database();

const Chat = ({ route }) => {
  const { profile } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const chatRoomId = createChatRoomId(profile.id);

    const messagesRef = database.ref(`chats/${chatRoomId}/messages`);
    const typingRef = database.ref(`chats/${chatRoomId}/typing`);

    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
        setMessages(messagesArray);
      }
    });

    typingRef.on('value', (snapshot) => {
      const typingData = snapshot.val();
      setIsTyping(typingData && typingData.isTyping);
    });

    return () => {
      messagesRef.off('value');
      typingRef.off('value');
    };
  }, [profile]);

  const handleSend = () => {
    const userId = firebase.auth().currentUser.uid;

    if (userId === profile.id) {
      return;
    }

    const chatRoomId = createChatRoomId(profile.id);
    const newMessageRef = database.ref(`chats/${chatRoomId}/messages`).push();

    newMessageRef.set({
      text: newMessage,
      timestamp: Date.now(),
      from: userId,
    });

    setNewMessage('');

    // Update typing indicator
    database.ref(`chats/${chatRoomId}/typing`).set({ isTyping: false });
  };

  const handleTyping = () => {
    const chatRoomId = createChatRoomId(profile.id);
    database.ref(`chats/${chatRoomId}/typing`).set({ isTyping: true });

    // Set a timeout to stop typing indicator after some time
    setTimeout(() => {
      database.ref(`chats/${chatRoomId}/typing`).set({ isTyping: false });
    }, 3000); // You can adjust the duration as needed
  };

  const createChatRoomId = (otherUserId) => {
    const userId = firebase.auth().currentUser.uid;
    return userId < otherUserId ? `${userId}_${otherUserId}` : `${otherUserId}_${userId}`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View
            style={
              item.from === firebase.auth().currentUser.uid
                ? styles.myMessage
                : styles.otherMessage
            }
          >
            <Text
              style={{
                color: item.from === firebase.auth().currentUser.uid ? 'white' : 'black',
              }}
            >
              {item.text}
            </Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
      />
      {isTyping && <Text style={styles.typingIndicator}>Typing...</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={(text) => {
            setNewMessage(text);
            handleTyping();
          }}
          placeholder="Type your message..."
        />
        <Button onPress={handleSend} title="Send" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084FF',
    borderRadius: 20,
    padding: 12,
    marginVertical: 8,
    maxWidth: '70%',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#CCCCCC',
    borderRadius: 20,
    padding: 12,
    marginVertical: 8,
    maxWidth: '70%',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  timestamp: {
    fontSize: 12,
    color: 'grey',
    marginTop: 4,
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    color: 'grey',
    marginTop: 8,
  },
});

export default Chat;
