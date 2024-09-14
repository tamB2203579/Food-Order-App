import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import COLORS from '../constants/colors';
import foods from '../constants/foods';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PrimaryButton } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const CartCard = ({item}) => {
    return(
      <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9}> 
        <View style={styles.cartCard}>
          {/* food image */}
          <Image source={item.image} style={{width: 80, height: 80}}/>
          
          {/* food detail */}
          <View style={styles.detailsContainer}>
            {/* title */}
            <Text style={styles.itemName}>{item.name}</Text>
            {/* rating */}
            <Image source={item.rating} style={styles.ratingImage}/>
            {/* price */}
            <Text style={styles.itemPrice}>{item.price} VND</Text>
          </View>

          {/* quantity */}
          <View style={{marginRight: 20, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>3</Text>
            {/* button */}
            <View style={styles.addBtn}>
              <Ionicons name="remove" size={24} color={COLORS.white} />
              <Ionicons name="add" size={24} color={COLORS.white} />
            </View>
            
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={styles.header}>
        <AntDesign name="left" size={28} color="black" 
        // style={styles.backIcon}
        onPress={() => navigation.goBack()}/>
        <Text style={{fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Cart</Text>
      </View>
      <FlatList 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 80}}
      data={foods}
      renderItem={({item}) => <CartCard item={item}/>}
      
      ListFooterComponentStyle = {{paddingHorizontal: 20, marginTop: 15}}
      // total price
      ListFooterComponent={() => (
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
          }}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Total Price</Text>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>100,000 VND</Text>

          
          </View>
          <View style={{marginHorizontal: 30}}>
            <PrimaryButton title="Place order"/> 
          </View>
        </View>
      )}
      />
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 65,
    height: 16,
    resizeMode: 'contain',
    alignSelf: 'flex-start', 
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 17,
    color: "#555",
  },
  addBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});


export default CartScreen;