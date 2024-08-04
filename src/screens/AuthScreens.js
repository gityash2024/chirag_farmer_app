import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Platform,TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const AuthScreens = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [authCode, setAuthCode] = useState(['', '', '', '']);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    state: '',
    village: '',
    regionField: '',
    profilePhoto: null,
    aadhaarFront: null,
    aadhaarBack: null,
  });

  const handleContinue = () => {
    if (isLogin) {
      if (signupStep === 1) {
        setSignupStep(2);
      } else {
        navigation.replace('Main');
      }
    } else {
      if (signupStep === 1) {
        setSignupStep(2);
      } else if (signupStep === 2) {
        setSignupStep(3);
      } else {
        navigation.replace('Main');
      }
    }
  };

  const pickImage = async (field) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, [field]: result.assets[0].uri });
    }
  };

  const renderAuthCode = () => (
    <View style={styles.authCodeContainer}>
      {authCode.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.authCodeInput}
          value={digit}
          onChangeText={(text) => {
            const newAuthCode = [...authCode];
            newAuthCode[index] = text;
            setAuthCode(newAuthCode);
            if (text && index < 3) {
              this[`authInput${index + 1}`].focus();
            }
          }}
          keyboardType="number-pad"
          maxLength={1}
          ref={(input) => { this[`authInput${index}`] = input; }}
        />
      ))}
    </View>
  );

  const renderSignupStep1 = () => (
    <View style={styles.formContainer}>
      <Image source={require('../../assets/chirag-white-screen-logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.heyThereText}>Hey there,</Text>
      <Text style={styles.headerText}>Signup to continue</Text>
      <View style={styles.phoneInputContainer}>
        <Text style={styles.phoneInputLabel}>+91</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Your Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.socialSignup}>
        <Text style={styles.socialSignupText}>Signup with</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity>
            <Image source={require('../../assets/google-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/apple-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSignupStep2 = () => (
    <View style={styles.formContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => setSignupStep(1)}>
        <Image source={require('../../assets/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Enter authentication code</Text>
      <Text style={styles.subHeaderText}>Enter the 4-digit that we have sent to your registered email id.</Text>
      {renderAuthCode()}
      <TouchableOpacity>
        <Text style={styles.resendText}>Didn't Received code yet? Resend</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSignupStep3 = () => (
    <ScrollView contentContainerStyle={styles.formContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => setSignupStep(2)}>
        <Image source={require('../../assets/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Complete your registration</Text>
      <TouchableOpacity style={styles.profilePhotoContainer} onPress={() => pickImage('profilePhoto')}>
        {formData.profilePhoto ? (
          <Image source={{ uri: formData.profilePhoto }} style={styles.profilePhoto} />
        ) : (
          <Image source={require('../../assets/profile-placeholder.png')} style={styles.profilePhoto} />
        )}
        <View style={styles.addPhotoButton}>
          <Text style={styles.addPhotoText}>+</Text>
        </View>
      </TouchableOpacity>
      <TextInput
  style={styles.fullWidthInput}
  placeholder="Enter Name*"
  value={formData.name}
  onChangeText={(text) => setFormData({ ...formData, name: text.slice(0, 30) })}
  maxLength={30}
/>
<View style={styles.fullWidthInput}>
  {/* <Text style={styles.phoneInputLabel}>+91</Text> */}
  <TextInput
    style={styles.phoneInput}
    placeholder="Enter Your Mobile Number"
    value={mobileNumber}
    editable={false}
  />
</View>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, formData.gender === 'Male' && styles.selectedGender]}
          onPress={() => setFormData({ ...formData, gender: 'Male' })}
        >
          <Text style={[styles.genderButtonText, formData.gender === 'Male' && styles.selectedGenderText]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, formData.gender === 'Female' && styles.selectedGender]}
          onPress={() => setFormData({ ...formData, gender: 'Female' })}
        >
          <Text style={[styles.genderButtonText, formData.gender === 'Female' && styles.selectedGenderText]}>Female</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.aadhaarContainer}>
        <TouchableOpacity style={styles.aadhaarBox} onPress={() => pickImage('aadhaarFront')}>
          {formData.aadhaarFront ? (
            <Image source={{ uri: formData.aadhaarFront }} style={styles.aadhaarImage} />
          ) : (
            <>
              <Text style={styles.aadhaarText}>Front side of Aadhaar card</Text>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.aadhaarBox} onPress={() => pickImage('aadhaarBack')}>
          {formData.aadhaarBack ? (
            <Image source={{ uri: formData.aadhaarBack }} style={styles.aadhaarImage} />
          ) : (
            <>
              <Text style={styles.aadhaarText}>Back side of Aadhaar card</Text>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
      <TextInput
  style={styles.fullWidthInput}
  placeholder="Enter State*"
  value={formData.state}
  onChangeText={(text) => setFormData({ ...formData, state: text.slice(0, 30) })}
  maxLength={30}
/>

<TextInput
  style={styles.fullWidthInput}
  placeholder="Enter Village*"
  value={formData.village}
  onChangeText={(text) => setFormData({ ...formData, village: text.slice(0, 30) })}
  maxLength={30}
/>

<TextInput
  style={styles.fullWidthInput}
  placeholder="Enter Region*"
  value={formData.regionField}
  onChangeText={(text) => setFormData({ ...formData, regionField: text.slice(0, 30) })}
  multiline={true}
  numberOfLines={2}
  maxLength={30}
/>
    </ScrollView>
  );

  const renderLogin = () => (
    <View style={styles.formContainer}>
      <Image source={require('../../assets/chirag-white-screen-logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.heyThereText}>Hey there,</Text>
      <Text style={styles.headerText}>Login to continue</Text>
      <View style={styles.phoneInputContainer}>
        <Text style={styles.phoneInputLabel}>+91</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Your Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );

  const getBgImage = () => {
    if (isLogin) {
      return signupStep === 1 ? require('../../assets/login-signup-background.png') : require('../../assets/otp-background.png');
    } else {
      return signupStep === 1 ? require('../../assets/login-signup-background.png') : 
             signupStep === 2 ? require('../../assets/otp-background.png') : null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Image source={getBgImage()} style={styles.backgroundImage} />
      {isLogin ? (
        signupStep === 1 ? renderLogin() : renderSignupStep2()
      ) : (
        signupStep === 1 ? renderSignupStep1() :
        signupStep === 2 ? renderSignupStep2() :
        renderSignupStep3()
      )}
      <View style={styles.bottomContainer}>
        {(isLogin && signupStep === 1) || (!isLogin && signupStep === 1) ? (
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchAuthText}>
              {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    height: height * 0.4,
    resizeMode: 'cover',
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 30,
    marginTop: 50,
    alignSelf: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40, // Added for better scrolling
  },
  heyThereText: {
    fontSize: 18,
    color: '#121212',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#121212',
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#121212',
  },
  fullWidthInput: {
    width: '100%',
    minWidth: Platform.OS === 'web' ? 300 : '100%', // Ensuring minimum width on web
    maxWidth: '100%', // Ensuring it doesn't exceed full width
    marginVertical: 8, // Adding some spacing between inputs
    padding: 10, // Ensuring enough space for content
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 8,
    marginBottom: 15,
  },
  phoneInputLabel: {
    fontSize: 16,
    color: '#121212',
    paddingHorizontal: 15,
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    color: '#121212',
    fontSize: 16,
  },
  socialSignup: {
    alignItems: 'center',
    marginTop: 20,
  },
  socialSignupText: {
    marginBottom: 10,
    color: '#121212',
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  switchAuthText: {
    marginBottom: 20,
    color: '#121212',
  },
  continueButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  authCodeInput: {
    width: '22%',
    height: 50,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    color: '#121212',
  },
  resendText: {
    color: '#121212',
    marginTop: 20,
  },
  profilePhotoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#121212',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  genderButton: {
    width: '48%',
    height: 50,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#121212',
    borderColor: '#121212',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#121212',
  },
  selectedGenderText: {
    color: '#FFFFFF',
  },
  aadhaarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  aadhaarBox: {
    width: '48%',
    height: 100,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aadhaarText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#121212',
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: '#121212',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});
export default AuthScreens;