import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, ActivityIndicator, Dimensions, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../constants/colors'
import avatars from '../constants/avatars';
import { useNavigation } from '@react-navigation/native';
import { firebaseAuth, firestoreDB } from '../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const ProfileScreen = () => {
  const [avatar, setAvatar] = useState(avatars[0].image.asset.url);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAvatarMenu, setIsAvatarMenu] = useState(false);
  const [email, setEmail] = useState("");
  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = firebaseAuth.currentUser;
        if (user) {
          const docRef = doc(firestoreDB, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log(userData);
            setFullName(userData.fullName || '');
            setAvatar(userData.profilePic || avatars[0].image.asset.url);
            setPhoneNumber(userData.phoneNum || '');
            setAddress(userData.address || '');
            setEmail(userData.providerData.email || '');
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditPress = () => {
    setIsEditModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const user = firebaseAuth.currentUser;
      if (user) {
        const docRef = doc(firestoreDB, 'users', user.uid);
        await updateDoc(docRef, {
          fullName: fullName,
          address: address,
          phoneNum: phoneNumber,
          profilePic: avatar,
        });
      }

      setAvatar(avatar);
      setIsEditModalVisible(false);
    } catch (error) {
      alert('Error saving profile');
    }
  };

  const handleAvatar = (item) => {
    setAvatar(item.image.asset.url);
    setIsAvatarMenu(false);
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require("../assets/logo.png")} style={{width: 96, height: 96}}/>
        <ActivityIndicator size="large" color={COLORS.primary} style={{marginTop: 20}}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../assets/bg.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      />

      <View style={styles.profileContainer}>
        {/* Edit Button in top-right */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <MaterialIcons name="edit" size={36} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.avatarWrapper}>
            <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Profile Information */}
        <Text style={styles.title}>Profile Information</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.infoText}>{fullName}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.infoText}>{address}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.infoText}>{phoneNumber}</Text>
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => {
            signOut(firebaseAuth).then(() => {
              console.log("The user signed out");
            });
            navigation.navigate('Login')}}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Editing Profile */}
      <Modal visible={isEditModalVisible} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Profile</Text>

              {isAvatarMenu && (
                <>
                    {/* list of avatars selection */}
                    <View className="absolute inset-0 z-10" style={{width: screenWidth, height: screenHeight}}>
                        <ScrollView>
                            <BlurView 
                                // className="w-full h-full px-4 py-16 flex-row flex-wrap items-center justify-evenly" 
                                className="w-full h-full px-4 flex-row flex-wrap items-center justify-evenly" 
                                tint="light" 
                                intensity={40}
                                style={{width: screenWidth, height: screenHeight}}>

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

              {/* Avatar Selection */}
              <View style={styles.avatarContainer}>
                <TouchableOpacity
                onPress={() => setIsAvatarMenu(true)}
                style={styles.avatarWrapper}
                >
                  <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="contain" />
                  <View style={styles.iconAvatar}>
                    <MaterialIcons name="edit" size={18} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>

              {/* Full Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Full Name"
                />
              </View>

              {/* Address Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Address"
                />
              </View>

              {/* Phone Number Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Phone Number"
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
  },
  profileContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    marginTop: -50,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  avatarContainer: {
    width: '100%', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarWrapper: {
    width: 100,
    height: 100, 
    margin: 6,
    padding: 4, 
    borderRadius: 50, 
    borderWidth: 2,
    borderColor: '#f48c06',
    position: 'relative',
  },
  iconAvatar: {
    width: 24, 
    height: 24, 
    backgroundColor: COLORS.primary, 
    borderRadius: 12, 
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoContainer: {
    width: "90%",
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
  },
  label: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    textAlign: 'right',
  },
  signOutButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
  },
  signOutText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: "75%",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    margin: 0,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 20,
    width: '50%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 20,
    width: '50%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  editIconConainter: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSelection: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#f48c06',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  email: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.grey,
    marginBottom: 20,
  }
});

export default ProfileScreen;