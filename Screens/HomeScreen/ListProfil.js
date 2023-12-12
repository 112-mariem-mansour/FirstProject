import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons from Expo

import firebase from '../../Config';

const database = firebase.database();

const AllProfiles = () => {
  const currentid = firebase.auth().currentUser.uid;
  const [profiles, setProfiles] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilsSnapshot = await database.ref('profils').once('value');
        const profilsData = profilsSnapshot.val();

        if (profilsData) {
          const profilesArray = Object.keys(profilsData).map((key) => ({
            id: key,
            ...profilsData[key],
          }));
          setProfiles(profilesArray);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error.message);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfilePress = (profile) => {
    navigation.navigate('chat', { profile });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Profiles</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProfilePress(item)}>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Image source={{ uri: item.url }} style={styles.profileImage} />
                <Text style={styles.cardTitle}>{item.nom} {item.prenom}</Text>
                <Text>{item.tel}</Text>
                <TouchableOpacity onPress={() => handleProfilePress(item)}>
                  <Ionicons name="chatbox" size={24} color="#6200EE" />
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: 200, 
    marginRight: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,  
    height: 100,  
    borderRadius: 50,
    marginBottom: 10,
  },
  cardContent: {
    alignItems: 'center', // Center content inside the card
  },
});

export default AllProfiles;
