import { View, Text, StyleSheet, SafeAreaView, TextInput, Dimensions, ScrollView, TouchableOpacity, FlatList, TouchableHighlight, Image } from 'react-native';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useCallback, useContext, useState } from 'react';
import categories from '../constants/categories';
import foods from '../constants/foods';
import { CartContext } from '../components/CartContext';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const ListCategories = React.memo(({categories, selectedCategoryIndex, setSelectedCategoryIndex, filterFoodsByCategory}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.categoriesListContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => {
            setSelectedCategoryIndex(index);
            filterFoodsByCategory(category.name);
          }}>
          <View style={{
            backgroundColor: selectedCategoryIndex == index ? COLORS.primary : COLORS.secondary,
            ...style.categoryBtn,
          }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: selectedCategoryIndex == index ? COLORS.white : COLORS.dark }}>
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    );
});

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(-1);
  const [filteredFoods, setFilteredFoods] = React.useState(foods);
  const [searchQuery, setSearchQuery] = React.useState('');

  const {cartItems, addToCart, quantityCart, setQuantityCart} = useContext(CartContext);

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

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
    const filteredFoods = foods.filter((food) => {
      const name = food.name.toLowerCase();
      const query = text.toLowerCase();
      return name.includes(query);
    });
    setFilteredFoods(filteredFoods);
  }, []);

  const filterFoodsByCategory = useCallback((categoryName) => {
    const filteredFoods = foods.filter((food) => {
      if (Array.isArray(food.category)) {
        return food.category.includes(categoryName);
      } else {
        return food.category === categoryName;
      }
    });
    setFilteredFoods(filteredFoods);
  }, []);

  const Card = ({ food }) => {
    return (
      <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9} onPress={() => navigation.navigate('Details', food)}>
        <View style={style.card}>
          <View style={{ alignItems: 'center', top: -40 }}>
            <Image source={food.image} style={{ height: 120, width: 120 }} />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 14.7, fontWeight: 'bold' }}>{food.name}</Text>
          </View>
          <View>
            <Image source={food.rating} style={{width: 100, resizeMode: 'contain', alignSelf: 'flex-start', marginLeft: 20}}/>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{food.price} VND</Text>
            <TouchableOpacity style={style.addToCardBtn}
              onPress={() => handleAddToCart(food)}
            >
              <Icon name="add" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome to</Text>
          <Text style={{ fontSize: 38, fontWeight: 'bold', color: COLORS.primary }}>Foody</Text>
        </View>
        <View>
        
        {/* shopping cart icon */}
        <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={style.container}
          >
            <View style={style.badgeContainer}>
              <Text style={style.badgeText}>{quantityCart}</Text>
            </View>
            <Icon name="shopping-cart" size={35} />
        </TouchableOpacity>

        </View>
      </View>
      <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput
            placeholder="Search"
            style={style.input}
            value={searchQuery}
            onChangeText={(text) => handleSearch(text)}
          />
        </View>
      </View>
      <View>
        <ListCategories
          categories={categories}
          selectedCategoryIndex={selectedCategoryIndex}
          setSelectedCategoryIndex={setSelectedCategoryIndex}
          filterFoodsByCategory={filterFoodsByCategory}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={filteredFoods}
        renderItem={({ item }) => <Card food={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    width: width * 0.9,
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginLeft: 10,
    flex: 1,
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 150,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.light,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  addToCardBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    padding: 10,
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
