import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Header = ({ navigation }) => (
  <LinearGradient
    colors={['#121212', '#121212']}
    style={styles.header}
  >
<Image source={require('../../assets/chirag-logo.png')} style={styles.logo} />
 <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
 <Image source={require('../../assets/notification-icon.png')} style={styles.notificationIcon} />   
 </TouchableOpacity>
  </LinearGradient>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomLeftRadius: 45,
    height: 90,
    borderBottomRightRadius: 45,
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 15,
  },
  notificationIcon: {
    width: 20,
    height: 20,
    marginRight: 15,

  },
});

export default Header;