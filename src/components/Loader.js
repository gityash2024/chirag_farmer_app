import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const Loader = ({ loading }) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.parallel([
        Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleValue, {
              toValue: 1,
              duration: 750,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
              toValue: 0,
              duration: 750,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    } else {
      spinValue.setValue(0);
      scaleValue.setValue(0);
    }
  }, [loading]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <Animated.View
          style={[
            styles.circle,
            styles.circleOuter,
            { transform: [{ rotate: spin }, { scale }] },
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            styles.circleMiddle,
            { transform: [{ rotate: spin }, { scale }] },
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            styles.circleInner,
            { transform: [{ rotate: spin }, { scale }] },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loaderContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    borderWidth: 4,
    borderRadius: 50,
  },
  circleOuter: {
    width: 80,
    height: 80,
    borderColor: 'rgba(254, 175, 46, 0.2)',
    borderRightColor: 'rgb(254, 175, 46)',
  },
  circleMiddle: {
    width: 60,
    height: 60,
    borderColor: 'rgba(254, 175, 46, 0.4)',
    borderTopColor: 'rgb(254, 175, 46)',
  },
  circleInner: {
    width: 40,
    height: 40,
    borderColor: 'rgba(254, 175, 46, 0.6)',
    borderLeftColor: 'rgb(254, 175, 46)',
  },
});

export default Loader;