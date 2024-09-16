import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import foods from '../constants/foods';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PrimaryButton } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { CartContext } from '../components/CartContext';


const CartScreen = ({navigation}) => {
  const {cartItems} = useContext(CartContext);

  const CartCard = ({item}) => {
    const matchingProduct = cartItems.find((food) => food.id === item.id);
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
          {matchingProduct ? <Text style={{ fontWeight: 'black', fontSize: 18, marginBottom: 3 }}>{matchingProduct.quantity}</Text> : null}
            
            {/* button */}
            <View style={styles.quantityBtn}>
                <TouchableOpacity style={styles.removeBtn}>
                  <Ionicons name="remove" size={21} color={COLORS.primary} style={{marginRight: 3,}}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addBtn}>
                  <Ionicons name="add" size={21} color={COLORS.white}/>
                </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  return (
    <SafeAreaView style={{backgroundColor: COLORS.primary, flex: 1}}>
      <View style={styles.header}>
        <AntDesign name="left" size={28} color="black"
          style={styles.backIcon}
          onPress={navigation.goBack} />
        

        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1}}>Cart</Text>
        
        <View style={{width: 30}} />
      </View>


      <FlatList style={{backgroundColor: COLORS.white}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 80}}
      data={cartItems}
      renderItem={({item}) => {
        itemID = item.id;
        let matchingProduct;
        foods.forEach((food) => {
          if(food.id === itemID) 
            matchingProduct = food;
        })
        return <CartCard item ={matchingProduct}/>
      }}
      
      ListFooterComponentStyle = {{paddingHorizontal: 20, marginTop: 15, borderTopLeftRadius: 30, borderTopRightRadius: 30}}
      // total price
      ListFooterComponent={() => (
        <View>

          {/* substotal */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            marginBottom: 12
            }}>
            <Text style={{fontWeight: '485', fontSize: 17}}>Subtotal:</Text>
            <Text style={{fontWeight: '485', fontSize: 17}}>100,000 VND</Text>

          
          </View>

          {/* delivery fee */}
          <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 12,

            }}>
              <Text style={{fontWeight: '485', fontSize: 17}}>Delivery Fee:</Text>
              <Text style={{fontWeight: '485', fontSize: 17}}>15,000 VND</Text>

            
          </View>

          {/* Order Total */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 27,
          }}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Order Total:</Text>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>115,000 VND</Text>
          </View>

          <View style={{marginHorizontal: 30, marginBottom: 25}}>
            <PrimaryButton title="Place your order"/> 
          </View>
        </View>
      )}
      />
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    width: '100%'
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
    fontSize: 14,
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
  quantityBtn: {
    width: 90,
    height: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'space-around',
    alignItems: 'center'
  }, 
  removeBtn: {
    backgroundColor: COLORS.white,
    width: 49,
    height: 20,
    paddingHorizontal: 5,
    flexDirection: 'row',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    width: 49,
    height: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  backIcon: {
    marginLeft: 10
  }
});


export default CartScreen;