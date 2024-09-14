import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import COLORS from '../constants/colors';
import foods from '../constants/foods';
import AntDesign from '@expo/vector-icons/AntDesign';

const CartScreen = () => {
  const CartCard = () => {
    return(
      <View style={styles.cartCard}>

      </View>
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
      renderItems={({item}) => <CartCard item={item}/>}
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
    alignItems: 'center'
  }
});

export default CartScreen;