import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkLoginValidity, getUserData } from '../../utils/auth';
import SplashScreens from '../screens/SplashScreen';

const AuthWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        const isValid = await checkLoginValidity();
        if (isValid) {
          const userData = await getUserData();
          if (userData) {
            setIsAuthenticated(true);
          }
        } else {
          await AsyncStorage.removeItem('isLoggedIn');
          await AsyncStorage.removeItem('userData');
        }
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isAuthenticated ? children : <SplashScreens />;
};

export default AuthWrapper;