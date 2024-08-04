import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,Label } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
      <View style={styles.formContainer}>
  <Text style={styles.title}>Book your Drone Service</Text>
  
  <View style={styles.inputWrapper}>
    <Text style={styles.inputLabel}>Farm Location</Text>
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input}
        placeholder="Pratapgarh, Uttar Pradesh"
      />
      <TouchableOpacity style={styles.inputIcon}>
        <Image source={require('../../assets/location-icon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>

  <View style={styles.inputWrapper}>
    <Text style={styles.inputLabel}>Farm Area (in Acres)</Text>
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input}
        placeholder="Enter Your Farm area in acres"
      />
    </View>
  </View>

  <View style={styles.inputWrapper}>
    <Text style={styles.inputLabel}>Search Crop</Text>
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input}
        placeholder="Enter Crop Name"
      />
      <TouchableOpacity style={styles.inputIcon}>
        <Image source={require('../../assets/search-icon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
</View>

        <Image source={require('../../assets/drone-image.png')} style={styles.droneImage} />

        <Text style={styles.sectionTitle}>Why use drone instead of traditional methods?</Text>
        <View style={styles.benefitsContainer}>
  <View style={styles.benefitItem}>
    <Image source={require('../../assets/increased-efficiency-icon.png')} style={styles.benefitIcon} />
    <Text style={styles.benefitText}>Increased Efficiency</Text>
    <Text style={styles.benefitSubText}>Prevent up to 5% crop{'\n'}loss on all crops</Text>
  </View>
  <View style={styles.benefitItem}>
    <Image source={require('../../assets/cost-effective-icon.png')} style={styles.benefitIcon} />
    <Text style={styles.benefitText}>Cost Effective</Text>
    <Text style={styles.benefitSubText}>Reduce your cost by{'\n'}upto 4 times</Text>
  </View>
  <View style={styles.benefitItem}>
    <Image source={require('../../assets/environmentally-friendly-icon.png')} style={styles.benefitIcon} />
    <Text style={styles.benefitText}>Environmentally Friendly</Text>
    <Text style={styles.benefitSubText}>Save upto 10 times on{'\n'}energy & time</Text>
  </View>
</View>

<View style={styles.farmingServicesContainer}>
  <View style={styles.serviceCard}>
    <View style={styles.serviceCardContent}>
      <Text style={styles.serviceCardTitle}>Find Drone Based Farming Services</Text>
      <Text style={styles.serviceCardDescription}>Farmers can choose from a range of local and national drone service providers. We'll help you find the one that best meets your needs!</Text>
    </View>
    <Image source={require('../../assets/drone-service-image.png')} style={styles.serviceCardImage} />
  </View>
  <View style={styles.serviceCard}>
    <Image source={require('../../assets/easy-reservation-image.png')} style={styles.serviceCardImage} />
    <View style={styles.serviceCardContent}>
      <Text style={styles.serviceCardTitle}>Easy reservation process</Text>
      <Text style={styles.serviceCardDescription}>Book your drone service in just a few clicks. Our user-friendly platform makes scheduling easy and convenient.</Text>
    </View>
  </View>
  <View style={[styles.serviceCard, styles.serviceCardReverse]}>
    <Image source={require('../../assets/reliable-service-image.png')} style={styles.serviceCardImage} />
    <View style={styles.serviceCardContent}>
      <Text style={styles.serviceCardTitle}>Reliable and Quality Service</Text>
      <Text style={styles.serviceCardDescription}>Your chosen service provider will visit your field and perform pesticide spraying, fertilization, or seeding using top-quality drone technology. Once the operation is complete, you'll receive confirmation.</Text>
    </View>
  </View>

</View>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Image source={require('../../assets/states-icon.png')} style={styles.statIcon} />
            <Text style={styles.statNumber}>8+</Text>
            <Text style={styles.statLabel}>States Coverage</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={require('../../assets/drones-icon.png')} style={styles.statIcon} />
            <Text style={styles.statNumber}>30+</Text>
            <Text style={styles.statLabel}>Drones</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={require('../../assets/pilots-icon.png')} style={styles.statIcon} />
            <Text style={styles.statNumber}>5+</Text>
            <Text style={styles.statLabel}>Pilots</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={require('../../assets/acres-icon.png')} style={styles.statIcon} />
            <Text style={styles.statNumber}>10000+</Text>
            <Text style={styles.statLabel}>Acres covered</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={require('../../assets/farmers-icon.png')} style={styles.statIcon} />
            <Text style={styles.statNumber}>5000+</Text>
            <Text style={styles.statLabel}>Farmers benefited</Text>
          </View>
        </View>

        <View style={styles.bookingStepsContainer}>
  <Text style={styles.sectionTitle}>Book your service in four simple steps</Text>
  <View style={styles.stepsWrapper}>
    <Image source={require('../../assets/middle_straight_line.png')} style={styles.middleLine} />
    {/* <Image source={require('../../assets/curl_dotted_line.png')} style={styles.dottedLine} /> */}
    
    <View style={[styles.step, styles.stepRight]}>
      <View style={styles.stepNumberContainer}>
        <Text style={styles.stepNumber}>1</Text>
      </View>
      <View style={styles.stepContent}>
        <Image source={require('../../assets/step-1-icon.png')} style={styles.stepIcon} />
        <Text style={styles.stepTitle}>Book a Service through our app</Text>
        <Text style={styles.stepDescription}>Open the Chirag app and select fields, area, crop type, and preferred date for spraying services.</Text>
      </View>
    </View>
    
    <View style={[styles.step, styles.stepLeft]}>
      <View style={styles.stepNumberContainer}>
        <Text style={styles.stepNumber}>2</Text>
      </View>
      <View style={styles.stepContent}>
        <Image source={require('../../assets/step-2-icon.png')} style={styles.stepIcon} />
        <Text style={styles.stepTitle}>Our team will contact you</Text>
        <Text style={styles.stepDescription}>Once you've booked your service, our platform takes the reins. We seamlessly connect you with certified drone owners in your vicinity.</Text>
      </View>
    </View>
    
    <View style={[styles.step, styles.stepRight]}>
      <View style={styles.stepNumberContainer}>
        <Text style={styles.stepNumber}>3</Text>
      </View>
      <View style={styles.stepContent}>
        <Image source={require('../../assets/step-3-icon.png')} style={styles.stepIcon} />
        <Text style={styles.stepTitle}>Precision Spraying</Text>
        <Text style={styles.stepDescription}>The heart of Chirag's commitment is the precision spraying appointment is the practical demonstration of our efficient and proficient drone operators taking charge, ensuring hassle-free and precise spraying services.</Text>
      </View>
    </View>
    
    <View style={[styles.step, styles.stepLeft]}>
      <View style={styles.stepNumberContainer}>
        <Text style={styles.stepNumber}>4</Text>
      </View>
      <View style={styles.stepContent}>
        <Image source={require('../../assets/step-4-icon.png')} style={styles.stepIcon} />
        <Text style={styles.stepTitle}>Pay after the service is completed</Text>
        <Text style={styles.stepDescription}>Once your service is finished and you are satisfied with the service you can pay the amount through various payment methods.</Text>
      </View>
    </View>
  </View>
</View>

        <Text style={styles.sectionTitle}>Our clients</Text>
        {/* client_drown */}
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

<Text style={styles.sectionTitle}>Testimonials</Text>
<ScrollView horizontal style={styles.testimonialContainer}>
  {[1, 2, 3].map((item) => (
    <View key={item} style={styles.testimonial}>
      <View style={styles.testimonialHeader}>
        <Image source={require('../../assets/user-avatar.png')} style={styles.testimonialAvatar} />
        <View style={styles.testimonialHeaderText}>
          <Text style={styles.testimonialName}>Courtney Henry</Text>
          <Text style={styles.testimonialRating}>★★★★★</Text>
        </View>
      </View>
      <View style={styles.testimonialContent}>
        <Text style={styles.testimonialText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.</Text>
      </View>
    </View>
  ))}
</ScrollView>
<View style={styles.testimonialDots}>
  <View style={[styles.testimonialDot, styles.activeDot]} />
  <View style={styles.testimonialDot} />
  <View style={styles.testimonialDot} />
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
  inputWrapper: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#000000',
    fontSize: 14,
  },
  inputIcon: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
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
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  benefitItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  benefitIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  benefitText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  benefitSubText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 10,
    lineHeight: 14,
  },
  farmingServicesContainer: {
    backgroundColor: '#F6F6FE',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    // backgroundColor: '#FFFFFF',
    // borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
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
    marginBottom: 5,
    color: '#000000',
  },
  serviceCardDescription: {
    fontSize: 12,
    color: '#666666',
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
  stepsContainer: {
    marginBottom: 20,
    backgroundColor: '#F6F6FE',
    borderRadius: 10,
    padding: 15,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#CCCCCC',
    paddingLeft: 15,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  stepDescription: {
    fontSize: 14,
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
  testimonialContainer: {
    marginBottom: 10,
  },
  testimonial: {
    width: 250,
    padding: 15,
    backgroundColor: '#000000',
    borderRadius: 10,
    marginRight: 15,
  },
  testimonialAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#EEF0F3',
  },
  testimonialRating: {
    color: '#F9C332',
    marginBottom: 5,
    fontSize: 14,
  },
  testimonialText: {
    fontSize: 14,
    color: '#EEF0F3',
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
  },bookingStepsContainer: {
    backgroundColor: '#F6F6FE',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  stepsWrapper: {
    position: 'relative',
    paddingVertical: 20,
  },
  middleLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    height: '100%',
    zIndex: 1,
  },
  dottedLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '43%',
    height: 300,
    zIndex: 1,
    opacity: 0.5,
  },
  step: {
    flexDirection: 'row',
    // marginBottom: 40,
    zIndex: 2,
  },
  stepLeft: {
    marginRight: '50%',
  },
  stepRight: {
    marginLeft: '55%',
    justifyContent: 'flex-end',
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
    maxWidth: '80%',
  },
  stepIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  stepDescription: {
    fontSize: 12,
    color: '#666666',
  },
  client_drown:{
    position: 'absolute',
    marginBottom: 20,
    right: 0,
    top: '85%',
    zIndex: 1,
    opacity:0.8
    
  },
  testimonialContainer: {
    marginBottom: 10,
    
  },
  testimonial: {
    width: 250,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#EEF0F3',
  },
  
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#000000',
  },
  testimonialAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  testimonialHeaderText: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  testimonialRating: {
    color: '#F9C332',
    fontSize: 14,
  },
  testimonialContent: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  testimonialText: {
    fontSize: 14,
    color: '#000000',
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