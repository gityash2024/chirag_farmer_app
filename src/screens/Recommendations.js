import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";

const Recommendations = ({ navigation }) => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const cropList = [
    { name: "Rice", image: require("../../assets/rice.png") },
    { name: "Maize", image: require("../../assets/maize.png") },
    { name: "Groundnut", image: require("../../assets/groundnut.png") },
    { name: "Pigeon peas", image: require("../../assets/pigeon-peas.png") },
    { name: "Soybean", image: require("../../assets/soybean.png") },
    { name: "Sugarcane", image: require("../../assets/sugarcane.png") },
    { name: "Wheat", image: require("../../assets/wheat.png") },
    { name: "Sesame", image: require("../../assets/sesame.png") },
    { name: "Safflower", image: require("../../assets/safflower.png") },
    { name: "Cotton", image: require("../../assets/cotton.png") },
    { name: "Tomato", image: require("../../assets/tomato.png") },
    { name: "Onion", image: require("../../assets/onion.png") },
    { name: "Potato", image: require("../../assets/potato.png") },
    { name: "Brinjal", image: require("../../assets/brinjal.png") },
    { name: "Mustard", image: require("../../assets/mustard.png") },
    { name: "Moong Dal", image: require("../../assets/moong-dal.png") },
    { name: "Arhar Dal", image: require("../../assets/arhar-dal.png") },
    { name: "Chilli", image: require("../../assets/chilli.png") },
    { name: "Mango", image: require("../../assets/mango.png") },
    { name: "Papaya", image: require("../../assets/papaya.png") },
    { name: "Apple", image: require("../../assets/apple.png") },
    { name: "Litchi", image: require("../../assets/litchi.png") },
  ];

  const tickIcon = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="#000000" stroke-width="2"/>
      <path d="M5 10L8.5 13.5L15 7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const backIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.53125 15.625L3.90625 10L9.53125 4.375M4.6875 10L16.0938 10" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const renderInitialScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <SvgXml xml={backIcon} width={20} height={20} />
        </TouchableOpacity>
        <Text style={styles.heading}>Spraying Guide</Text>
      </View>
      <ScrollView contentContainerStyle={styles.cropGridContainer}>
        {cropList.map((crop, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cropCard,
              selectedCrop === crop.name && styles.selectedCropCard,
            ]}
            onPress={() => setSelectedCrop(crop.name)}
          >
            {selectedCrop === crop.name && (
              <View style={styles.tickContainer}>
                <SvgXml xml={tickIcon} width={20} height={20} />
              </View>
            )}
            <Image source={crop.image} style={styles.cropImage} />
            <Text style={styles.cropName}>{crop.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => setShowRecommendations(true)}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  const renderRecommendationCard = (title, content, imagePath) => (
    <View style={styles.card}>
      <LinearGradient
        colors={["#34C487", "#083C88"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardImageContainer}
      >
        <Image source={imagePath} style={styles.cardImage} />
      </LinearGradient>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{content}</Text>
      </View>
    </View>
  );

  const renderRecommendations = () => (
    <LinearGradient
      colors={["#ffffff", "#ffffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.recommendationsContainer}
    >
      <ScrollView>
        <Text style={styles.recommendationTitle}>
          Recommendation for "{selectedCrop}"
        </Text>
        <Text style={styles.instructionText}>
          Please read the Recommendation carefully!
        </Text>
        {renderRecommendationCard(
          "DRONE FLYING SPEED",
          "During Spraying: (4.5-5.0)\nDuring Turning RTL etc: <5.5",
          require("../../assets/recommendation-1.png")
        )}
        {renderRecommendationCard(
          "HEIGHT ABOVE CROP CANOPY (m)",
          "During Spraying: (4.5-5.0)\nDuring Turning RTL etc: <5.5",
          require("../../assets/recommendation-2.png")
        )}
        {renderRecommendationCard(
          "WATER VOLUME (L/HA)",
          "Stage 1: Early stage\n20\nFull canopy stage:\n25",
          require("../../assets/recommendation-3.png")
        )}
        {renderRecommendationCard(
          "NOZZLE",
          "Type of nozzle:\nAnti Drift fan\nDroplet size (μm) Insecticide:\n250-350\nDroplet size (μm) Fungicide:\n250-350\nNozzle discharge rate (l/min):\n0.8-1.0\nMesh:\n50-100\nSwath (m):\n3-4\nNumber of Nozzles:\n4-8\nPressure (bar):\n2-3",
          require("../../assets/recommendation-4.png")
        )}
        {renderRecommendationCard(
          "SUITABLE TIME OF SPRAY",
          "Summer & rainy season:\n6am-10am & 3pm-6pm\nWinter season:\n8am-11am & 2pm-5pm\nStrictly avoid spraying during\nflowering season (8am - 5pm)",
          require("../../assets/recommendation-5.png")
        )}
        {renderRecommendationCard(
          "ENVIRONMENTAL CONDITIONS",
          "Temperature:\n<35°C\nHumidity:\n>60%\nWind Speed:\n<10km/h\nDuring Rain:\nDo not Spray\nDo not operate if visibility during mist/\nfog is not good",
          require("../../assets/recommendation-6.png")
        )}
        {renderRecommendationCard(
          "SITE SPECIFIC",
          "Plain land: take care of\nobstacles present in field :\nYes\nSloppy terrain: Use terrain\nfollowing sensors:\nYes\nDo not operate if visibility during mist/\nfog is not good",
          require("../../assets/recommendation-7.png")
        )}
        {renderRecommendationCard(
          "LENGTH OF BUFFER ZONE (M)\nTO AVOID",
          "Non-targeted Crops:\n5\nWater bodies etc:\n100",
          require("../../assets/recommendation-8.png")
        )}
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            As the larvae of Army worm are active at night, spraying in the
            evening is more advantageous.
          </Text>
          <Text style={styles.warningText}>
            Spraying chemical insecticides early in the crop cycle are most
            likely to kill off the natural enemies and may not be economical.
          </Text>
          <Text style={styles.warningText}>
            Precautions for pesticide use: Not more than two chemical sprays are
            to be used in entire crop duration. Same chemical should not be
            chosen for second spray. Sprays should always be directed towards
            whorl and applied either in early hours of the day or in the evening
            time.
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checked]}
            onPress={() => setIsChecked(!isChecked)}
          />
          <Text style={styles.checkboxLabel}>
            I have read all the recommendations carefully.
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.doneButton, !isChecked && styles.disabledButton]}
          onPress={() => setShowRecommendations(false)}
          disabled={!isChecked}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      {showRecommendations ? renderRecommendations() : renderInitialScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    marginRight: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cropGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cropCard: {
    width: "22%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    position: "relative",
  },
  selectedCropCard: {
    borderColor: "#000000",
    backgroundColor: "#F6F6FE",
  },
  tickContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 1,
  },
  cropImage: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
  cropName: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  nextButton: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  recommendationsContainer: {
    flex: 1,
    padding: 20,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#000000",
  },
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#00000029",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  cardImageContainer: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
  },
  warningContainer: {
    marginBottom: 20,
  },
  warningText: {
    color: "#DE0000",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000000",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#000000",
  },
  checkboxLabel: {
    flex: 1,
    color: "#000000",
  },
  doneButton: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 30,
  },
  disabledButton: {
    opacity: 0.5,
  },
  doneButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Recommendations;
