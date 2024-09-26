import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, StatusBar, TouchableOpacity, Modal } from 'react-native';
import COLORS from '../constants/colors';
import foods from '../constants/foods';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PrimaryButton } from '../components/Button';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../components/CartContext';
import numeral from 'numeral';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { firebaseAuth, firestoreDB } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';

const CartScreen = ({navigation}) => {
  const {setCartItems, cartItems, handleAdd, handleRemove, subTotal, total, shippingFee, setQuantityCart} = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [deliveryType, setDeliveryType] = useState('Delivery Now');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [userData, setUserData] = useState({});

  //Fetch user information from Firestore
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
            setUserData({
              fullName: userData.fullName || '',
              email: userData.providerData.email || '',
              phoneNumber: userData.phoneNum || ''
            });
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handlePlaceOrder = async () => {
    if (cartItems.length > 0) {
      const orderDetails = {
        user: userData,
        total: total
      };
      
      try {
        await pushOrderToMySQL(orderDetails);
        alert("Order placed successfully!");
        setCartItems([]);
        setQuantityCart(0);
        navigation.navigate('Delivery');
      } catch (error) {
        console.error('Error placing order:', error);
        alert("Failed to place order. Please try again.");
      }
    } else {
      alert("Your cart is empty");
    }
  };

  const pushOrderToMySQL = async (orderDetails) => {
    const response = await fetch('http://192.168.2.97:3000/items', { //place the IPV4 address
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });
    
    if (!response.ok) {
      throw new Error('Failed to place order');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || deliveryDate;
      setDeliveryDate(currentDate);
    }
  };

  const handleOkPress = () => {
    setShowDatePicker(false);
    const formattedDate = deliveryDate.toLocaleString(); // Định dạng ngày tháng
    setDeliveryType(`Schedule Delivery\n${formattedDate}`); // Cập nhật deliveryType với ngày tháng
    setModalVisible(false); // Ẩn modal sau khi chọn ngày
  };

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
                <TouchableOpacity style={styles.removeBtn} 
                onPress={() => handleRemove(item)}
                disabled={matchingProduct.quantity === 0}
                
                >
                  <Ionicons name="remove" size={21} color={COLORS.primary} style={{marginRight: 3,}}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addBtn} onPress={() => handleAdd(item)}>
                  <Ionicons name="add" size={21} color={COLORS.white}/>
                </TouchableOpacity>
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
          style={styles.backIcon}
          onPress={navigation.goBack} />
        

        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1}}>Cart</Text>
        
        <View style={{width: 30}} />
      </View>

      {/* delivery time */}
      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, backgroundColor: "rgba(247, 177, 103, 0.6)"}}>
        <Image source={require("../assets/deliveryman.png")} style={{width: 70, height: 70, marginVertical: 10}}/>
        <Text style={{ paddingLeft: 18, flex: 1, fontSize: 15 }}>{deliveryType}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ fontWeight: 'bold', color: COLORS.primary, fontSize: 18 }}>Change</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Delivery Option</Text>
            <TouchableOpacity onPress={() => { setDeliveryType('Delivery Now'); setModalVisible(false); }} style={styles.optionButton}>
            <Text style={styles.optionText}>Delivery Now</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setDeliveryType('Schedule Delivery'); setShowDatePicker(true); }} style={styles.optionButton}>
            <Text style={styles.optionText}>Schedule Delivery</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <DateTimePicker
                value={deliveryDate}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
                />
                <TouchableOpacity onPress={handleOkPress} style={styles.okButton}>
                <FontAwesome5 name="check" size={16} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



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
        }
      }
      
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
            <Text style={{fontWeight: '485', fontSize: 17}}>{numeral(subTotal).format('0,0')},000 VND</Text>
          </View>

          {/* delivery fee */}
          <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 12,

            }}>
              <Text style={{fontWeight: '485', fontSize: 17}}>Delivery Fee:</Text>
              <Text style={{fontWeight: '485', fontSize: 17}}>{shippingFee},000 VND</Text>

            
          </View>

          {/* Order Total */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 27,
          }}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Order Total:</Text>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>{numeral(total).format('0,0')},000 VND</Text>
          </View>

          <View style={{marginHorizontal: 30, marginBottom: 25}}>
            <PrimaryButton title="Place your order" onPress={handlePlaceOrder}/>
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
    backgroundColor: COLORS.white,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  okButton: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    marginLeft: 5,
    width: 36,
    textAlign: 'center'
  },
  optionText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15
  },
  closeButton: {
    padding: 10,
    marginTop: 10,
  },
  closeText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default CartScreen;
