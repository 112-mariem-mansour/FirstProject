import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import from React Navigation
import firebase from '../../Config';

const database = firebase.database();

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const navigation = useNavigation(); // Access the navigation object

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilsSnapshot = await database.ref('profils').once('value');
        const profilsData = profilsSnapshot.val();

        if (profilsData) {
          // Convert the object of profiles into an array
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
    // Navigate to the chat screen and pass the selected profile
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
              <Card.Content>
                <Text style={styles.cardTitle}>{item.nom} {item.prenom}</Text>
                <Text>{item.tel}</Text>
                <Image source={{ uri: item.url }} style={styles.profileImage} />
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
    width: 200, // Ajustez la largeur selon vos besoins
    marginRight: 10, // Ajoutez un espace entre les cartes
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16, // Ajustez la taille de la police selon vos besoins
    marginBottom: 5,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 150, // Ajustez la largeur de l'image selon vos besoins
    height: 150, // Ajustez la hauteur de l'image selon vos besoins
    borderRadius: 75,
    marginBottom: 10,
  },
});

export default AllProfiles;
