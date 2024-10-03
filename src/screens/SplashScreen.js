import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import i18n, { changeLanguage } from "../services/i18n"; // Make sure this path is correct
const { width, height } = Dimensions.get("window");

const SplashScreens = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const flatListRef = useRef(null);
  const button_image = require("../../assets/button-arrow.png");

  const handleLanguageSelect = async (language) => {
    const languageCode = language === "English" ? "en" : "hi";
    await changeLanguage(languageCode);
    setSelectedLanguage(language);
    console.log("Language changed to:", languageCode);
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "PublicSans-Regular": require("../../assets/fonts/PublicSans-Regular.ttf"),
        "PublicSans-Medium": require("../../assets/fonts/PublicSans-Medium.ttf"),
        "PublicSans-Bold": require("../../assets/fonts/PublicSans-Bold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const screens = [
    {
      type: "logo",
      logo: require("../../assets/chirag-logo.png"),
      buttonImage: button_image,
      buttonText: "Get Started",
    },
    {
      type: "language",
      title: "Welcome to Chirag Connect",
      subtitle: "Please select your preferred language",
      subtext:
        "You can change your app language at any time from Profile > Language",
      languages: ["English", "हिंदी"],
    },
    {
      type: "info",
      image: require("../../assets/splash1.png"),
      title: "Lorem ipsum dolor sit amet consetuer",
      subtitle:
        "Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer",
    },
    {
      type: "info",
      image: require("../../assets/splash2.png"),
      title: "Lorem ipsum dolor sit amet consetuer",
      subtitle:
        "Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer",
    },
    {
      type: "info",
      image: require("../../assets/splash3.png"),
      title: "Lorem ipsum dolor sit amet consetuer",
      subtitle:
        "Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer",
    },
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
      flatListRef.current?.scrollToIndex({
        index: currentScreen + 1,
        animated: true,
      });
    } else {
      navigation.replace("Auth");
    }
  };

  const renderScreen = ({ item, index }) => {
    switch (item.type) {
      case "logo":
        return (
          <View style={styles.logoContainer}>
            <Image
              source={item.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        );
      case "language":
        return (
          <View style={styles.languageContainer}>
            <Text style={[styles.title, styles.sansBold]}>{t(item.title)}</Text>
            <Text style={[styles.subtitle, styles.sansMedium]}>
              {t(item.subtitle)}
            </Text>
            <Text style={[styles.subtext, styles.sansRegular]}>
              {t(item.subtext)}
            </Text>
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
                  <Text style={[styles.languageButtonText, styles.sansMedium]}>
                    {language}
                  </Text>
                  {selectedLanguage === language && (
                    <Image
                      source={require("../../assets/checkmark.png")}
                      style={styles.checkmark}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <Image
              source={require("../../assets/drown-bg-splash-2.png")}
              style={styles.droneImage}
            />
          </View>
        );
      case "info":
        return (
          <View style={styles.infoContainer}>
            <Image
              source={item.image}
              style={styles.infoImage}
              resizeMode="contain"
            />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoTitle, styles.sansBold]}>
                {t(item.title)}
              </Text>
              <Text style={[styles.infoSubtitle, styles.sansMedium]}>
                {t(item.subtitle)}
              </Text>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={[styles.nextButtonText, styles.sansBold]}>
                  {index === screens.length - 1 ? t("Get Started") : t("Next")}
                </Text>
                <Image source={button_image} style={styles.buttonImage} />
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
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
      {currentScreen === 0 && (
        <TouchableOpacity style={styles.getStartedButton} onPress={handleNext}>
          <Text style={[styles.getStartedButtonText, styles.sansBold]}>
            {t(screens[0].buttonText)}
          </Text>
          <Image source={screens[0].buttonImage} style={styles.buttonImage} />
        </TouchableOpacity>
      )}
      {currentScreen === 1 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={[styles.nextButtonText, styles.sansBold]}>
            {t("Next")}
          </Text>
          <Image source={button_image} style={styles.buttonImage} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
  logoContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  logo: {
    width: width * 0.6,
    height: width * 0.2,
  },
  getStartedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 15,
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 10,
  },
  languageContainer: {
    width,
    height,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
  },
  title: {
    color: "#121212",
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    color: "#121212",
    fontSize: 20,
    marginBottom: 5,
  },
  subtext: {
    color: "#121212",
    fontSize: 16,
    marginBottom: 30,
  },
  languageButtons: {
    width: "100%",
  },
  languageButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  selectedLanguage: {
    backgroundColor: "transparent",
  },
  languageButtonText: {
    color: "#121212",
    fontSize: 18,
  },
  checkmark: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#121212",
  },
  infoContainer: {
    width,
    height,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },
  infoImage: {
    marginTop: 100,
    // width: width * 0.7,
    // height: width * 0.7,
  },
  infoTextContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    position: "absolute",
    bottom: 0,
    shadowColor: "#747474",
    shadowOffset: { width: 2, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 5,
  },
  infoTitle: {
    color: "#121212",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  infoSubtitle: {
    color: "#121212",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    paddingVertical: 15,
    borderRadius: 5,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginRight: 10,
  },
  buttonImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  droneImage: {
    width: width,
    height: height * 0.3,
    position: "absolute",
    bottom: 80,
    right: -70,
    zIndex: -1,
    resizeMode: "contain",
  },
  sansBold: {
    fontFamily: "PublicSans-Bold",
  },
  sansMedium: {
    fontFamily: "PublicSans-Medium",
  },
  sansRegular: {
    fontFamily: "PublicSans-Regular",
  },
});

export default SplashScreens;
