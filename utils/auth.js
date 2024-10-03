import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    await AsyncStorage.setItem('loginTimestamp', Date.now().toString());
    await AsyncStorage.setItem('isLoggedIn', 'true');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('loginTimestamp');
    await AsyncStorage.removeItem('isLoggedIn');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

export const checkLoginValidity = async () => {
  try {
    const loginTimestamp = await AsyncStorage.getItem('loginTimestamp');
    if (loginTimestamp) {
      const currentTime = Date.now();
      const loginTime = parseInt(loginTimestamp, 10);
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      
      if (currentTime - loginTime > sevenDaysInMs) {
        await clearUserData();
        return false;
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking login validity:', error);
    return false;
  }
};