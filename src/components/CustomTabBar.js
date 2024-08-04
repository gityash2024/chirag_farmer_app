// CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.footer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.footerTab, isFocused && styles.activeFooterTab]}
          >
            <Image
              source={options.tabBarIcon}
              style={[
                styles.footerIcon,
                isFocused ? styles.activeFooterIcon : styles.inactiveFooterIcon
              ]}
            />
            <Text style={[styles.footerText, isFocused && styles.activeFooterText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerTab: {
    alignItems: 'center',
  },
  activeFooterTab: {
    borderTopWidth: 2,
    borderTopColor: '#000000',
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  activeFooterIcon: {
    tintColor: '#000000',
  },
  inactiveFooterIcon: {
    tintColor: '#666666',
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
  },
  activeFooterText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default CustomTabBar;