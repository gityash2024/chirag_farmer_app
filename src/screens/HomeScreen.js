import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import YoutubePlayer from "react-native-youtube-iframe";
const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('refreshing');
    // Perform your refresh logic here
    // For example, you might want to reload your bookings or other data
    setTimeout(() => {
      // Simulating an API call
      setRefreshing(false);
    }, 2000);
  }, []);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const scrollViewRef = useRef(null);
  const videoRefs = useRef([]);

  const bookings = [
    {
      id: 'AB123456',
      address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066',
      name: 'Sachin Doe',
      contact: '****',
      farmArea: '21 Acres',
      crop: 'Crop name',
      temperature: '24°',
      location: 'Pratapgarh, Uttarpradesh',
      date: '24/08/2024 2:00 PM'
    },
    {
      id: 'AB123457',
      address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066',
      name: 'Sachin Doe',
      contact: '****',
      farmArea: '21 Acres',
      crop: 'Crop name',
      temperature: '24°',
      location: 'Pratapgarh, Uttarpradesh',
      date: '24/08/2024 2:00 PM'
    }
  ];

  const indianLocations = [
    { latitude: 28.6139, longitude: 77.2090, name: 'New Delhi' },
    { latitude: 19.0760, longitude: 72.8777, name: 'Mumbai' },
    { latitude: 12.9716, longitude: 77.5946, name: 'Bangalore' },
    { latitude: 22.5726, longitude: 88.3639, name: 'Kolkata' },
  ];

  const testimonials = [
    { id: 1, image: require('../../assets/client-1-logo.png'), name: 'Courtney Henry', videoId: 'dQw4w9WgXcQ' },
    { id: 2, image: require('../../assets/client-2-logo.png'), name: 'John Doe', videoId: 'M7lc1UVf-VE' },
    { id: 3, image: require('../../assets/client-3-logo.png'), name: 'Jane Smith', videoId: 'Ks-_Mh1QhMc' },
  ];

  const handleBookNow = () => {
    navigation.navigate('MyBookings');
  };

  const handleTestimonialScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (width - 30));
    setActiveTestimonial(index);
  };
  const [playing, setPlaying] = useState(Array(testimonials.length).fill(false));

  const playVideo = (index) => {
    let newPlaying = Array(testimonials.length).fill(false);
    newPlaying[index] = true;
    setPlaying(newPlaying);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }>
        <View style={styles.formContainer}>
          <Text style={styles.title}>My bookings</Text>
          
          {bookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <Text style={styles.bookingId}>#{booking.id}</Text>
              <View style={styles.locationContainer}>
                <Image source={require('../../assets/location-icon.png')} style={styles.locationIcon} />
                <Text style={styles.address}>{booking.address}</Text>
              </View>
              <Text style={styles.bookingDetail}>Booking Name : {booking.name}</Text>
              <Text style={styles.bookingDetail}>Contact number : {booking.contact}</Text>
              <Text style={styles.bookingDetail}>Farm Area : {booking.farmArea}</Text>
              <Text style={styles.bookingDetail}>Crop : {booking.crop}</Text>
              <View style={styles.weatherContainer}>
                <View style={styles.temperatureContainer}>
                  <Text style={styles.temperature}>{booking.temperature}</Text>
                  <Text style={styles.location}>{booking.location}</Text>
                  <Text style={styles.weather}>Mostly sunny</Text>
                </View>
                <Text style={styles.date}>{booking.date}</Text>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
            <Text style={styles.bookNowButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        <Image source={require('../../assets/drone-image.png')} style={styles.droneImage} />
        <Text style={styles.sectionTitle}>Our USPs</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Image source={require('../../assets/states-icon.png')} style={styles.statIcon} />
            <Text style={styles.statNumber}>8+</Text>
            <Text style={styles.statLabel}>Drone Variants</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={require('../../assets/drones-icon.png')} style={styles.statIcon} />
            <Text style={styles.statNumber}>30+</Text>
            <Text style={styles.statLabel}>Pilots</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={require('../../assets/pilots-icon.png')} style={styles.statIcon} />
            <Text style={styles.statNumber}>5+</Text>
            <Text style={styles.statLabel}>Technicians</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={require('../../assets/acres-icon.png')} style={styles.statIcon} />
            <Text style={styles.statNumber}>10000+</Text>
            <Text style={styles.statLabel}>Acres Sprayed</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={require('../../assets/farmers-icon.png')} style={styles.statIcon} />
            <Text style={styles.statNumber}>5000+</Text>
            <Text style={styles.statLabel}>Farmers</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Nearby bookings</Text>
        <MapView
  style={styles.map}
  initialRegion={{
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 20,
    longitudeDelta: 20,
  }}
>
  {indianLocations.map((location, index) => (
    <Marker
      key={index}
      coordinate={{ latitude: location.latitude, longitude: location.longitude }}
      title={location.name}
    />
  ))}
</MapView>

        <View style={styles.farmingServicesContainer}>
            <Text style={styles.serviceCardTitle}>Trust & safety</Text>
          <View style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
              <Text style={styles.serviceCardTitle}>Reliable Support</Text>
              <Text style={styles.serviceCardDescription}>Our dedicated support team is available 24/7 to assist with any issues or questions you may have while in the field.</Text>
            </View>
            <Image source={require('../../assets/drone-service-image.png')} style={styles.serviceCardImage} />
          </View>
          <View style={styles.serviceCard}>
            <Image source={require('../../assets/easy-reservation-image.png')} style={styles.serviceCardImage} />
            <View style={styles.serviceCardContent}>
              <Text style={styles.serviceCardTitle}>Data Security</Text>
              <Text style={styles.serviceCardDescription}>We prioritize your privacy by using advanced encryption and security protocols to protect your data.</Text>
            </View>
          </View>
          <View style={[styles.serviceCard, styles.serviceCardReverse]}>
            <Image source={require('../../assets/reliable-service-image.png')} style={styles.serviceCardImage} />
            <View style={styles.serviceCardContent}>
              <Text style={styles.serviceCardTitle}>Certified Training</Text>
              <Text style={styles.serviceCardDescription}>All our runners receive comprehensive training and certification, ensuring they have the necessary skills and knowledge for effective and safe drone operations.</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Our clients</Text>
        <Image source={require('../../assets/client_drown.png')} style={styles.client_drown} />
        <View style={styles.clientsContainer}>
          <View style={styles.clientLogo}>
            <Image source={require('../../assets/client-1-logo.png')} style={styles.clientLogoImage} />
          </View>
          <View style={styles.clientLogo}>
            <Image source={require('../../assets/client-2-logo.png')} style={styles.clientLogoImage} />
          </View>
          <View style={styles.clientLogo}>
            <Image source={require('../../assets/client-3-logo.png')} style={styles.clientLogoImage} />
          </View>
          <View style={styles.clientLogo}>
            <Image source={require('../../assets/client-4-logo.png')} style={styles.clientLogoImage} />
          </View>
          <View style={styles.clientLogo}>
            <Image source={require('../../assets/client-5-logo.png')} style={styles.clientLogoImage} />
          </View>
        </View>
        <Text style={styles.sectionTitle}>What our Farmers say</Text>
        <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleTestimonialScroll}
      scrollEventThrottle={16}
      ref={scrollViewRef}
      style={styles.testimonialContainer}
    >
      {testimonials.map((testimonial, index) => (
        <View key={testimonial.id} style={styles.testimonial}>
          <YoutubePlayer
            height={200}
            play={playing[index]}
            videoId={testimonial.videoId}
            onChangeState={(event) => {
              if (event === "ended") {
                let newPlaying = [...playing];
                newPlaying[index] = false;
                setPlaying(newPlaying);
              }
            }}
          />
          <View style={styles.testimonialContent}>
            <Text style={styles.testimonialName}>{testimonial.name}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, i) => (
                <Feather key={i} name="star" size={15} color="#FFD700" style={styles.starIcon} />
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.playButton} onPress={() => playVideo(index)}>
            <Feather name={playing[index] ? "pause" : "play"} size={24} color="white" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
        <View style={styles.testimonialDots}>
          {testimonials.map((_, index) => (
            <View
              key={index}
              style={[
                styles.testimonialDot,
                index === activeTestimonial && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#E9E9E9',
    padding: 15,
    marginRight: 4,
    marginLeft: 4,
    marginBottom: 15,
    marginTop: 0,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  address: {
    fontSize: 14,
    color: '#666666',
  },
  bookingDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  temperatureContainer: {
    flexDirection: 'column',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 12,
    color: '#666666',
  },
  weather: {
    fontSize: 12,
    color: '#666666',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bookNowButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  bookNowButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  droneImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#000000',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    width: '20%',
  },
  statIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666666',
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  farmingServicesContainer: {
    backgroundColor: '#F6F6FE',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    elevation: 5,
  },
  serviceCardReverse: {
    flexDirection: 'row-reverse',
  },
  serviceCardImage: {
    width: '40%',
    height: '80%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  serviceCardContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  serviceCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  serviceCardDescription: {
    fontSize: 12,
    color: '#666666',
  },
  clientsContainer: {
    flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-between',
marginBottom: 20,
},
clientLogo: {
width: '18%',
aspectRatio: 1,
marginBottom: 10,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#F6F6FE',
borderRadius: 10,
},
clientLogoImage: {
width: '80%',
height: '80%',
resizeMode: 'contain',
},
client_drown: {
position: 'absolute',
marginBottom: 20,
right: 0,
top: '83%',
zIndex: 1,
opacity: 0.8,
},
container: {
  flex: 1,
  backgroundColor: '#FFFFFF',
},
content: {
  flex: 1,
  padding: 15,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginVertical: 15,
  color: '#000000',
},
testimonialContainer: {
  marginBottom: 10,
},
testimonial: {
  width: width -40,
  height: 150, // Increased to accommodate the player
  marginRight: 15,
  borderRadius: 10,
  overflow: 'hidden',
},
testimonialContent: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 15,
  // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1,
},
playButton: {
  position: 'absolute',
  top: '30%', // Adjusted to appear above the player controls
  left: '50%',
  transform: [{ translateX: -25 }, { translateY: -25 }],
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
},
testimonialImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},

testimonialName: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 5,
},
ratingContainer: {
  flexDirection: 'row',
},
starIcon: {
  marginRight: 2,
},

testimonialDots: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
},
testimonialDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#CCCCCC',
  marginHorizontal: 5,
},
activeDot: {
  backgroundColor: '#000000',
},
});
export default HomeScreen;