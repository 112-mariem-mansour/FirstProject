import { View, Text, TouchableOpacityBase, TouchableHighlightBase } from 'react-native'
import React from 'react'
import firebase from '../../Config'
const database=firebase.database();
export default function MyAccount() {
  return (
    <View>
      <Text>MyAccount</Text>
      <TouchableHighlight onPress={()=>{
        const ref_profils=database.ref("profils");
        const key =ref_profils.push().key;
        const ref_un_profil=ref_profils.child("profil"+key) ;
        ref_un_profil.set({
            nom:nom,
            prenom:prenom,
            numero:numero,
        })  }}></TouchableHighlight>
    </View>
  )
}