import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecommendationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { booking } = route.params;

  const handleDone = () => {
    navigation.navigate('ServiceDetails',{booking});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Recommendation for "Maize"</Text>
      </View>
      <Text style={styles.warning}>Please read the Recommendation carefully!</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DRONE FLYING SPEED</Text>
        <View style={styles.row}>
          <Text style={styles.label}>During Spraying :</Text>
          <Text style={styles.value}>(4.5-5.0)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>During Turning RTL etc :</Text>
          <Text style={styles.value}>&lt;5.5</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>HEIGHT ABOVE CROP CANOPY (m)</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Good staging crops :</Text>
          <Text style={styles.value}>1.5-2.5 m</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Varities prone to lodge :</Text>
          <Text style={styles.value}>2.0-2.5 m</Text>
        </View>
      </View>
      <View style={styles.divider} />

<View style={styles.divider} />
<View style={styles.section}>
  <Text style={styles.sectionTitle}>WATER VOLUME</Text>
  <View style={styles.row}>
    <Text style={styles.label}>Stage 1 : Early stage</Text>
    <Text style={styles.value}>20</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Full canopy stage :</Text>
    <Text style={styles.value}>25</Text>
  </View>
</View>
<View style={styles.divider} />
<View style={styles.section}>
  <Text style={styles.sectionTitle}>NOZZLES</Text>
  <View style={styles.row}>
    <Text style={styles.label}>Type of nozzle:</Text>
    <Text style={styles.value}>Anti Drift fan</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Droplet size (μm) Insecticide:</Text>
    <Text style={styles.value}>250-350</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Droplet size (μm) Fungicide:</Text>
    <Text style={styles.value}>250-350</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Nozzle discharge rate:</Text>
    <Text style={styles.value}>0.3-0.6</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Angle:</Text>
    <Text style={styles.value}>60-120</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Swath (m):</Text>
    <Text style={styles.value}>3-6</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Number of Nozzles:</Text>
    <Text style={styles.value}>4-6</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Pressure (bar):</Text>
    <Text style={styles.value}>2-3</Text>
  </View>
</View>
<View style={styles.divider} />
<View style={styles.section}>
  <Text style={styles.sectionTitle}>SUITABLE TIME OF SPRAY</Text>
  <View style={styles.row}>
    <Text style={styles.label}>Summer & rainy season:</Text>
    <Text style={styles.value}>6am-10am & 3pm-6pm</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Winter season:</Text>
    <Text style={styles.value}>8am-11am & 2pm-6pm</Text>
  </View>
  <Text style={styles.dangerText}>Strictly avoid spraying during Flowering season : 6am-11am</Text>
</View>
<View style={styles.divider} />
<View style={styles.section}>
  <Text style={styles.sectionTitle}>ENVIRONMENTAL CONDITIONS</Text>
  <View style={styles.row}>
    <Text style={styles.label}>Temperature:</Text>
    <Text style={styles.value}>&lt;35°C</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Humidity:</Text>
    <Text style={styles.value}>&gt;50%</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Wind Speed:</Text>
    <Text style={styles.value}>&lt;3m/s</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>During Rain:</Text>
    <Text style={styles.value}>Do not spray</Text>
  </View>
  <Text style={styles.dangerText}>Do not operate if visibility during Fog/mist is not good</Text>
</View>
<View style={styles.divider} />
<View style={styles.section}>
  <Text style={styles.sectionTitle}>SITE SPECIFIC</Text>
  <View style={styles.row}>
    <Text style={styles.label}>Plain land: take care of obstacles present in field :</Text>
    <Text style={styles.value}>Yes</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Sloppy terrain: Use terrain following sensors:</Text>
    <Text style={styles.value}>Yes</Text>
  </View>
</View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SAFETY REQUIREMENTS</Text>
        <Text style={styles.dangerText}>• As the larvae of Army worm are active at night, spraying in the evening is more advantageous.</Text>
        <Text style={styles.dangerText}>• Spraying chemical insecticides early in the crop cycle are most likely to kill off the natural enemies and may not be economical.</Text>
        <Text style={styles.dangerText}>• Precautions for pesticide use: Not more than two chemical sprays are to be used in entire crop duration. Same chemical should not be chosen for second spray. Sprays should always be directed towards whorl and applied either in early hours of the day or in the evening time.</Text>
      </View>
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  warning: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#000000',
  },
  value: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dangerText: {
    fontSize: 14,
    color: '#FF0000',
    marginBottom: 10,
  },
  doneButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecommendationScreen;