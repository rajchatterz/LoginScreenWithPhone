import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';

const VerifyScreen = ({route, navigation}) => {
  const {data} = route.params;
  const [verificationCode, setVerificationCode] = useState('');
  const inputRefs = useRef([]);

  const handleVerification = () => {
    // Check if the entered verification code is correct
    // For example, compare it with the expected code (data)

    // If the code is correct, you can navigate to the next screen
    // For example, navigate to the Home screen
    if (data === verificationCode) {
      navigation.navigate('Main');
    } else {
      console.log('error');
    }
  };

  const handleInputChange = (index, value) => {
    // Update the verification code state when a box is filled
    const newVerificationCode = verificationCode.split('');
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode.join(''));

    // Move focus to the next input
    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text>VerifyScreen</Text>
      <Text>Data: Received {data}</Text>

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
