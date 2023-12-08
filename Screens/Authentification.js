import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import Button from "../components/Button";
import { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from '../Config';
export default function Authentification({navigation}) {
  const [email,setmail]=useState("") ;
  const [password,setpassword]=useState("") ;
  const refinput2=useRef();
  const auth=firebase.auth() ;
  
  return (
    <ImageBackground source={require('../assets/image2.png')} style={styles.container}>
      <Text style={styles.headerText}>Authentification</Text>
      <TextInput
            style={styles.inputBox}
            onChangeText={(text)=>{setmail(text)}}
            onSubmitEditing={()=>{refinput2.current.focus();}}
            placeholder={'Login'}
            keyboardType={'default'}
            blurOnSubmit={false}
            value={email}
          />
          <TextInput
            value={password}
            onChangeText={(text)=>{setpassword(text)}}
            style={styles.inputBox}
            placeholder={'password'}
            keyboardType={'default'}
            secureTextEntry={true}
            
          />
                   <Button
                onPress={() => {
                  auth.signInWithEmailAndPassword(email,password)
                  .then(()=>{const currentid=auth.currentUser.uid;
                    navigation.navigate("Accueil",{currentid})}).catch((err)=>{alert(err);})      
                  

                }}>Sign in</Button>
                <TouchableOpacity style={{paddingRight:10 ,width:"100%",alignItems:"flex-end",}}><
                  Text  onPress={()=>{navigation.navigate("CreateUser");}} style={{fontWeight:"bold", color : "white"}}>Create new user</Text>
                </TouchableOpacity>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputBox: {
    margin:17 ,
    height: 40,
    marginVertical: 24,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "#999999",
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },

});
