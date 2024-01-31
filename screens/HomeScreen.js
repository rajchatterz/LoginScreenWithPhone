import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  TextInput,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useRef, useState} from 'react';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';
import {
  responsiveHeight as hp,
  responsiveScreenWidth as wp,
} from 'react-native-responsive-dimensions';
const HomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const inputRef = useRef(null);
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    const backAction = () => {
      // Dismiss the keyboard before exiting the app
      // inputRef.current.blur();
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Show the numeric keypad forcefully when the component mounts
    inputRef.current.focus();

    return () => backHandler.remove();
  }, [navigation]);

  const handleKeyPress = ({nativeEvent}) => {
    if (nativeEvent.key === 'Backspace') {
      // Handle backspace key press here
      console.log('Backspace key pressed');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Text>to ShantiKutir</Text>
      <Text>Best place to buy your belongings</Text>
      <TextInput
        ref={inputRef}
        style={styles.textInputView}
        keyboardType="decimal-pad"
        keyboardAppearance="dark"
        onKeyPress={handleKeyPress}
      />
      <TouchableHighlight onPress={() => setPressed(!pressed)}>
        <View
          style={{
            backgroundColor: 'red',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {pressed ? (
            <LottieView
              source={require('../assets/animation/loader1.json')}
              style={{
                height: 50,
                width: 50,
                backgroundColor: '#fafafa',
                color: 'white',
              }}
              autoPlay
              loop
            />
          ) : (
            <Icon name="flag" size={30} color={'white'} />
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputView: {
    borderWidth: 1,
    borderColor: 'black',
    width: wp(70),
    borderRadius: hp(1),
    fontSize: 20,
  },
});
