import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.172.62:5000/api/runners"; // wifi

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  async (config) => {
    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        throw new Error("No internet connection");
      }

      const storedUserData = await AsyncStorage.getItem("userData");
      const userData = storedUserData ? JSON.parse(storedUserData) : null;
      const token = userData?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["Content-Type"] = "application/json";

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ApiService = {
  async registerRunner(data) {
    try {
      const response = await instance.post("/register", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async getRunnerDetailsByMobileNumber(data) {
    try {
      const response = await instance.post(
        "/get-runner-by-mobile-number",
        data
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async sendOtp(data) {
    try {
      const response = await instance.post("/send-otp", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async verifyOtp(data) {
    try {
      const response = await instance.post("/verify-otp", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async submitAadhaarOtp(data) {
    try {
      const response = await instance.post("/submit-otp", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async updateRunnerProfile(data) {
    try {
      const response = await instance.put("/profile", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async addRunnerAddress(data) {
    try {
      const response = await instance.post("/address", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },
  async generateAadhaarOtp(data) {
    try {
      const response = await instance.post("/generate-otp", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async updateRunnerAddress(data) {
    try {
      const response = await instance.put("/address", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async deleteRunnerAddress(data) {
    try {
      const response = await instance.delete("/address", { data });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async getRunnerAddresses() {
    try {
      const response = await instance.get("/addresses");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },
  async getTestemonials() {
    try {
      const response = await instance.get("/testimonials");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },
  async createRating(data) {
    try {
      const response = await instance.post("/ratings", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },
  async getRatings() {
    try {
      const response = await instance.get("/ratings");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async getAllVendors() {
    try {
      const response = await instance.get("/vendors");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async getBookings() {
    try {
      const response = await instance.get("/v1");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async updateBooking(id, data) {
    try {
      const response = await instance.put(`/v1/${id}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  // async uploadImage(formData) {
  //   try {
  //     const response = await instance.post("/files/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     this.handleError(error);
  //   }
  // },

  async completeBooking(id, data) {
    try {
      const response = await instance.put(`/v1/${id}/complete`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  handleError(error) {
    if (error.message === "No internet connection") {
      console.error(
        "No internet connection. Please check your network settings."
      );
      // You can dispatch an action or update state to show a "No Internet" message in the UI
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server Error:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }
    throw error; // Re-throw the error so it can be caught in the component
  },
};

export default ApiService;
