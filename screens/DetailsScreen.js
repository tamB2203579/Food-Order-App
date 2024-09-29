import React, { useContext } from 'react';
import { SafeAreaView, Image, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import COLORS from '../constants/colors';
import { SecondaryButton } from '../components/Button';
import { CartContext } from '../components/CartContext';
import * as Animatable from 'react-native-animatable';

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;
  const {cartItems, addToCart, quantityCart, setQuantityCart, cartIconRef} = useContext(CartContext);

  const handleAddToCart = (food) => {
    setQuantityCart((prevQuantity) => prevQuantity + 1);
    const matchingItem = cartItems.find((item) => item.id === food.id);

    if(matchingItem) matchingItem.quantity++;
    else {
      addToCart({
        id: food.id,
        quantity: 1
      });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white,}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{marginLeft: 10}}/>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1}}>Details</Text>

        {/* shopping cart icon */}
        <Animatable.View ref={cartIconRef}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={style.container}
            >
              <View style={style.badgeContainer}>
                <Text style={style.badgeText}>{quantityCart}</Text>
              </View>
              <Icon name="shopping-cart" size={35} />
            </TouchableOpacity>
          </Animatable.View>

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

            <View>
                <Image source={item.rating}/>
            </View>
            
            {/* detail */}
            <Text style={style.detailsText}>{item.details}</Text>
            
            {/* button */}
            <View style={{marginTop: 40, marginBottom: 40 }}>
              <SecondaryButton title="Add To Cart" onPress={() => handleAddToCart(item)}/>
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
    borderRadius: 30,
  },
  detailsText:{
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  container: {
    position: 'relative',
    padding: 10,
    marginRight: 10
  },
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
});

export default DetailsScreen;
