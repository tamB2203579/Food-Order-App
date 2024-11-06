import { View, Text, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { firebaseAuth, firestoreDB } from '../firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import UserTextInput from '../components/UserTextInput';

const InformationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = async () => {
    try {
      const user = firebaseAuth.currentUser;
      if (user) {
        const docRef = doc(firestoreDB, 'users', user.uid);
        await setDoc(docRef, {
          fullName: name,
          phoneNum: phone,
          address: address,
        }, { merge: true });
        navigation.navigate('HomeTab');
      }
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="w-full h-full bg-white flex items-center justify-center px-6 py-8 space-y-2">
        <Image
          source={require("../assets/logo.png")}
          className="h-16 w-16 mb-2"
          resizeMode="contain"
        />

        <Text className="text-primaryText text-2xl font-semibold mb-5">Please Enter Your Information!</Text>

        <View className="w-full flex items-center justify-center">
          <UserTextInput
            placeholder="Full Name"
            setStateValue={setName}
          />

          <UserTextInput
            placeholder="Phone Number"
            setStateValue={setPhone}
          />

          <UserTextInput
            placeholder="Address"
            setStateValue={setAddress}
          />

          <TouchableOpacity onPress={handleSave} className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center">
            <Text className="py-2 text-white text-xl font-semibold">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InformationScreen;