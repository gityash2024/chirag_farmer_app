import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import ApiService from "../services/api";
import { useApp } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUserData } from "../../utils/auth";
import axios from "axios";
import { SvgXml } from "react-native-svg";
import { Picker } from "@react-native-picker/picker";

const backIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const AuthScreens = ({ navigation }) => {
  const [clientId, setClientId] = useState("");
  const { t } = useTranslation();
  const { showLoader, hideLoader, showToast } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [signupStep, setSignupStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpArray, setOtpArray] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [aadhaarData, setAadhaarData] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    state: "",
    village: "",
    regionField: "",
    profilePhoto: null,
    aadhaarFront: null,
    aadhaarBack: null,
    aadhaarNumber: "",
    aadhaarOtp: "",
    profilePic: null,
    profilePicPreview: null,
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    if (aadhaarData) {
      setFormData((prevData) => ({
        ...prevData,
        name: aadhaarData.full_name || "",
        email: aadhaarData.email_hash || "",
        gender: aadhaarData.gender === "M" ? "Male" : "Female",
        state: aadhaarData.address?.state || "",
        village: aadhaarData.address?.vtc || "",
        aadhaarNumber: aadhaarData.aadhaar_number || "",
      }));
    }
  }, [aadhaarData]);

  const fetchVendors = async () => {
    try {
      const response = await ApiService.getAllVendors();
      console.log(
        response,
        "response===============----------------->>>>>>>>>>>>>>>>>"
      );
      setVendors(response);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      showToast(t("Failed to fetch vendors"), "error");
    }
  };

  const resetFormData = (step) => {
    if (step !== 6) {
      setFormData({
        name: "",
        email: "",
        gender: "",
        state: "",
        village: "",
        regionField: "",
        profilePhoto: null,
        aadhaarFront: null,
        aadhaarBack: null,
        aadhaarNumber: "",
        aadhaarOtp: "",
        profilePic: null,
        profilePicPreview: null,
      });
    }
    setOtp("");
    setOtpArray(["", "", "", ""]);
  };

  const setSignupStepWithReset = (step) => {
    resetFormData(step);
    setSignupStep(step);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = t("Name is required");
    if (!formData.email) errors.email = t("Email is required");
    if (!formData.gender) errors.gender = t("Gender is required");
    if (!formData.state) errors.state = t("State is required");
    if (!formData.village) errors.village = t("Village is required");
    if (!formData.regionField) errors.regionField = t("Region is required");
    if (!formData.aadhaarNumber)
      errors.aadhaarNumber = t("Aadhaar number is required");
    if (!formData.aadhaarOtp) errors.aadhaarOtp = t("Aadhaar OTP is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = t("Invalid email format");
    if (!/^\d{10}$/.test(mobileNumber))
      errors.mobileNumber = t("Invalid mobile number");

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => showToast(error, "error"));
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleContinue = async () => {
    showLoader();
    try {
      if (isLogin) {
        if (signupStep === 1) {
          try {
            const runnerDetails =
              await ApiService.getRunnerDetailsByMobileNumber({ mobileNumber });
            if (runnerDetails && runnerDetails.email) {
              const response = await ApiService.sendOtp({ mobileNumber });
              setOtp("");
              showToast(t("OTP sent successfully"), "success");
              setSignupStepWithReset(2);
            } else {
              showToast(
                t("User not found or registration incomplete. Please sign up."),
                "error"
              );
              setIsLogin(false);
              setSignupStepWithReset(1);
            }
          } catch (error) {
            showToast(
              t("Runner details not found: Please sign up to continue"),
              "error"
            );
          }
        } else if (signupStep === 2) {
          let response = await ApiService.verifyOtp({ otp, mobileNumber });
          response.role = "runner";
          await saveUserData(response);
          await AsyncStorage.setItem("isLoggedIn", "true");
          showToast(t("Login successful"), "success");
          navigation.replace("AuthenticatedScreens");
        }
      } else {
        if (signupStep === 1) {
          try {
            const runnerDetails =
              await ApiService.getRunnerDetailsByMobileNumber({ mobileNumber });
            if (runnerDetails && runnerDetails.email) {
              showToast(t("Runner already exists. Please login."), "error");
              setIsLogin(true);
              setSignupStepWithReset(1);
              return;
            }
            const response = await ApiService.sendOtp({ mobileNumber });
            setOtp("");
            showToast(t("OTP sent successfully"), "success");
            setSignupStepWithReset(2);
          } catch (error) {
            const response = await ApiService.sendOtp({ mobileNumber });
            setOtp("");
            showToast(t("OTP sent successfully"), "success");
            setSignupStepWithReset(2);
          }
        } else if (signupStep === 2) {
          try {
            const response = await ApiService.verifyOtp({ otp, mobileNumber });
            showToast(t("OTP verified successfully"), "success");
            setSignupStepWithReset(3);
          } catch (error) {
            showToast(t("Invalid OTP"), "error");
          }
        } else if (signupStep === 3) {
          if (!selectedVendor) {
            showToast(t("Please select a vendor"), "error");
            return;
          }
          setSignupStepWithReset(4);
        } else if (signupStep === 4) {
          try {
            const aadhaarResponse = await ApiService.generateAadhaarOtp({
              aadhaarNumber: formData.aadhaarNumber,
              aadharBack: formData.aadhaarBack,
              aadharFront: formData.aadhaarFront,
              mobileNumber: mobileNumber,
            });

            if (aadhaarResponse.success) {
              setClientId(aadhaarResponse?.data?.client_id);
              showToast(t("Aadhaar OTP sent successfully"), "success");
              setSignupStepWithReset(5);
            } else {
              showToast(t("Failed to send Aadhaar OTP"), "error");
            }
          } catch (error) {
            showToast(t("Error generating Aadhaar OTP"), "error");
          }
        } else if (signupStep === 5) {
          try {
            const aadhaarVerifyResponse = await ApiService.submitAadhaarOtp({
              clientId: clientId,
              otp: formData.aadhaarOtp,
              mobileNumber: mobileNumber,
            });
            if (aadhaarVerifyResponse.success) {
              setAadhaarData(aadhaarVerifyResponse?.data?.data);
              showToast(t("Aadhaar verified successfully"), "success");
              setSignupStepWithReset(6);
            } else {
              showToast(t("Failed to verify Aadhaar"), "error");
            }
          } catch (error) {
            showToast(t("Error verifying Aadhaar"), "error");
          }
        } else if (signupStep === 6) {
          const errors = validateForm();
          if (errors) {
            Object.values(errors).forEach((error) => showToast(error, "error"));
            return;
          }
          const response = await ApiService.registerRunner({
            mobileNumber,
            name: formData.name,
            email: formData.email,
            gender: formData.gender,
            state: formData.state,
            village: formData.village,
            region: formData.regionField,
            aadhaarNumber: formData.aadhaarNumber,
            profilePic: formData.profilePic,
            vendor: selectedVendor,
          });
          showToast(t("Runner registered successfully"), "success");
          setIsLogin(true);
          setSignupStepWithReset(1);
        }
      }
    } catch (error) {
      console.error("Error in handleContinue:", error.message);
      showToast(error.message, "error");
    } finally {
      hideLoader();
    }
  };

  const pickImage = async (field) => {
    showLoader();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        let localUri = result.assets[0].uri;
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append("file", { uri: localUri, name: filename, type });

        const response = await axios.post(
          "http://192.168.172.62:5000/api/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.fileUrl) {
          setFormData((prev) => ({
            ...prev,
            [field]: response.data.fileUrl,
            [`${field}Preview`]: localUri,
          }));
          showToast(t("Image uploaded successfully"), "success");
        } else {
          throw new Error("Invalid response from server");
        }
      }
    } catch (error) {
      console.error(
        "Image upload error:",
        error.response?.data || error.message
      );
      showToast(
        t("Failed to upload image: ") +
          (error.response?.data?.message || error.message),
        "error"
      );
    } finally {
      hideLoader();
    }
  };

  const handleProfilePicUpload = async () => {
    showLoader();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        let localUri = result.assets[0].uri;
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append("file", { uri: localUri, name: filename, type });

        const response = await axios.post(
          "http://192.168.172.62:5000/api/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.fileUrl) {
          setFormData((prev) => ({
            ...prev,
            profilePic: response.data.fileUrl,
            profilePicPreview: localUri,
          }));
          showToast(t("Profile picture uploaded successfully"), "success");
        } else {
          throw new Error("Invalid response from server");
        }
      }
    } catch (error) {
      console.error(
        "Image upload error:",
        error.response?.data || error.message
      );
      showToast(
        t("Failed to upload profile picture: ") +
          (error.response?.data?.message || error.message),
        "error"
      );
    } finally {
      hideLoader();
    }
  };

  const getBgImage = () => {
    if (isLogin) {
      return signupStep === 1
        ? require("../../assets/login-signup-background.png")
        : require("../../assets/otp-background.png");
    } else {
      return signupStep === 1
        ? require("../../assets/login-signup-background.png")
        : signupStep === 2
        ? require("../../assets/otp-background.png")
        : signupStep === 3
        ? require("../../assets/login-signup-background.png")
        : null;
    }
  };

  const renderLoginSignup = () => (
    <View style={styles.formContainer}>
      <Image
        source={require("../../assets/chirag-white-screen-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.heyThereText}>{t("Hey there")},</Text>
      <Text style={styles.headerText}>
        {isLogin ? t("Login to continue") : t("Signup to continue")}
      </Text>
      <View style={styles.phoneInputContainer}>
        <Text style={styles.phoneInputLabel}>+91</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder={t("Your Mobile Number")}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.socialSignup}>
        <Text style={styles.socialSignupText}>{t("Signup with")}</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/google-icon.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../assets/apple-icon.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderOtpScreen = () => (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSignupStepWithReset(1)}
        >
          <SvgXml xml={backIconSvg} width="24" height="24" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("Enter authentication code")}</Text>
      </View>
      <Text style={styles.subHeaderText}>
        {t(
          "Enter the 4-digit code that we have sent to your registered mobile number."
        )}
      </Text>
      <View style={styles.otpContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={otpArray[index]}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handleResendOTP}>
        <Text style={styles.resendText}>
          {t("Didn't receive code? Resend")}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderVendorSelection = () => (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSignupStepWithReset(2)}
        >
          <SvgXml xml={backIconSvg} width="24" height="24" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("Select Vendor")}</Text>
      </View>
      <Picker
        selectedValue={selectedVendor}
        onValueChange={(itemValue) => setSelectedVendor(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label={t("Select a vendor")} value="" />
        {vendors.map((vendor) => (
          <Picker.Item
            key={vendor._id}
            label={vendor.name}
            value={vendor._id}
          />
        ))}
      </Picker>
    </View>
  );

  const renderAadhaarUpload = () => (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSignupStepWithReset(3)}
        >
          <SvgXml xml={backIconSvg} width="24" height="24" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("Upload Aadhaar")}</Text>
      </View>
      <View style={styles.aadhaarContainer}>
        <TouchableOpacity
          style={styles.aadhaarBox}
          onPress={() => pickImage("aadhaarFront")}
        >
          {formData.aadhaarFrontPreview ? (
            <Image
              source={{ uri: formData.aadhaarFrontPreview }}
              style={styles.aadhaarImage}
            />
          ) : (
            <>
              <Text style={styles.aadhaarText}>
                {t("Front side of Aadhaar card")}
              </Text>
              <Text style={styles.aadhaarPlus}>+</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.aadhaarBox}
          onPress={() => pickImage("aadhaarBack")}
        >
          {formData.aadhaarBackPreview ? (
            <Image
              source={{ uri: formData.aadhaarBackPreview }}
              style={styles.aadhaarImage}
            />
          ) : (
            <>
              <Text style={styles.aadhaarText}>
                {t("Back side of Aadhaar card")}
              </Text>
              <Text style={styles.aadhaarPlus}>+</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.fullWidthInput}
        placeholder={t("Enter Aadhaar Number")}
        value={formData.aadhaarNumber}
        onChangeText={(text) =>
          setFormData({ ...formData, aadhaarNumber: text })
        }
        keyboardType="number-pad"
      />
    </View>
  );

  const renderAadhaarOtpScreen = () => (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSignupStepWithReset(4)}
        >
          <SvgXml xml={backIconSvg} width="24" height="24" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("Enter Aadhaar OTP")}</Text>
      </View>
      <TextInput
        style={styles.fullWidthInput}
        placeholder={t("Enter Aadhaar OTP")}
        value={formData.aadhaarOtp}
        onChangeText={(text) => setFormData({ ...formData, aadhaarOtp: text })}
        keyboardType="number-pad"
      />
    </View>
  );

  const renderSignupForm = () => (
    <ScrollView contentContainerStyle={styles.formContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSignupStepWithReset(5)}
        >
          <SvgXml xml={backIconSvg} width="24" height="24" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("Complete your registration")}</Text>
      </View>
      <TouchableOpacity
        style={styles.profilePicContainer}
        onPress={handleProfilePicUpload}
      >
        {formData.profilePicPreview ? (
          <Image
            source={{ uri: formData.profilePicPreview }}
            style={styles.profilePic}
          />
        ) : (
          <View style={styles.profilePicPlaceholder}>
            <Text style={styles.profilePicPlus}>+</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.fullWidthInput}
        placeholder={t("Enter Name*")}
        value={formData.name}
        editable={false}
      />
      <TextInput
        style={styles.fullWidthInput}
        placeholder={t("Enter Your Mobile Number")}
        value={mobileNumber}
        editable={false}
      />
      <TextInput
        style={styles.fullWidthInput}
        placeholder={t("Enter Email ID*")}
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            formData.gender === "Male" && styles.selectedGender,
          ]}
          onPress={() => setFormData({ ...formData, gender: "Male" })}
        >
          <Text
            style={[
              styles.genderButtonText,
              formData.gender === "Male" && styles.selectedGenderText,
            ]}
          >
            {t("Male")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            formData.gender === "Female" && styles.selectedGender,
          ]}
          onPress={() => setFormData({ ...formData, gender: "Female" })}
        >
          <Text
            style={[
              styles.genderButtonText,
              formData.gender === "Female" && styles.selectedGenderText,
            ]}
          >
            {t("Female")}
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.fullWidthInput}
        placeholder={t("Enter State*")}
        value={formData.state}
        onChangeText={(text) => setFormData({ ...formData, state: text })}
      />
      <TextInput
        style={styles.fullWidthInput}
        placeholder={t("Enter Village*")}
        value={formData.village}
        onChangeText={(text) => setFormData({ ...formData, village: text })}
      />
      <TextInput
        style={styles.fullWidthInput}
        placeholder={t("Enter Region*")}
        value={formData.regionField}
        onChangeText={(text) => setFormData({ ...formData, regionField: text })}
      />
    </ScrollView>
  );

  const handleOtpChange = (value, index) => {
    const newOtpArray = [...otpArray];
    if (value === "" && newOtpArray[index] !== "") {
      newOtpArray[index] = value;
      setOtpArray(newOtpArray);
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (value !== "") {
      newOtpArray[index] = value;
      setOtpArray(newOtpArray);
      if (index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
    setOtp(newOtpArray.join(""));
  };

  const handleResendOTP = async () => {
    showLoader();
    try {
      const response = await ApiService.sendOtp({ mobileNumber });
      showToast(t("OTP resent successfully"), "success");
    } catch (error) {
      showToast(t("Failed to resend OTP: ") + error.message, "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {signupStep === 2 ? (
        <Image source={getBgImage()} style={styles.backgroundImage2} />
      ) : (
        <Image source={getBgImage()} style={styles.backgroundImage} />
      )}
      {isLogin
        ? signupStep === 1
          ? renderLoginSignup()
          : renderOtpScreen()
        : signupStep === 1
        ? renderLoginSignup()
        : signupStep === 2
        ? renderOtpScreen()
        : signupStep === 3
        ? renderVendorSelection()
        : signupStep === 4
        ? renderAadhaarUpload()
        : signupStep === 5
        ? renderAadhaarOtpScreen()
        : renderSignupForm()}
      <View style={styles.bottomContainer}>
        {(isLogin && signupStep === 1) || (!isLogin && signupStep === 1) ? (
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchAuthText}>
              {isLogin
                ? t("Don't have an account? Signup")
                : t("Already have an account? Login")}
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>{t("Continue")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  backgroundImage: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 20,
  },
  backgroundImage2: {
    position: "absolute",
    bottom: 100,
    right: 0,
  },
  logo: {
    width: 190,
    height: 60,
    marginBottom: 30,
    marginTop: 50,
    alignSelf: "center",
  },
  formContainer: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    marginBottom: 20,
  },
  heyThereText: {
    fontSize: 18,
    color: "#737373",
    marginBottom: 10,
    fontFamily: "PublicSans-Regular",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#121212",
    marginBottom: 20,
    fontFamily: "PublicSans-Bold",
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#121212",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 8,
    marginBottom: 15,
  },
  phoneInputLabel: {
    fontSize: 16,
    color: "#121212",
    paddingHorizontal: 15,
  },
  phoneInput: {
    flex: 1,
    height: "100%",
    color: "#121212",
    fontSize: 16,
  },
  socialSignup: {
    alignItems: "center",
    marginTop: 20,
  },
  socialSignupText: {
    marginBottom: 10,
    color: "#121212",
  },
  socialIcons: {
    flexDirection: "row",
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  switchAuthText: {
    marginBottom: 20,
    color: "#121212",
    fontWeight: "bold",
    fontSize: 12,
  },
  continueButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000000",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  otpInput: {
    width: 70,
    height: 50,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    color: "#121212",
  },
  resendText: {
    color: "#121212",
    marginTop: 20,
  },
  fullWidthInput: {
    width: "100vw",
    height: 50,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontFamily: "PublicSans-Regular",
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  genderButton: {
    width: "48%",
    height: 50,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedGender: {
    backgroundColor: "#121212",
    borderColor: "#121212",
  },
  genderButtonText: {
    fontSize: 16,
    color: "#121212",
  },
  selectedGenderText: {
    color: "#FFFFFF",
  },
  aadhaarLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: 10,
  },
  aadhaarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  aadhaarBox: {
    width: "48%",
    height: 100,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  aadhaarText: {
    textAlign: "center",
    color: "#121212",
  },
  aadhaarPlus: {
    fontSize: 24,
    color: "#121212",
  },
  aadhaarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  profilePicContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicPlus: {
    fontSize: 40,
    color: "#808080",
  },
  picker: {
    width: "100%",
    height: 50,
    marginBottom: 15,
  },
});

export default AuthScreens;
