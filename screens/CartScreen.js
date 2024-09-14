import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import COLORS from '../constants/colors';
import foods from '../constants/foods';
import AntDesign from '@expo/vector-icons/AntDesign';

const CartScreen = () => {
  const CartCard = ({item}) => {
    return(
      <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9}> 
        <View style={styles.cartCard}>
          <Image source={item.image} style={{width: 80, height: 80}}/>

          <View style={styles.detailsContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Image source={item.rating} style={styles.ratingImage}/>
            <Text style={styles.itemPrice}>{item.price} VND</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={styles.header}>
        <AntDesign name="left" size={28} color="black" />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
      </View>
      <FlatList 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 80}}
      data={foods}
      renderItem={({item}) => <CartCard item={item}/>}
      />
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },  
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.light,
    shadowOffset: { width: 5, height: 15 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  detailsContainer: {
    height: 100,
    marginLeft: 10,
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
  },
  ratingImage: {
    width: 60, 
    height: 16,
    resizeMode: 'contain',
    alignSelf: 'flex-start', 
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 17,
    color: "#555",
  },
});


export default CartScreen;