import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-react-native-language-detector";
import AsyncStorage from "@react-native-async-storage/async-storage";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: {
      en: {
        translation: {
          "Get Started": "Get Started",
          "Welcome to Chirag Connect": "Welcome to Chirag Connect",
          "Please select your preferred language":
            "Please select your preferred language",
          "You can change your app language at any time from Profile > Language":
            "You can change your app language at any time from Profile > Language",
          Next: "Next",
          "Lorem ipsum dolor sit amet consetuer":
            "Lorem ipsum dolor sit amet consetuer",
          "Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer":
            "Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer",
          "Hey there": "Hey there",
          "Login to continue": "Login to continue",
          "Signup to continue": "Signup to continue",
          "Your Mobile Number": "Your Mobile Number",
          "Signup with": "Signup with",
          "Enter authentication code": "Enter authentication code",
          "Enter the 4-digit code that we have sent to your registered mobile number.":
            "Enter the 4-digit code that we have sent to your registered mobile number.",
          "Didn't receive code? Resend": "Didn't receive code? Resend",
          "Complete your registration": "Complete your registration",
          "Enter Name*": "Enter Name*",
          "Enter Your Mobile Number": "Enter Your Mobile Number",
          "Enter Email ID*": "Enter Email ID*",
          Male: "Male",
          Female: "Female",
          "Enter State*": "Enter State*",
          "Enter Village*": "Enter Village*",
          "Enter Region*": "Enter Region*",
          "Aadhaar card": "Aadhaar card",
          "Front side of Aadhaar card": "Front side of Aadhaar card",
          "Back side of Aadhaar card": "Back side of Aadhaar card",
          "Aadhaar Authentication Successful":
            "Aadhaar Authentication Successful",
          "Don't have an account? Signup": "Don't have an account? Signup",
          "Already have an account? Login": "Already have an account? Login",
          Continue: "Continue",
          "OTP sent successfully": "OTP sent successfully",
          "User not found or registration incomplete. Please sign up.":
            "User not found or registration incomplete. Please sign up.",
          "Farmer details not found: Please sign up to continue":
            "Farmer details not found: Please sign up to continue",
          "Login successful": "Login successful",
          "OTP verified successfully": "OTP verified successfully",
          "Invalid OTP": "Invalid OTP",
          "Farmer registered successfully": "Farmer registered successfully",
          "Aadhaar uploaded successfully": "Aadhaar uploaded successfully",
          "Aadhaar verified successfully": "Aadhaar verified successfully",
          "OTP resent successfully": "OTP resent successfully",
          "Failed to resend OTP": "Failed to resend OTP",
          "Name is required": "Name is required",
          "Email is required": "Email is required",
          "Gender is required": "Gender is required",
          "State is required": "State is required",
          "Village is required": "Village is required",
          "Region is required": "Region is required",
          Wallet: "Wallet",
          "Manage Addresses": "Manage Addresses",
          "My profile": "My profile",
          Settings: "Settings",
          "Terms and conditions": "Terms and conditions",
          "Privacy Policy": "Privacy Policy",
          "Rate app": "Rate app",
          User: "User",
          "Not available": "Not available",
          "Bookings and plans": "Bookings and plans",
          "Help & Support": "Help & Support",
          Logout: "Logout",
          Version: "Version",
          "Confirm Logout": "Confirm Logout",
          "Are you sure you want to logout?":
            "Are you sure you want to logout?",
          Cancel: "Cancel",
          Confirm: "Confirm",
          Back: "Back",
          "Rate Our App": "Rate Our App",
          "We would love to hear your feedback!":
            "We would love to hear your feedback!",
          "Tell us what you think...": "Tell us what you think...",
          "Already Rated": "Already Rated",
          Submit: "Submit",
          "You've already rated this app": "You've already rated this app",
          "Edit Account": "Edit Account",
          NAME: "NAME",
          EDIT: "EDIT",
          "PHONE NUMBER": "PHONE NUMBER",
          "EMAIL ADDRESS": "EMAIL ADDRESS",
          "My Addresses": "My Addresses",
          "Add Address": "Add Address",
          "No addresses found": "No addresses found",
          DELETE: "DELETE",
          "Add New Address": "Add New Address",
          Street: "Street",
          City: "City",
          State: "State",
          "Postal Code": "Postal Code",
          Country: "Country",
          Add: "Add",
          "Confirm Delete": "Confirm Delete",
          "Are you sure you want to delete this address?":
            "Are you sure you want to delete this address?",
          Delete: "Delete",
          DONE: "DONE",
          EDIT: "EDIT",
          Update: "Update",
          "Edit Address": "Edit Address",
          "Address deleted successfully": "Address deleted successfully",
          "Delete Account": "Delete Account",
          "Upload Aadhaar": "Upload Aadhaar",
          "Enter Aadhaar Number": "Enter Aadhaar Number",

          "Customer support": "Customer support",
          "Customer support?": "Customer support?",
          "Lorem ipsum is simply dummy text of the printing and typesetting industry.":
            "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
          "Chat with us": "Chat with us",
          "Request a callback": "Request a callback",
          "Name*": "Name*",
          "Mobile Number*": "Mobile Number*",
          "Subject*": "Subject*",
          Submit: "Submit",
          "Terms and Conditions": "Terms and Conditions",
          "Privacy Policy": "Privacy Policy",
          "Last Updated": "Last Updated",
          "1. Acceptance of Terms": "1. Acceptance of Terms",
          "By accessing or using the Chirag app, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our app.":
            "By accessing or using the Chirag app, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our app.",
          "2. Use of Services": "2. Use of Services",
          "Our app provides drone-based farming services. You agree to use these services only for lawful purposes and in accordance with these Terms and Conditions.":
            "Our app provides drone-based farming services. You agree to use these services only for lawful purposes and in accordance with these Terms and Conditions.",
          "3. User Accounts": "3. User Accounts",
          "To use certain features of the app, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.":
            "To use certain features of the app, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
          "4. Privacy Policy": "4. Privacy Policy",
          "Your use of the Chirag app is also governed by our Privacy Policy, which can be found in the app settings.":
            "Your use of the Chirag app is also governed by our Privacy Policy, which can be found in the app settings.",
          "5. Intellectual Property": "5. Intellectual Property",
          "All content, features, and functionality of the Chirag app are owned by us or our licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.":
            "All content, features, and functionality of the Chirag app are owned by us or our licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
          "6. Limitation of Liability": "6. Limitation of Liability",
          "We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the app.":
            "We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the app.",
          "7. Changes to Terms": "7. Changes to Terms",
          "We reserve the right to modify these Terms and Conditions at any time. We will notify users of any significant changes. Your continued use of the app after such modifications constitutes your acceptance of the new terms.":
            "We reserve the right to modify these Terms and Conditions at any time. We will notify users of any significant changes. Your continued use of the app after such modifications constitutes your acceptance of the new terms.",
          "8. Termination": "8. Termination",
          "We may terminate or suspend your account and access to the app at our sole discretion, without prior notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason.":
            "We may terminate or suspend your account and access to the app at our sole discretion, without prior notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason.",
          "9. Governing Law": "9. Governing Law",
          "These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.":
            "These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.",
          "10. Contact Us": "10. Contact Us",
          "If you have any questions about these Terms and Conditions, please contact us at support@chiragapp.com.":
            "If you have any questions about these Terms and Conditions, please contact us at support@chiragapp.com.",
          "1. Introduction": "1. Introduction",
          "Chirag App is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our app.":
            "Chirag App is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our app.",
          "2. Information We Collect": "2. Information We Collect",
          "We collect information you provide directly to us, such as your name, contact information, and farm details when you register for an account or use our services. We may also collect information about your device and app usage.":
            "We collect information you provide directly to us, such as your name, contact information, and farm details when you register for an account or use our services. We may also collect information about your device and app usage.",
          "3. How We Use Your Information": "3. How We Use Your Information",
          "We use the information we collect to provide, maintain, and improve our services, to process your requests, and to send you updates and other information related to the app.":
            "We use the information we collect to provide, maintain, and improve our services, to process your requests, and to send you updates and other information related to the app.",
          "4. Data Sharing and Disclosure": "4. Data Sharing and Disclosure",
          "We do not sell your personal information. We may share your information with service providers who assist us in providing our services, or if required by law.":
            "We do not sell your personal information. We may share your information with service providers who assist us in providing our services, or if required by law.",
          "5. Data Security": "5. Data Security",
          "We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction, or damage.":
            "We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction, or damage.",
          "6. Your Rights": "6. Your Rights",
          "You have the right to access, correct, or delete your personal information. You can manage your information through your account settings or by contacting us directly.":
            "You have the right to access, correct, or delete your personal information. You can manage your information through your account settings or by contacting us directly.",
          "7. Changes to This Policy": "7. Changes to This Policy",
          'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.':
            'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
          "8. Data Retention": "8. Data Retention",
          "We retain your personal information for as long as necessary to provide you with our services and as described in this Privacy Policy. We may also retain and use this information to comply with our legal obligations, resolve disputes, and enforce our agreements.":
            "We retain your personal information for as long as necessary to provide you with our services and as described in this Privacy Policy. We may also retain and use this information to comply with our legal obligations, resolve disputes, and enforce our agreements.",
          "9. Third-Party Services": "9. Third-Party Services",
          "Our app may contain links to third-party websites or services. We are not responsible for the content or privacy practices of these third parties. We encourage you to read the privacy policies of any third-party services you use.":
            "Our app may contain links to third-party websites or services. We are not responsible for the content or privacy practices of these third parties. We encourage you to read the privacy policies of any third-party services you use.",
          "If you have any questions about this Privacy Policy, please contact us at privacy@chiragapp.com.":
            "If you have any questions about this Privacy Policy, please contact us at privacy@chiragapp.com.",
          "Crop Selection": "Crop Selection",
          "Based on your location and soil type, we recommend planting wheat or barley for the upcoming season.":
            "Based on your location and soil type, we recommend planting wheat or barley for the upcoming season.",
          Irrigation: "Irrigation",
          "Implement a drip irrigation system to conserve water and improve crop yield.":
            "Implement a drip irrigation system to conserve water and improve crop yield.",
          Fertilization: "Fertilization",
          "Apply a balanced NPK fertilizer in the ratio of 10-26-26 at a rate of 250 kg/ha.":
            "Apply a balanced NPK fertilizer in the ratio of 10-26-26 at a rate of 250 kg/ha.",
          "Pest Control": "Pest Control",
          "Monitor for aphids and use neem-based organic pesticides if infestation occurs.":
            "Monitor for aphids and use neem-based organic pesticides if infestation occurs.",
          "Permission to access location was denied":
            "Permission to access location was denied",
          "Please fill all fields": "Please fill all fields",
          "Please accept the recommendations":
            "Please accept the recommendations",
          "Location not found": "Location not found",
          "Error searching location": "Error searching location",
          "Farm Location": "Farm Location",
          "Pratapgarh, Uttar pradesh": "Pratapgarh, Uttar pradesh",
          "Search crop": "Search crop",
          Enter: "Enter",
          "Full Name": "Full Name",
          "Enter full Name": "Enter full Name",
          "Contact Number": "Contact Number",
          "Enter contact Number": "Enter contact Number",
          Date: "Date",
          "Select time slot": "Select time slot",
          "Farm Area (in Acres)": "Farm Area (in Acres)",
          "Enter Your Farm area in acres": "Enter Your Farm area in acres",
          Weather: "Weather",
          "24 degrees": "24 degrees",
          "Crop name": "Crop name",
          "Enter Your Full Name": "Enter Your Full Name",
          "Crop Output per acre of land": "Crop Output per acre of land",
          "Enter Your Contact Number": "Enter Your Contact Number",
          "Have you used drone or Additional Service":
            "Have you used drone or Additional Service",
          Yes: "Yes",
          No: "No",
          "Recommendation for": "Recommendation for",
          "Please read the Recommendation carefully!":
            "Please read the Recommendation carefully!",
          "I have read all the recommendations carefully.":
            "I have read all the recommendations carefully.",
          "Selected Location": "Selected Location",
          "Current Location": "Current Location",
          "Search for a location": "Search for a location",
          Search: "Search",
          "Use current location": "Use current location",
          "Book a Service": "Book a Service",
          "Details of previous yield": "Details of previous yield",
          "Select location": "Select location",
          Skip: "Skip",
          "Book Now": "Book Now",
          Next: "Next",
          Booking: "Booking",
          "Booking Requested!": "Booking Requested!",
          "Address not available": "Address not available",
          "Booking Name": "Booking Name",
          "Not provided": "Not provided",
          "Contact number": "Contact number",
          "Farm Area": "Farm Area",
          Crop: "Crop",
          "N/A": "N/A",
          "Humidity not available": "Humidity not available",
          "Location not available": "Location not available",
          "Date not provided": "Date not provided",
          "Vendor assigned": "Vendor assigned",
          "Digital sky Drone services": "Digital sky Drone services",
          "2 years of experience": "2 years of experience",
          "Call now": "Call now",
          "Booking Successful!": "Booking Successful!",
          "Your booking has been confirmed with":
            "Your booking has been confirmed with",
          "the vendor": "the vendor",
          "Go to Homepage": "Go to Homepage",
          "DRONE FLYING SPEED": "DRONE FLYING SPEED",
          "During Spraying: (4.5-5.0)\nDuring Turning RTL etc: <5.5":
            "During Spraying: (4.5-5.0)\nDuring Turning RTL etc: <5.5",
          "HEIGHT ABOVE CROP CANOPY (m)": "HEIGHT ABOVE CROP CANOPY (m)",
          "Good staging crops: 1.5-2.5 m\nVarities prone to lodge: 2.0-2.5 m":
            "Good staging crops: 1.5-2.5 m\nVarities prone to lodge: 2.0-2.5 m",
          "WATER VOLUME (L/HA)": "WATER VOLUME (L/HA)",
          "Stage 1: Early stage: 20\nFull canopy stage: 25":
            "Stage 1: Early stage: 20\nFull canopy stage: 25",
          NOZZLES: "NOZZLES",
          "Type of nozzle: Anti Drift fan\nDroplet size (μm) Insecticide: 250-350\nDroplet size (μm) Fungicide: 250-350\nNozzle discharge rate (l/min): 0.3-0.6\nAngle: 60-120\nSwath (m): 3-6\nNumber of Nozzles: 4-6\nPressure (bar): 2-3":
            "Type of nozzle: Anti Drift fan\nDroplet size (μm) Insecticide: 250-350\nDroplet size (μm) Fungicide: 250-350\nNozzle discharge rate (l/min): 0.3-0.6\nAngle: 60-120\nSwath (m): 3-6\nNumber of Nozzles: 4-6\nPressure (bar): 2-3",
          "SUITABLE TIME OF SPRAY": "SUITABLE TIME OF SPRAY",
          "Summer & rainy season: 6am-10am & 3pm-6pm\nWinter season: 8am-11am & 2pm-5pm\nStrictly avoid spraying during Flowering season: 6am-11am":
            "Summer & rainy season: 6am-10am & 3pm-6pm\nWinter season: 8am-11am & 2pm-5pm\nStrictly avoid spraying during Flowering season: 6am-11am",
          "ENVIRONMENTAL CONDITIONS": "ENVIRONMENTAL CONDITIONS",
          "Temperature: <35°C\nHumidity: >50%\nWind Speed: <3m/s\nDuring Rain: Do not Spray\nDo not operate if visibility during mist/fog is not good":
            "Temperature: <35°C\nHumidity: >50%\nWind Speed: <3m/s\nDuring Rain: Do not Spray\nDo not operate if visibility during mist/fog is not good",
          "SITE SPECIFIC": "SITE SPECIFIC",
          "Plain land: take care of obstacles present in field: Yes\nSloppy terrain: Use terrain following sensors: Yes\nDo not operate if visibility during mist/fog is not good":
            "Plain land: take care of obstacles present in field: Yes\nSloppy terrain: Use terrain following sensors: Yes\nDo not operate if visibility during mist/fog is not good",
          "LENGTH OF BUFFER ZONE (M) TO AVOID":
            "LENGTH OF BUFFER ZONE (M) TO AVOID",
          "Non targeted crops: 5\nWater bodies etc: 100":
            "Non targeted crops: 5\nWater bodies etc: 100",
          "As the larvae of Army worm are active at night, spraying in the evening is more advantageous.":
            "As the larvae of Army worm are active at night, spraying in the evening is more advantageous.",
          "Spraying chemical insecticides early in the crop cycle are most likely to kill off the natural enemies and may not be economical.":
            "Spraying chemical insecticides early in the crop cycle are most likely to kill off the natural enemies and may not be economical.",
          "Precautions for pesticide use: Not more than two chemical sprays are to be used in entire crop duration. Same chemical should not be chosen for second spray. Sprays should always be directed towards whorl and applied either in early hours of the day or in the evening time.":
            "Precautions for pesticide use: Not more than two chemical sprays are to be used in entire crop duration. Same chemical should not be chosen for second spray. Sprays should always be directed towards whorl and applied either in early hours of the day or in the evening time.",
        },
      },
      hi: {
        translation: {
          "Get Started": "शुरू करें",
          "Welcome to Chirag Connect": "चिराग कनेक्ट में आपका स्वागत है",
          "Please select your preferred language":
            "कृपया अपनी पसंदीदा भाषा चुनें",
          "You can change your app language at any time from Profile > Language":
            "आप किसी भी समय प्रोफ़ाइल > भाषा से अपनी ऐप की भाषा बदल सकते हैं",
          Next: "अगला",
          "Lorem ipsum dolor sit amet consetuer":
            "लोरेम इप्सम डोलर सिट अमेट कॉन्सेक्टेतुर",
          "Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer Lorem ipsum dolor sit amet consetuer":
            "लोरेम इप्सम डोलर सिट अमेट कॉन्सेक्टेतुर लोरेम इप्सम डोलर सिट अमेट कॉन्सेक्टेतुर लोरेम इप्सम डोलर सिट अमेट कॉन्सेक्टेतुर",
          "Hey there": "नमस्ते",
          "Login to continue": "जारी रखने के लिए लॉगिन करें",
          "Signup to continue": "जारी रखने के लिए साइन अप करें",
          "Your Mobile Number": "आपका मोबाइल नंबर",
          "Signup with": "के साथ साइन अप करें",
          "Enter authentication code": "प्रमाणीकरण कोड दर्ज करें",
          "Enter the 4-digit code that we have sent to your registered mobile number.":
            "वह 4-अंकों का कोड दर्ज करें जो हमने आपके पंजीकृत मोबाइल नंबर पर भेजा है।",
          "Didn't receive code? Resend": "कोड नहीं मिला? पुनः भेजें",
          "Complete your registration": "अपना पंजीकरण पूरा करें",
          "Enter Name*": "नाम दर्ज करें*",
          "Enter Your Mobile Number": "अपना मोबाइल नंबर दर्ज करें",
          "Enter Email ID*": "ईमेल आईडी दर्ज करें*",
          Male: "पुरुष",
          Female: "महिला",
          "Enter State*": "राज्य दर्ज करें*",
          "Enter Village*": "गाँव दर्ज करें*",
          "Enter Region*": "क्षेत्र दर्ज करें*",
          "Aadhaar card": "आधार कार्ड",
          "Front side of Aadhaar card": "आधार कार्ड का सामने का हिस्सा",
          "Back side of Aadhaar card": "आधार कार्ड का पीछे का हिस्सा",
          "Aadhaar Authentication Successful": "आधार प्रमाणीकरण सफल",
          "Don't have an account? Signup": "खाता नहीं है? साइन अप करें",
          "Already have an account? Login": "पहले से ही एक खाता है? लॉगिन करें",
          Continue: "जारी रखें",
          "OTP sent successfully": "OTP सफलतापूर्वक भेजा गया",
          "User not found or registration incomplete. Please sign up.":
            "उपयोगकर्ता नहीं मिला या पंजीकरण अपूर्ण है। कृपया साइन अप करें।",
          "Farmer details not found: Please sign up to continue":
            "किसान का विवरण नहीं मिला: जारी रखने के लिए कृपया साइन अप करें",
          "Login successful": "लॉगिन सफल",
          "OTP verified successfully": "OTP सफलतापूर्वक सत्यापित किया गया",
          "Invalid OTP": "अमान्य OTP",
          "Farmer registered successfully": "किसान सफलतापूर्वक पंजीकृत",
          "Aadhaar uploaded successfully": "आधार सफलतापूर्वक अपलोड किया गया",
          "Aadhaar verified successfully": "आधार सफलतापूर्वक सत्यापित किया गया",
          "OTP resent successfully": "OTP सफलतापूर्वक पुनः भेजा गया",
          "Failed to resend OTP": "OTP पुनः भेजने में विफल",
          "Name is required": "नाम आवश्यक है",
          "Email is required": "ईमेल आवश्यक है",
          "Gender is required": "लिंग आवश्यक है",
          "State is required": "राज्य आवश्यक है",
          "Village is required": "गाँव आवश्यक है",
          "Region is required": "क्षेत्र आवश्यक है",
          Wallet: "वॉलेट",
          "Manage Addresses": "पते प्रबंधित करें",
          "My profile": "मेरी प्रोफ़ाइल",
          Settings: "सेटिंग्स",
          "Terms and conditions": "नियम और शर्तें",
          "Privacy Policy": "गोपनीयता नीति",
          "Rate app": "ऐप को रेट करें",
          User: "उपयोगकर्ता",
          "Not available": "उपलब्ध नहीं",
          "Bookings and plans": "बुकिंग और योजनाएँ",
          "Help & Support": "सहायता और समर्थन",
          Logout: "लॉग आउट",
          Version: "संस्करण",
          "Confirm Logout": "लॉगआउट की पुष्टि करें",
          "Are you sure you want to logout?":
            "क्या आप वाकई लॉगआउट करना चाहते हैं?",
          Cancel: "रद्द करें",
          Confirm: "पुष्टि करें",
          Back: "वापस",
          "Rate Our App": "हमारे ऐप को रेट करें",
          "We would love to hear your feedback!":
            "हम आपकी प्रतिक्रिया सुनना चाहेंगे!",
          "Tell us what you think...": "हमें बताएं कि आप क्या सोचते हैं...",
          "Already Rated": "पहले से रेट किया गया",
          Submit: "जमा करें",
          "You've already rated this app":
            "आपने पहले ही इस ऐप को रेट कर दिया है",
          "Edit Account": "खाता संपादित करें",
          NAME: "नाम",
          EDIT: "संपादित करें",
          "PHONE NUMBER": "फोन नंबर",
          "EMAIL ADDRESS": "ईमेल पता",
          "My Addresses": "मेरे पते",
          "Add Address": "पता जोड़ें",
          "No addresses found": "कोई पता नहीं मिला",
          DELETE: "हटाएं",
          EDIT: "संपादित करें",
          "Add New Address": "नया पता जोड़ें",
          Street: "सड़क",
          City: "शहर",
          State: "राज्य",
          "Postal Code": "पिन कोड",
          Country: "देश",
          Add: "जोड़ें",
          Update: "अपडेट करें",
          "Edit Address": "पता संपादित करें",
          "Confirm Delete": "हटाने की पुष्टि करें",
          "Are you sure you want to delete this address?":
            "क्या आप वाकई इस पते को हटाना चाहते हैं?",
          Delete: "हटाएं",
          DONE: "पूर्ण",
          "Customer support": "ग्राहक सहायता",
          "Customer support?": "ग्राहक सहायता?",
          "Lorem ipsum is simply dummy text of the printing and typesetting industry.":
            "लोरेम इप्सम मुद्रण और टाइपसेटिंग उद्योग का केवल डमी टेक्स्ट है।",
          "Chat with us": "हमसे चैट करें",
          "Request a callback": "कॉलबैक का अनुरोध करें",
          "Name*": "नाम*",
          "Mobile Number*": "मोबाइल नंबर*",
          "Subject*": "विषय*",
          Submit: "जमा करें",
          "Terms and Conditions": "नियम और शर्तें",
          "Privacy Policy": "गोपनीयता नीति",
          "Last Updated": "अंतिम अपडेट",
          "1. Acceptance of Terms": "1. नियमों की स्वीकृति",
          "By accessing or using the Chirag app, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our app.":
            "चिराग ऐप का उपयोग करके, आप इन नियमों और शर्तों का पालन करने और उनसे बाध्य होने के लिए सहमत होते हैं। यदि आप इन शर्तों के किसी भी हिस्से से सहमत नहीं हैं, तो कृपया हमारे ऐप का उपयोग न करें।",
          "2. Use of Services": "2. सेवाओं का उपयोग",
          "Our app provides drone-based farming services. You agree to use these services only for lawful purposes and in accordance with these Terms and Conditions.":
            "हमारा ऐप ड्रोन-आधारित कृषि सेवाएं प्रदान करता है। आप इन सेवाओं का उपयोग केवल कानूनी उद्देश्यों के लिए और इन नियमों और शर्तों के अनुसार करने के लिए सहमत हैं।",
          "3. User Accounts": "3. उपयोगकर्ता खाते",
          "To use certain features of the app, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.":
            "ऐप की कुछ सुविधाओं का उपयोग करने के लिए, आपको एक खाता बनाने की आवश्यकता हो सकती है। आप अपने खाते की जानकारी की गोपनीयता बनाए रखने और अपने खाते के तहत होने वाली सभी गतिविधियों के लिए जिम्मेदार हैं।",
          "4. Privacy Policy": "4. गोपनीयता नीति",
          "Your use of the Chirag app is also governed by our Privacy Policy, which can be found in the app settings.":
            "चिराग ऐप के आपके उपयोग को हमारी गोपनीयता नीति द्वारा भी नियंत्रित किया जाता है, जो ऐप सेटिंग्स में पाई जा सकती है।",
          "5. Intellectual Property": "5. बौद्धिक संपदा",
          "All content, features, and functionality of the Chirag app are owned by us or our licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.":
            "चिराग ऐप की सभी सामग्री, सुविधाएं और कार्यक्षमता हमारे या हमारे लाइसेंसधारकों के स्वामित्व में हैं और अंतरराष्ट्रीय कॉपीराइट, ट्रेडमार्क, पेटेंट, व्यापार रहस्य और अन्य बौद्धिक संपदा कानूनों द्वारा संरक्षित हैं।",
          "6. Limitation of Liability": "6. देयता की सीमा",
          "We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the app.":
            "हम ऐप के आपके उपयोग या उपयोग करने में असमर्थता के परिणामस्वरूप किसी भी अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी या दंडात्मक क्षति के लिए उत्तरदायी नहीं होंगे।",
          "7. Changes to Terms": "7. नियमों में परिवर्तन",
          "We reserve the right to modify these Terms and Conditions at any time. We will notify users of any significant changes. Your continued use of the app after such modifications constitutes your acceptance of the new terms.":
            "हम किसी भी समय इन नियमों और शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं। हम किसी भी महत्वपूर्ण परिवर्तन के बारे में उपयोगकर्ताओं को सूचित करेंगे। ऐसे संशोधनों के बाद ऐप का आपका निरंतर उपयोग नए नियमों की आपकी स्वीकृति का गठन करता है।",
          "8. Termination": "8. समाप्ति",
          "We may terminate or suspend your account and access to the app at our sole discretion, without prior notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason.":
            "हम अपने एकमात्र विवेक से, बिना किसी पूर्व सूचना के, ऐसे आचरण के लिए आपके खाते और ऐप तक पहुंच को समाप्त या निलंबित कर सकते हैं, जो हमारा मानना है कि इन नियमों और शर्तों का उल्लंघन करता है या अन्य उपयोगकर्ताओं, हमें, या तीसरे पक्ष के लिए हानिकारक है, या किसी अन्य कारण से।",
          "9. Governing Law": "9. शासी कानून",
          "These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.":
            "ये नियम और शर्तें [आपका देश/राज्य] के कानूनों के अनुसार नियंत्रित और निर्मित की जाएंगी, बिना इसके कानून के प्रावधानों के टकराव पर ध्यान दिए।",
          "10. Contact Us": "10. हमसे संपर्क करें",
          "If you have any questions about these Terms and Conditions, please contact us at support@chiragapp.com.":
            "यदि आपके पास इन नियमों और शर्तों के बारे में कोई प्रश्न हैं, तो कृपया हमें support@chiragapp.com पर संपर्क करें।",
          "1. Introduction": "1. परिचय",
          "Chirag App is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our app.":
            "चिराग ऐप आपकी गोपनीयता की रक्षा के लिए प्रतिबद्ध है। यह गोपनीयता नीति बताती है कि जब आप हमारे ऐप का उपयोग करते हैं तो हम आपकी व्यक्तिगत जानकारी कैसे एकत्र करते हैं, उपयोग करते हैं और सुरक्षित रखते हैं।",
          "2. Information We Collect": "2. हम जो जानकारी एकत्र करते हैं",
          "We collect information you provide directly to us, such as your name, contact information, and farm details when you register for an account or use our services. We may also collect information about your device and app usage.":
            "हम वह जानकारी एकत्र करते हैं जो आप सीधे हमें प्रदान करते हैं, जैसे कि आपका नाम, संपर्क जानकारी और खेत का विवरण जब आप एक खाता पंजीकृत करते हैं या हमारी सेवाओं का उपयोग करते हैं। हम आपके उपकरण और ऐप उपयोग के बारे में भी जानकारी एकत्र कर सकते हैं।",
          "3. How We Use Your Information":
            "3. हम आपकी जानकारी का उपयोग कैसे करते हैं",
          "We use the information we collect to provide, maintain, and improve our services, to process your requests, and to send you updates and other information related to the app.":
            "हम एकत्र की गई जानकारी का उपयोग अपनी सेवाओं को प्रदान करने, बनाए रखने और सुधारने, आपके अनुरोधों को संसाधित करने और आपको ऐप से संबंधित अपडेट और अन्य जानकारी भेजने के लिए करते हैं।",
          "4. Data Sharing and Disclosure": "4. डेटा साझाकरण और प्रकटीकरण",
          "We do not sell your personal information. We may share your information with service providers who assist us in providing our services, or if required by law.":
            "हम आपकी व्यक्तिगत जानकारी नहीं बेचते हैं। हम आपकी जानकारी उन सेवा प्रदाताओं के साथ साझा कर सकते हैं जो हमें अपनी सेवाएं प्रदान करने में सहायता करते हैं, या यदि कानून द्वारा आवश्यक हो।",
          "5. Data Security": "5. डेटा सुरक्षा",
          "We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction, or damage.":
            "हम आपकी व्यक्तिगत जानकारी को अनधिकृत या गैरकानूनी प्रसंस्करण और आकस्मिक हानि, विनाश या क्षति से बचाने के लिए उचित तकनीकी और संगठनात्मक उपाय लागू करते हैं।",
          "6. Your Rights": "6. आपके अधिकार",
          "You have the right to access, correct, or delete your personal information. You can manage your information through your account settings or by contacting us directly.":
            "आपको अपनी व्यक्तिगत जानकारी तक पहुंचने, उसे सही करने या हटाने का अधिकार है। आप अपने खाता सेटिंग्स के माध्यम से या सीधे हमसे संपर्क करके अपनी जानकारी का प्रबंधन कर सकते हैं।",
          "7. Changes to This Policy": "7. इस नीति में परिवर्तन",
          'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.':
            'हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पृष्ठ पर नई गोपनीयता नीति पोस्ट करके और "अंतिम अपडेट" तिथि को अपडेट करके आपको किसी भी परिवर्तन के बारे में सूचित करेंगे।',
          "8. Data Retention": "8. डेटा प्रतिधारण",
          "We retain your personal information for as long as necessary to provide you with our services and as described in this Privacy Policy. We may also retain and use this information to comply with our legal obligations, resolve disputes, and enforce our agreements.":
            "हम आपकी व्यक्तिगत जानकारी को तब तक बनाए रखते हैं जब तक आपको हमारी सेवाएं प्रदान करने के लिए आवश्यक हो और जैसा कि इस गोपनीयता नीति में वर्णित है। हम अपने कानूनी दायित्वों का पालन करने, विवादों को हल करने और हमारे समझौतों को लागू करने के लिए भी इस जानकारी को बनाए रख सकते हैं और उपयोग कर सकते हैं।",
          "9. Third-Party Services": "9. तृतीय-पक्ष सेवाएं",
          "Our app may contain links to third-party websites or services. We are not responsible for the content or privacy practices of these third parties. We encourage you to read the privacy policies of any third-party services you use.":
            "हमारे ऐप में तृतीय-पक्ष वेबसाइटों या सेवाओं के लिंक हो सकते हैं। हम इन तृतीय पक्षों की सामग्री या गोपनीयता प्रथाओं के लिए जिम्मेदार नहीं हैं। हम आपको किसी भी तृतीय-पक्ष सेवाओं की गोपनीयता नीतियों को पढ़ने के लिए प्रोत्साहित करते हैं जिनका आप उपयोग करते हैं।",
          "If you have any questions about this Privacy Policy, please contact us at privacy@chiragapp.com.":
            "यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमें privacy@chiragapp.com पर संपर्क करें।",
          "Crop Selection": "फसल चयन",
          "Based on your location and soil type, we recommend planting wheat or barley for the upcoming season.":
            "आपके स्थान और मिट्टी के प्रकार के आधार पर, हम आगामी मौसम के लिए गेहूं या जौ की बुवाई की सिफारिश करते हैं।",
          Irrigation: "सिंचाई",
          "Implement a drip irrigation system to conserve water and improve crop yield.":
            "पानी की बचत और फसल उपज में सुधार के लिए ड्रिप सिंचाई प्रणाली लागू करें।",
          Fertilization: "उर्वरक",
          "Apply a balanced NPK fertilizer in the ratio of 10-26-26 at a rate of 250 kg/ha.":
            "250 किग्रा/हेक्टेयर की दर से 10-26-26 के अनुपात में संतुलित NPK उर्वरक लागू करें।",
          "Pest Control": "कीट नियंत्रण",
          "Monitor for aphids and use neem-based organic pesticides if infestation occurs.":
            "एफिड्स की निगरानी करें और संक्रमण होने पर नीम-आधारित जैविक कीटनाशकों का उपयोग करें।",
          "Permission to access location was denied":
            "स्थान तक पहुंच की अनुमति नहीं दी गई",
          "Please fill all fields": "कृपया सभी फ़ील्ड भरें",
          "Please accept the recommendations":
            "कृपया सिफारिशों को स्वीकार करें",
          "Location not found": "स्थान नहीं मिला",
          "Error searching location": "स्थान खोजने में त्रुटि",
          "Farm Location": "खेत का स्थान",
          "Pratapgarh, Uttar pradesh": "प्रतापगढ़, उत्तर प्रदेश",
          "Search crop": "फसल खोजें",
          Enter: "दर्ज करें",
          "Full Name": "पूरा नाम",
          "Enter full Name": "पूरा नाम दर्ज करें",
          "Contact Number": "संपर्क नंबर",
          "Enter contact Number": "संपर्क नंबर दर्ज करें",
          Date: "तारीख",
          "Select time slot": "समय स्लॉट चुने",
          "Farm Area (in Acres)": "खेती की आकार (एकूण एकूण किः)",
          "Enter farm area (in Acres)":
            "खेती की आकार दर्ज करें (एकूण एकूण किः)",
          Weather: "मौसम",
          "24 degrees": "24 रेडिंग",
          "Crop name": "फसल का नाम",
          "Enter Your Full Name": "अपना पूरा नाम दर्ज करें",
          "Crop Output per acre of land":
            "खेती के लोगों के लिए एकूण रूप से फसल का उत्पन्नता",
          "Enter Crop Output per acre of land":
            "खेती के लोगों के लिए एकूण रूप से फसल का उत्पन्नता दर्ज करें",
          "Enter your contact number": "अपना संपर्क नंबर दर्ज करें",
          "Have you used drone or Additional Service":
            "ड्रोन या अतिरिक्त सेवा का उपयोग किया गया है?",
          Yes: "हां",
          No: "नहीं",
          "Recommendation for": "दिलचस्प के लिए अनुशंसित सिफारिश",
          "Please read the Recommendation carefully!":
            "कृपया ध्यान दें अनुशंसित सिफारिश पढ़ें!",
          "Please accept the recommendations":
            "कृपया सिफारिशों को स्वीकार करें",
          "I have read all the recommendations carefully.":
            "मैं सिफारिशों को साफ कर रहा हूं।",
          "Selected Location": "चयनित स्थान",
          "Current Location": "वर्तमान स्थान",
          "Search for a location": "स्थान खोजें",
          Search: "खोजें",
          "Use current location": "वर्तमान स्थान का उपयोग करें",
          "Book a Service": "सेवा देखें",
          "Details of previous yield": "पिछली लाइयों का विवरण",
          "Select location": "स्थान चुनें",
          Next: "आगे",
          "Book Now": "अब बुक करें",
          Skip: "स्किप",
          Booking: "बुकिंग",
          "Booking Requested!": "बुकिंग का अनुरोध किया गया!",
          "Address not available": "पता उपलब्ध नहीं है",
          "Booking Name": "बुकिंग नाम",
          "Not provided": "प्रदान नहीं किया गया",
          "Contact number": "संपर्क नंबर",
          "Farm Area": "खेत का क्षेत्र",
          Crop: "फसल",
          "N/A": "लागू नहीं",
          "Humidity not available": "आर्द्रता उपलब्ध नहीं है",
          "Location not available": "स्थान उपलब्ध नहीं है",
          "Date not provided": "तिथि प्रदान नहीं की गई",
          "Vendor assigned": "विक्रेता नियुक्त",
          "Digital sky Drone services": "डिजिटल स्काई ड्रोन सेवाएं",
          "2 years of experience": "2 साल का अनुभव",
          "Call now": "अभी कॉल करें",
          "Booking Successful!": "बुकिंग सफल!",
          "Your booking has been confirmed with":
            "आपकी बुकिंग की पुष्टि कर दी गई है",
          "the vendor": "विक्रेता",
          "Go to Homepage": "होमपेज पर जाएं",
          "DRONE FLYING SPEED": "ड्रोन उड़ान की गति",
          "During Spraying: (4.5-5.0)\nDuring Turning RTL etc: <5.5":
            "स्प्रे करते समय: (4.5-5.0)\nमुड़ते समय RTL आदि: <5.5",
          "HEIGHT ABOVE CROP CANOPY (m)": "फसल छत्र के ऊपर की ऊंचाई (मी)",
          "Good staging crops: 1.5-2.5 m\nVarities prone to lodge: 2.0-2.5 m":
            "अच्छी स्टेजिंग फसलें: 1.5-2.5 मी\nलॉज होने वाली किस्में: 2.0-2.5 मी",
          "WATER VOLUME (L/HA)": "पानी की मात्रा (ली/हेक्टेयर)",
          "Stage 1: Early stage: 20\nFull canopy stage: 25":
            "चरण 1: प्रारंभिक अवस्था: 20\nपूर्ण छत्र अवस्था: 25",
          NOZZLES: "नोजल",
          "Type of nozzle: Anti Drift fan\nDroplet size (μm) Insecticide: 250-350\nDroplet size (μm) Fungicide: 250-350\nNozzle discharge rate (l/min): 0.3-0.6\nAngle: 60-120\nSwath (m): 3-6\nNumber of Nozzles: 4-6\nPressure (bar): 2-3":
            "नोजल का प्रकार: एंटी ड्रिफ्ट फैन\nबूंद का आकार (μm) कीटनाशक: 250-350\nबूंद का आकार (μm) फफूंदनाशक: 250-350\nनोजल निर्वहन दर (ली/मिनट): 0.3-0.6\nकोण: 60-120\nस्वाथ (मी): 3-6\nनोजल की संख्या: 4-6\nदबाव (बार): 2-3",
          "SUITABLE TIME OF SPRAY": "स्प्रे का उपयुक्त समय",
          "Summer & rainy season: 6am-10am & 3pm-6pm\nWinter season: 8am-11am & 2pm-5pm\nStrictly avoid spraying during Flowering season: 6am-11am":
            "गर्मी और बरसात का मौसम: सुबह 6 बजे - 10 बजे और दोपहर 3 बजे - 6 बजे\nसर्दी का मौसम: सुबह 8 बजे - 11 बजे और दोपहर 2 बजे - 5 बजे\nफूल आने के मौसम में स्प्रे करने से सख्ती से बचें: सुबह 6 बजे - 11 बजे",
          "ENVIRONMENTAL CONDITIONS": "पर्यावरणीय परिस्थितियाँ",
          "Temperature: <35°C\nHumidity: >50%\nWind Speed: <3m/s\nDuring Rain: Do not Spray\nDo not operate if visibility during mist/fog is not good":
            "तापमान: <35°C\nआर्द्रता: >50%\nहवा की गति: <3m/s\nबारिश के दौरान: स्प्रे न करें\nधुंध/कोहरे के दौरान दृश्यता अच्छी न होने पर संचालन न करें",
          "SITE SPECIFIC": "स्थान विशिष्ट",
          "Plain land: take care of obstacles present in field: Yes\nSloppy terrain: Use terrain following sensors: Yes\nDo not operate if visibility during mist/fog is not good":
            "समतल भूमि: खेत में मौजूद बाधाओं का ध्यान रखें: हाँ\nढलान वाला इलाका: इलाके के अनुसार सेंसर का उपयोग करें: हाँ\nधुंध/कोहरे के दौरान दृश्यता अच्छी न होने पर संचालन न करें",
          "LENGTH OF BUFFER ZONE (M) TO AVOID":
            "बचाव के लिए बफर क्षेत्र की लंबाई (मी)",
          "Non targeted crops: 5\nWater bodies etc: 100":
            "गैर-लक्षित फसलें: 5\nजल निकाय आदि: 100",
          "As the larvae of Army worm are active at night, spraying in the evening is more advantageous.":
            "चूंकि सेना कीट के लार्वा रात में सक्रिय होते हैं, शाम को स्प्रे करना अधिक लाभदायक होता है।",
          "Spraying chemical insecticides early in the crop cycle are most likely to kill off the natural enemies and may not be economical.":
            "फसल चक्र की शुरुआत में रासायनिक कीटनाशकों का छिड़काव प्राकृतिक शत्रुओं को मारने की संभावना रखता है और आर्थिक रूप से लाभदायक नहीं हो सकता।",
          "Precautions for pesticide use: Not more than two chemical sprays are to be used in entire crop duration. Same chemical should not be chosen for second spray. Sprays should always be directed towards whorl and applied either in early hours of the day or in the evening time.":
            "कीटनाशकों के उपयोग के लिए सावधानियाँ: पूरी फसल अवधि में दो से अधिक रासायनिक स्प्रे का उपयोग नहीं किया जाना चाहिए। दूसरे स्प्रे के लिए समान रसायन नहीं चुना जाना चाहिए। स्प्रे हमेशा पत्ती के केंद्र की ओर निर्देशित किया जाना चाहिए और या तो दिन के शुरुआती घंटों में या शाम के समय लागू किया जाना चाहिए।",
        },
      },
    },
    fallbackLng: "en",
    lng: "en",
    detection: {
      order: ["asyncStorage", "navigator"],
      caches: ["asyncStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export const changeLanguage = async (lang) => {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem("language", lang);
};

export default i18n;
