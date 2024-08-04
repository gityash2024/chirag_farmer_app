import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  'sans-regular': {
    fontFamily: 'PublicSans-Regular',
  },
  'sans-medium': {
    fontFamily: 'PublicSans-Medium',
  },
  'sans-bold': {
    fontFamily: 'PublicSans-Bold',
  },
});

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { typography } from '../styles/Typography';

// const MyComponent = () => {
//   return (
//     <View>
//       <Text style={[styles.text, typography['sans-regular']]}>Regular Text</Text>
//       <Text style={[styles.text, typography['sans-medium']]}>Medium Text</Text>
//       <Text style={[styles.text, typography['sans-bold']]}>Bold Text</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 16,
//   },
// });

// export default MyComponent;