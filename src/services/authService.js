import { publicApiClient } from "./api";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authService = {
  register: async (userData) => {
    const response = await publicApiClient.post("/auth/register", userData);
    return { user: response.data };
  },

  login: async (email, password) => {
    const response = await publicApiClient.post("/auth/login", {
      email,
      password,
    });

    let jwtToken, user;

    if (response.data.token) {
      if (typeof response.data.token === "string") {
        jwtToken = response.data.token;
        user = response.data.user;
      } else if (response.data.token.token && response.data.token.user) {
        jwtToken = response.data.token.token;
        user = response.data.token.user;
      }
    } else if (response.data.data) {
      jwtToken = response.data.data.token;
      user = response.data.data.user;
    }

    if (!jwtToken || !user) {
      throw new Error("Invalid authentication response");
    }

    await SecureStore.setItemAsync("userToken", jwtToken);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    return user;
  },
};
