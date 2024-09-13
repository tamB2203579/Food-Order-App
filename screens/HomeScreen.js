import { View, Text, StyleSheet, SafeAreaView, TextInput, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import categories from '../constants/categories';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedCategoryIndex(index)}>
            <View style={{
              backgroundColor: selectedCategoryIndex == index ? COLORS.primary : COLORS.secondary,
              ...style.categoryBtn,
            }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: selectedCategoryIndex == index ? COLORS.white : COLORS.dark }}>{category.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome to</Text>
          <Text style={{ fontSize: 38, fontWeight: 'bold', color: COLORS.primary }}>Foody</Text>
        </View>
        <Icon name="shopping-cart" size={35} />
      </View>
      <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={style.input} />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
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
  }
});
