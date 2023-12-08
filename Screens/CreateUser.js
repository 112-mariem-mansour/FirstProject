import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import Button from "../components/Button";
import { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from "../Config";
const auth=firebase.auth();
export default function CreateUser({navigation}) {
  const [email,setmail]=useState("admin") ;
  const [refinput2,setpassword]=useState("admin") ;
  const [refinput3,setpassword2]=useState("admin") ;

  
  return (
    <ImageBackground source={require('../assets/image2.png')} style={styles.container}>
      <Text style={styles.headerText}>Create User</Text>
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
            value={refinput2}
            onChangeText={(text)=>{setpassword(text)}}
            style={styles.inputBox}
            placeholder={'password'}
            keyboardType={'default'}
            secureTextEntry={true}
            
          />
           <TextInput
            value={refinput3}
            onChangeText={(text)=>{setpassword2(text)}}
            style={styles.inputBox}
            placeholder={'Confirme password'}
            keyboardType={'default'}
            secureTextEntry={true}
            
          />
                   <Button
                onPress={() => {
                    if(refinput2===refinput3){
                        auth.createUserWithEmailAndPassword(email,refinput2).then(()=>{
                          navigation.navigate("Accueil");})
                        .catch((err)=>alert(err))
                    }else{alert("password invalide ");}
                }}>Create</Button>
                 <Button
                onPress={() => {
                    navigation.goBack() ;
                }}>Annuler</Button>
                <TouchableOpacity style={{paddingRight:10 ,width:"100%",alignItems:"flex-end",}}><Text  onPress={()=>{alert("create")}} style={{fontWeight:"bold", color : "white"}}>Create new user</Text>
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
