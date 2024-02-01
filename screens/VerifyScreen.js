import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useRef} from 'react';
import axios from 'axios';
const VerifyScreen = ({route, navigation}) => {
  const {data, token} = route.params;
  const [verificationCode, setVerificationCode] = useState('');
  const inputRefs = useRef([]);

  const handleVerification = async () => {
    if (data == verificationCode) {
      // Navigate to 'Main' screen
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Main');
    } else {
      console.log('Verification failed');
    }
  };

  // console.log(verificationCode);
  console.log('data', data);
  console.log('token', token);
  console.log('vertifcation coe', verificationCode);

  const handleInputChange = (index, value) => {
    // Update the verification code state when a box is filled
    const newVerificationCode = verificationCode.split('');
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode.join(''));
    if (value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    // Move focus to the next input
    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text>VerifyScreen</Text>
      <Text>Data: Received {data} </Text>

      <View style={styles.codeInputContainer}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={verificationCode[index]}
            onChangeText={value => handleInputChange(index, value)}
            ref={input => (inputRefs.current[index] = input)}
          />
        ))}
      </View>

      <TouchableHighlight onPress={() => handleVerification()}>
        <View
          style={{
            backgroundColor: 'red',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: 'black',
    width: 40,
    height: 40,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default VerifyScreen;
