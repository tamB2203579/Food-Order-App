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
      <View className="flex-1 justify-start items-center">
        <Image
          source={require("../assets/bg.png")}
          resizeMode="cover"
          className="h-96"
          style={{ width: screenWidth }} />


        {/* Main View */}
        <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6">
          <Image
            source={require("../assets/password.png")}
            className="h-16 w-16"
            resizeMode="contain"
          />

          <Text className="text-primaryText text-xl font-semibold" style={{ marginBottom: -18 }}>Forgot your password?</Text>
          <Text className="text-gray-500 text-sm mb-2">Enter your email so that we can send password link</Text>


          <View className="w-full flex items-center justify-center">

            {/* email */}
            <UserTextInput
              placeholder="Email"
              isPass={false}
              setStateValue={setEmail}
              setGetEmailValidationStatus={setGetEmailValidationStatus}
            />

            {/* Send Request */}
            <TouchableOpacity onPress={handleForgotPassword} className="w-full px-4 py-2 rounded-xl my-3 flex items-center justify-center bg-primary mt-10">
              <Text className="py-2 text-white text-xl font-semibold">Send Request</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} className="w-full px-4 py-2 rounded-xl my-3 flex items-center justify-center bg-white border border-primary">
              <Text className="py-2 text-primary text-xl font-semibold">Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback >
  )
}

export default ForgotPasswordScreen