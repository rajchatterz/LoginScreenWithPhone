import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useRef, useState} from 'react';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {
  responsiveHeight as hp,
  responsiveScreenWidth as wp,
} from 'react-native-responsive-dimensions';

const HomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const inputRef = useRef(null);
  const [pressed, setPressed] = useState(false);
  const [mobile, setMobile] = useState('');

  const apiKey =
    '1BkzsKyGO5I7QapHlTicjSnPFwAZgmroL4eb3u20J8xMhtEYUCSJuatRwLxpUBcWIb02lK6fZ3vnV4OM';
  const apiUrl = 'https://www.fast2sms.com/dev/bulkV2';

  const sendOTP = async (mobile, otpValue) => {
    setPressed(true);
    const route = 'otp';
    const flash = '0';

    try {
      const response = await axios.get(apiUrl, {
        params: {
          authorization: apiKey,
          route,
          variables_values: otpValue,
          flash,
          numbers: mobile,
        },
      });

      console.log('Full Response:', response.config.params);
      console.log('Response:', response.data);
      if (response && response.data) {
        navigation.navigate('verify', {
          data: response.config.params.variables_values,
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    } finally {
      setPressed(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    inputRef.current.focus();

    return () => backHandler.remove();
  }, [navigation]);

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
        onChangeText={text => setMobile(text)}
      />
      <TouchableHighlight onPress={() => sendOTP(mobile, '665656')}>
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
