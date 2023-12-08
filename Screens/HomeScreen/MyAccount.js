import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import firebase from '../../Config';

const database = firebase.database();

const MyAccount = () => {
  const [nom, setNom] = useState('Mariem');
  const [isDefault, setIsDefault] = useState(true);
  const [urlImage, setUrlImage] = useState('');
  const [prenom, setPrenom] = useState('Mans');
  const [tel, setTel] = useState('+216 53 920 680');
  const auth = firebase.auth();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const currentid = user.uid;
        const profileSnapshot = await database.ref('profils').child(currentid).once('value');
        const profileData = profileSnapshot.val();
        if (profileData) {
          setNom(profileData.nom);
          setPrenom(profileData.prenom);
          setTel(profileData.tel);
        }
      }
    };

    fetchUserData();
  }, []); 

  const handleNameChange = (text) => {
    setNom(text);
  };

  const handleSurnameChange = (text) => {
    setPrenom(text);
  };

  const handleEmailChange = (text) => {
    setTel(text);
  };

  const uploadImageToFirebase = async (uriLocal, currentid) => {
    const blob = await imageToBlob(uriLocal);
    const storage = firebase.storage();
    const ref_mesimages = storage.ref('lesimages');
    const ref_image = ref_mesimages.child('image' + currentid + '.jpg');
  
    // Return a Promise that resolves when the upload is complete
    return new Promise((resolve, reject) => {
      ref_image.put(blob).then(() => {
        ref_image.getDownloadURL().then((url) => {
          resolve(url);
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  };
  
  const saveUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const currentid = user.uid;
        const url = await uploadImageToFirebase(urlImage, currentid);
        const ref_un_profile = database.ref('profils').child(currentid);
        ref_un_profile.set({
          nom: nom,
          prenom: prenom,
          tel: tel,
          url: url,
        });
        alert('User added');
      } else {
        alert('User not authenticated');
      }
    } catch (error) {
      alert('Error saving user data: ' + error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setIsDefault(false);
      setUrlImage(result.assets[0].uri);
    }
  };

  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    return blob;
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>

      <TouchableOpacity onPress={async () => await pickImage()}>
        <Image source={isDefault ? require('../../assets/User.png') : { uri: urlImage }} style={styles.userPhoto} />
      </TouchableOpacity>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Nom</Text>
          <TextInput value={nom} onChangeText={handleNameChange} style={styles.input} />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Prenom</Text>
          <TextInput value={prenom} onChangeText={handleSurnameChange} style={styles.input} />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>N°Tel</Text>
          <TextInput value={tel} onChangeText={handleEmailChange} style={styles.input} />
        </Card.Content>
      </Card>

      <Button
        style={styles.saveButton}
        onPress={async () => {
          await saveUserData().then((res) => alert('User added'));
        }}
      >
        Save
      </Button>
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
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  card: {
    width: '50%',
    marginBottom: 20,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    marginBottom: 10,
  },
  saveButton: {
    width: '30%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default MyAccount;
