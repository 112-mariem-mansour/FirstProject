import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import Button from "./components/Button";
import { useRef, useState } from 'react';
export default function App() {
  const [email,setmail]=useState("admin") ;
  const [password,setpassword]=useState("admin") ;
  const refinput2=useRef();
  return (
    <ImageBackground source={require('./assets/image2.png')} style={styles.container}>
      <Text style={styles.headerText}>Authentification</Text>
      <TextInput
            style={styles.inputBox}
            onChangeText={(text)=>{setmail(text)}}
            onSubmitEditing={()=>{refinput2.current.focus();}}
            placeholder={'Login'}
            keyboardType={'default'}
            blurOnSubmit={false}
          />
          <TextInput
            ref={refinput2}
            onChangeText={(text)=>{setpassword(text)}}
            style={styles.inputBox}
            placeholder={'password'}
            keyboardType={'default'}
            secureTextEntry={true}
            
          />
                   <Button
                onPress={() => {
                  if((email==="admin") &&(password==="admin")){
                    alert("c bn")
                  }else{
                    alert("error")
                  }
                }}>Sign in</Button>
                <TouchableOpacity style={{paddingRight:10 ,width:"100%",alignItems:"flex-end",}}><
                  Text  onPress={()=>{alert("create")}} style={{fontWeight:"bold", color : "white"}}>Create new user</Text>
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
