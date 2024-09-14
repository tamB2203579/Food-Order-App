import React from 'react';
import { SafeAreaView, Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import COLORS from '../constants/colors';
import { SecondaryButton } from '../components/Button';

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white,}}
   
    >
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 280,
        }}>
          <Image source={item.image} style={{height: 220, width: 220}}/>
          </View>
          <View style = {style.details}>
            <View 
              style={{
                flexDirection: 'row', 
                justifyContent:"space-between", 
                alignItems:'center',
                }}>
                  {/* title */}
                  <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>{item.name}</Text>
                  {/* icon */}
                  <View style={style.iconContainer}>
                    <Icon name="favorite-border" color={COLORS.primary} size={25}/>
                  </View>
            </View>
            
            {/* detail */}
            <Text style={style.detailsText}>{item.details}</Text>
            
            {/* button */}
            <View style={{marginTop: 40, marginBottom: 40 }}>
              <SecondaryButton title="Add To Cart"/>
            </View>

          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10, 
  },
  details:{
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer:{
    backgroundColor: "white",
    height: 50,
    width: 50,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: '30',
  },
  detailsText:{
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  
});

export default DetailsScreen;
