import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { typography } from "../styles/Typography";
import ApiService from "../services/api";
import { useApp } from "../context/AppContext";
import Svg, { Path } from "react-native-svg";
import { useTranslation } from "react-i18next";

const StarRating = ({ rating, onRatingChange, disabled }) => {
  const stars = [1, 2, 3, 4, 5];

  const handlePress = (starIndex) => {
    if (!disabled) {
      onRatingChange(starIndex);
    }
  };

  return (
    <View style={styles.starsContainer}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handlePress(star)}
          disabled={disabled}
        >
          <Svg height="40" width="40" viewBox="0 0 51 48">
            <Path
              d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
              fill={star <= rating ? "rgb(254, 175, 46)" : "#D3D3D3"}
              stroke={star <= rating ? "rgb(254, 175, 46)" : "#D3D3D3"}
              strokeWidth="1"
            />
          </Svg>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const RateAppScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { showLoader, hideLoader, showToast } = useApp();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [existingRating, setExistingRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExistingRating();
  }, []);

  const fetchExistingRating = async () => {
    try {
      showLoader();
      const response = await ApiService.getRatings("app", "application");
      if (response && response.length > 0) {
        setExistingRating(response[0]);
        setRating(response[0].rating);
        setFeedback(response[0].comment);
      }
    } catch (error) {
      console.error("Error fetching rating:", error);
      showToast(t("Failed to fetch existing rating"), "error");
    } finally {
      hideLoader();
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      showLoader();
      const data = {
        rating,
        comment: feedback,
      };
      await ApiService.createRating(data);
      showToast(t("Rating submitted successfully"), "success");
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting rating:", error);
      showToast(t("Failed to submit rating"), "error");
    } finally {
      hideLoader();
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="rgb(254, 175, 46)" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backButtonText, typography["sans-medium"]]}>
          {t("Back")}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.title, typography["sans-bold"]]}>
        {t("Rate Our App")}
      </Text>
      <Text style={[styles.subtitle, typography["sans-regular"]]}>
        {t("We would love to hear your feedback!")}
      </Text>
      <StarRating
        rating={rating}
        onRatingChange={setRating}
        disabled={!!existingRating}
      />
      <TextInput
        style={[
          styles.feedbackInput,
          typography["sans-regular"],
          existingRating && styles.disabledInput,
        ]}
        placeholder={t("Tell us what you think...")}
        multiline
        numberOfLines={4}
        value={feedback}
        onChangeText={setFeedback}
        editable={!existingRating}
      />
      <TouchableOpacity
        style={[styles.submitButton, existingRating && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!!existingRating}
      >
        <Text style={[styles.submitButtonText, typography["sans-bold"]]}>
          {existingRating ? t("Already Rated") : t("Submit")}
        </Text>
      </TouchableOpacity>
      {existingRating && (
        <Text style={[styles.ratedText, typography["sans-regular"]]}>
          {t("You've already rated this app")}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#000000",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "#000000",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666666",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#F0F0F0",
    color: "#888888",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
  ratedText: {
    textAlign: "center",
    marginTop: 10,
    color: "#888888",
  },
});

export default RateAppScreen;
