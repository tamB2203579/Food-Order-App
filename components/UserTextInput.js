import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

const UserTextInput = ({placeholder, isPass, setStateValue, setGetEmailValidationStatus, setGetPasswordValidationStatus}) => {

    const [value, setValue] = useState("");
    const [showPass, setShowPass] = useState(true);
    const [icon, setIcon] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordlValid, setIsPasswordValid] = useState(false);

    const handleTextChanged = (text) => {
        setValue(text);
        setStateValue(text);

        if(placeholder === "Email"){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status = emailRegex.test(text);
            setIsEmailValid(status);
            setGetEmailValidationStatus(status);
        }

        if(placeholder === "Password"){
            if (text.length > 6) {
                setIsPasswordValid(true);
                setGetPasswordValidationStatus(true);
            } else {
                setIsPasswordValid(false);
                setGetPasswordValidationStatus(false);
            }
        }
    }

    useLayoutEffect(() => {
        switch(placeholder){
            case "Full Name": return setIcon("person");
            case "Email": return setIcon("email");
            case "Password": return setIcon("lock");
            case "Phone Number": return setIcon("phone");
        }
    },[]);

    return (
    <View className={`border rounded-2xl px-4 py-6 flex-row items-center justify-between space-x-4 my-2 ${!isEmailValid && placeholder === "Email" && value.length > 0 ? "border-red-500" : "border-gray-200"}
    ${!isPasswordlValid && placeholder === "Password" && value.length > 0 ? "border-red-500" : "border-gray-200"}`}>
        <MaterialIcons name={icon} size={24} color="#6c6d83"/>
        <TextInput className="flex-1 text-base text-primaryText font-semibold -mt-1"
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChanged}
        secureTextEntry={isPass && showPass}
        autoCapitalize='none'
        />

        {isPass && (    
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Entypo name={`${showPass ? "eye-with-line" : "eye"}`} size={24} color="#6c6d83 "/>
            </TouchableOpacity>
        )}
    </View>
    )
}

export default UserTextInput