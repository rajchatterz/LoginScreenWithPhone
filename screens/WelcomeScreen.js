import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {StyleSheet, Image, View, Button} from 'react-native';
import Swiper from 'react-native-swiper';

const WelcomeScreen = ({navigation}) => {
  const handleTap = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Home');
    }
  };
  const images = [
    'https://ipureinterior.com/my_media/2020/09/AllOverIndia.jpg',
    'https://www.clipartmax.com/png/middle/316-3161098_free-shipping-clipart-india-free-cash-on-delivery.png',
    'https://flyclipart.com/thumb2/delivery-clipart-freight-792473.png',
  ];

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={false}
        loop={false}
        paginationStyle={styles.pagination}>
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{uri: image}} style={styles.image} />
          </View>
        ))}
      </Swiper>
      <View style={{bottom: 200, width: 200}}>
        <Button title="Tap me" onPress={() => handleTap()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  pagination: {
    bottom: 300,
  },
});

export default WelcomeScreen;
