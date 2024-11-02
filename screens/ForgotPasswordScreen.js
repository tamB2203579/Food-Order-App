import { Text, View, TouchableWithoutFeedback, Keyboard, Image, Dimensions, TouchableOpacity } from 'react-native'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import UserTextInput from '../components/UserTextInput';
import React, { useState } from 'react'


const ForgotPasswordScreen = ({navigation}) => {
  const screenWidth = Math.round(Dimensions.get("window").width);

  const [email, setEmail] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);
  const [emailSent, setEmailsent] = useState(false);

  const handleForgotPassword = async () => {
    try {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          {emailSent && setEmailsent(false)}; alert("Email sent! Check your email to reset your password.");
        })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="bg-white items-center justify-center flex-1 p-6">
          <Image
            source={require("../assets/password.png")}
            className="h-20 w-20 mb-5"
            resizeMode="contain"
          />

          <Text className="text-primaryText text-3xl font-semibold mb-2">Forgot your password?</Text>
          <Text className="text-gray-500 text-md mb-6">Enter your email so that we can send password link</Text>


          <View className="w-full flex items-center justify-center">

            {/* email */}
            <UserTextInput
              placeholder="Email"
              isPass={false}
              setStateValue={setEmail}
              setGetEmailValidationStatus={setGetEmailValidationStatus}
            />

            {/* Send Request */}
            <TouchableOpacity onPress={handleForgotPassword} className="w-full px-4 py-2 rounded-xl my-3 flex items-center justify-center bg-primary mt-6">
              <Text className="py-2 text-white text-xl font-semibold">Send Request</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} className="w-full px-4 py-2 rounded-xl my-2 flex items-center justify-center bg-white border border-primary">
              <Text className="py-2 text-primary text-xl font-semibold">Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
    </TouchableWithoutFeedback >
  )
}

export default ForgotPasswordScreen