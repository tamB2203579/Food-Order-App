import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, { useState } from 'react'
import UserTextInput from '../components/UserTextInput';
import { useNavigation } from '@react-navigation/native';
import avatars from '../constants/avatars';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firestoreDB } from '../firebase.config';
import { doc, setDoc } from 'firebase/firestore';

const SignupScreen = () => {

    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);

    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(avatars[0].image.asset.url);
    const [isAvatarMenu, setIsAvatarMenu] = useState(false);
    const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);

    const navigation = useNavigation();
    const handleAvatar = (item) => {
        setAvatar(item.image.asset.url);
        setIsAvatarMenu(false);
    }

    const handleSignUp = () => {
        if(getEmailValidationStatus && email.length!==""){
            createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then((cred) => {
                    const data = {
                        _id: cred.user.uid,
                        fullName: name,
                        profilePic: avatar,
                        phoneNum: phoneNum,
                        providerData: cred.user.providerData[0]
                    }

                    const docRef = doc(firestoreDB, 'users', cred.user.uid);
                    setDoc(docRef, data).then(() => {
                        navigation.navigate("Login");
                    });
                })
        }
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View className="flex-1 justify-start items-center">
        <Image 
        source={require("../assets/bg.png")}
        resizeMode="cover"
        className="h-96"
        style={{width: screenWidth}}/>

        {isAvatarMenu && (
            <>
                {/* list of avatars selection */}
                <View className="absolute inset-0 z-10" style={{width: screenWidth, height: screenHeight}}>
                    <ScrollView>
                        <BlurView 
                            className="w-full h-full px-4 py-16 flex-row flex-wrap items-center justify-evenly" 
                            tint="light" 
                            intensity={40}
                            style={{width: screenWidth, height: screenHeight}}
                        >
                            {avatars?.map((item) => {
                                return(                            
                                <TouchableOpacity onPress={() => handleAvatar(item)}
                                key={item._id} 
                                className="w-20 m-3 h-20 p-1 rounded-full border-2 border-primary relative">
                                    <Image source={{uri: item.image.asset.url}} 
                                    className="w-full h-full"
                                    resizeMode="contain"/>
                                </TouchableOpacity>);
                            })}
                        </BlurView>
                    </ScrollView>
                </View>
            </>
        )}

        {/* Main View */}
        <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6">
        {/* <Image 
        source={require("./images/logo.png")}
        className="h-16 w-16"
        resizeMode="contain"
        /> */}

        <Text className="text-primaryText text-xl font-semibold -mb-4">Join with us!</Text>

        {/* avatar section */}
        <View className="w-full flex items-center justify-center relative -mb-4">
            <TouchableOpacity onPress={() => setIsAvatarMenu(true)}
            className="w-20 m-1.5 h-20 p-1 rounded-full border-2 relative" style={{borderColor: "#f48c06"}}>
                <Image source={{uri: avatar}} className="w-full h-full" resizeMode="contain"/>
                <View className="w-6 h-6 bg-primary rounded-full absolute top-0 right-0 flex items-center justify-center">
                    <MaterialIcons name="edit" size={18} color="#fff"/>
                </View>
            </TouchableOpacity>
        </View>
        
        <View className="w-full flex items-center justify-center">
            {/* full name */}
            <UserTextInput 
            placeholder="Full name" 
            isPass={false} 
            setStateValue={setName}
            />

            {/* phone number */}
            <UserTextInput 
            placeholder="Phone number" 
            isPass={false} 
            setStateValue={setPhoneNum}
            />


            {/* email */}
            <UserTextInput 
            placeholder="Email" 
            isPass={false} 
            setStateValue={setEmail}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
            />


            {/* password */}
            <UserTextInput 
            placeholder="Password" 
            isPass={true} 
            setStateValue={setPassword}
            />


            {/* login button */}
            <TouchableOpacity onPress={handleSignUp} className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center">
            <Text className="py-2 text-white text-xl font-semibold">Sign Up</Text>
            </TouchableOpacity>

            <View className="py-8 flex-row items-center justìy-center space-x-2">
            <Text className="text-base text-primaryText">Have an account!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-base text-primaryBold" style={{fontWeight: "bold"}}>Login here</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
    )
}

export default SignupScreen