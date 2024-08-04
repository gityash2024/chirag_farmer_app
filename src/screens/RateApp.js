import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { typography } from '../styles/Typography';

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  const handlePress = (starIndex, isHalf) => {
    onRatingChange(isHalf ? starIndex - 0.5 : starIndex);
  };

  return (
    <View style={styles.starsContainer}>
      {stars.map((star) => (
        <View key={star} style={styles.starContainer}>
          <TouchableOpacity
            style={styles.starTouchArea}
            onPress={() => handlePress(star, false)}
          >
            <Text style={styles.starIcon}>
              {rating >= star ? '★' : rating >= star - 0.5 ? '½' : '☆'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.starTouchArea, styles.halfStarTouchArea]}
            onPress={() => handlePress(star, true)}
          />
        </View>
      ))}
    </View>
  );
};

const RateAppScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // TODO: Implement submit logic
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={[styles.backButtonText, typography['sans-medium']]}>← Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, typography['sans-bold']]}>Rate Our App</Text>
      <Text style={[styles.subtitle, typography['sans-regular']]}>We would love to hear your feedback!</Text>
      <StarRating rating={rating} onRatingChange={setRating} />
      <TextInput
        style={[styles.feedbackInput, typography['sans-regular']]}
        placeholder="Tell us what you think..."
        multiline
        numberOfLines={4}
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={[styles.submitButtonText, typography['sans-bold']]}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666666',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starContainer: {
    position: 'relative',
    marginHorizontal: 5,
  },
  starIcon: {
    fontSize: 40,
    color: '#F9C332', // Golden color for stars
  },
  starTouchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  halfStarTouchArea: {
    right: '50%',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default RateAppScreen;