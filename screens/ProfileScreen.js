import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../constants/colors'
import avatars from '../constants/avatars';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [avatar, setAvatar] = useState(avatars[0].image.asset.url);
  const [fullName, setFullName] = useState('John Doe');
  const [address, setAddress] = useState('123 Street, City');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const navgiation = useNavigation();

  const handleEditPress = () => {
    setIsEditModalVisible(true);
  };

  const handleSave = () => {
    setIsEditModalVisible(false);
    // Save logic here
  };

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
          <MaterialIcons name="edit" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Avatar */}
        <TouchableOpacity style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="contain" />
        </TouchableOpacity>

        {/* Profile Information */}
        <Text style={styles.title}>Profile Information</Text>

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
        <TouchableOpacity style={styles.signOutButton} onPress={() => navgiation.navigate("Login")}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Editing Profile */}
      <Modal visible={isEditModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            {/* Full Name Input */}
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
            />

            {/* Address Input */}
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Address"
            />

            {/* Phone Number Input */}
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#f48c06',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
    fontWeight: 'bold',
    color: '#333',
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
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
});

export default ProfileScreen;
