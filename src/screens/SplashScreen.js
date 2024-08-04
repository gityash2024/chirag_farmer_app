import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';

const { width, height } = Dimensions.get('window');

const SplashScreens = ({ navigation }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const flatListRef = useRef(null);
  const button_image = require('../../assets/button-arrow.png');

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'PublicSans-Regular': require('../../assets/fonts/PublicSans-Regular.ttf'),
        'PublicSans-Medium': require('../../assets/fonts/PublicSans-Medium.ttf'),
        'PublicSans-Bold': require('../../assets/fonts/PublicSans-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const screens = [
    {
      type: 'logo',
      logo: require('../../assets/chirag-logo.png'),
      buttonImage: button_image,
      buttonText: 'Get Started',
    },
    {
      type: 'language',
      title: 'Welcome to App Name!',
      subtitle: 'Please select your preferred language',
      subtext: 'You can change your app language at any time from Profile > Language',
      languages: ['English', 'हिंदी'],
    },
    {
      type: 'info',
      image: require('../../assets/splash1.png'),
      title: 'Lorem ipsum dolor sit amet consetuer',
      subtitle: 'Lorem ipsum dolor sit amet consetuer',
    },
    {
      type: 'info',
      image: require('../../assets/splash2.png'),
      title: 'Lorem ipsum dolor sit amet consetuer',
      subtitle: 'Lorem ipsum dolor sit amet consetuer',
    },
    {
      type: 'info',
      image: require('../../assets/splash3.png'),
      title: 'Lorem ipsum dolor sit amet consetuer',
      subtitle: 'Lorem ipsum dolor sit amet consetuer',
    },
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
      flatListRef.current?.scrollToIndex({ index: currentScreen + 1, animated: true });
    } else {
      navigation.replace('Auth');
    }
  };

  const renderScreen = ({ item, index }) => {
    switch (item.type) {
      case 'logo':
        return (
          <View style={styles.logoContainer}>
            <Image source={item.logo} style={styles.logo} resizeMode="contain" />
          </View>
        );
      case 'language':
        return (
          <View style={styles.languageContainer}>
            <Text style={[styles.title, styles.sansBold]}>{item.title}</Text>
            <Text style={[styles.subtitle, styles.sansMedium]}>{item.subtitle}</Text>
            <Text style={[styles.subtext, styles.sansRegular]}>{item.subtext}</Text>
            <View style={styles.languageButtons}>
              {item.languages.map((language, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.languageButton,
                    selectedLanguage === language && styles.selectedLanguage,
                  ]}
                  onPress={() => handleLanguageSelect(language)}
                >
                  <Text style={[styles.languageButtonText, styles.sansMedium]}>{language}</Text>
                  {selectedLanguage === language && (
                    <Image source={require('../../assets/checkmark.png')} style={styles.checkmark} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 'info':
        return (
          <View style={styles.infoContainer}>
            <Image source={item.image} style={styles.infoImage} />
            <Text style={[styles.infoTitle, styles.sansBold]}>{item.title}</Text>
            <Text style={[styles.infoSubtitle, styles.sansMedium]}>{item.subtitle}</Text>
          </View>
        );
    }
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        ref={flatListRef}
        data={screens}
        renderItem={renderScreen}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
      {currentScreen >= 2 && (
        <View style={styles.dotsContainer}>
          {screens.slice(2).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentScreen - 2 === index ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      )}
      {currentScreen === 0 && (
        <TouchableOpacity style={styles.getStartedButton} onPress={handleNext}>
          <Text style={[styles.getStartedButtonText, styles.sansBold]}>{screens[0].buttonText}</Text>
          <Image source={screens[0].buttonImage} style={styles.buttonImage} />
        </TouchableOpacity>
      )}
      {currentScreen > 0 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={[styles.nextButtonText, styles.sansBold]}>
            {currentScreen === screens.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <Image source={button_image} style={styles.buttonImage} />
        </TouchableOpacity>
      )}
      {currentScreen === 1 && (
        <Image source={require('../../assets/drown-bg-splash-2.png')} style={styles.droneImage} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  logoContainer: {
    width,
    height: height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: width * 0.2,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 10,
  },
  languageContainer: {
    width,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 5,
  },
  subtext: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 30,
  },
  languageButtons: {
    width: '100%',
  },
  languageButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  selectedLanguage: {
    backgroundColor: 'transparent',
  },
  languageButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  checkmark: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  infoContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  infoImage: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  infoTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#555555',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 20,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 10,
  },
  buttonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  droneImage: {
    width: width,
    height: height * 0.3,
    position: 'absolute',
    bottom: 80,
    right: -60,
    zIndex: -1,
    resizeMode: 'contain',
  },
  sansBold: {
    fontFamily: 'PublicSans-Bold',
  },
  sansMedium: {
    fontFamily: 'PublicSans-Medium',
  },
  sansRegular: {
    fontFamily: 'PublicSans-Regular',
  },
});

export default SplashScreens;