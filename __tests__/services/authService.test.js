import { authService } from "../../src/services/authService";
import { publicApiClient } from "../../src/services/api";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("../../src/services/api", () => ({
  publicApiClient: {
    post: jest.fn(),
  },
}));

jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));

describe("authService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("calls API and returns user", async () => {
      const mockUser = { id: "u1", email: "test@test.com" };
      publicApiClient.post.mockResolvedValue({ data: mockUser });

      const result = await authService.register({ email: "test@test.com" });

      expect(publicApiClient.post).toHaveBeenCalledWith("/auth/register", {
        email: "test@test.com",
      });
      expect(result).toEqual({ user: mockUser });
    });

    it("throws when API fails", async () => {
      const error = new Error("Registration failed");
      publicApiClient.post.mockRejectedValue(error);

      await expect(
        authService.register({ email: "fail@test.com" })
      ).rejects.toThrow("Registration failed");
    });
  });

  describe("login", () => {
    it("logs in with simple token structure", async () => {
      const mockUser = { id: "u1", email: "test@test.com" };
      const mockToken = "jwt-token";
      publicApiClient.post.mockResolvedValue({
        data: { token: mockToken, user: mockUser },
      });

      const result = await authService.login("test@test.com", "password");

      expect(publicApiClient.post).toHaveBeenCalledWith("/auth/login", {
        email: "test@test.com",
        password: "password",
      });
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        "userToken",
        mockToken
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify(mockUser)
      );
      expect(result).toEqual(mockUser);
    });

    it("logs in with nested token structure", async () => {
      const mockUser = { id: "u2", email: "nested@test.com" };
      const mockToken = "nested-token";
      publicApiClient.post.mockResolvedValue({
        data: { token: { token: mockToken, user: mockUser } },
      });

      const result = await authService.login("nested@test.com", "1234");

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        "userToken",
        mockToken
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify(mockUser)
      );
      expect(result).toEqual(mockUser);
    });

    it("logs in with data wrapper structure", async () => {
      const mockUser = { id: "u3", email: "data@test.com" };
      const mockToken = "data-token";
      publicApiClient.post.mockResolvedValue({
        data: { data: { token: mockToken, user: mockUser } },
      });

      const result = await authService.login("data@test.com", "pass");

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        "userToken",
        mockToken
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify(mockUser)
      );
      expect(result).toEqual(mockUser);
    });

    it("throws error if no token or user returned", async () => {
      publicApiClient.post.mockResolvedValue({ data: {} });

      await expect(authService.login("fail@test.com", "123")).rejects.toThrow(
        "Invalid authentication response"
      );
    });

    it("throws when API fails", async () => {
      const error = new Error("Login failed");
      publicApiClient.post.mockRejectedValue(error);

      await expect(authService.login("error@test.com", "1234")).rejects.toThrow(
        "Login failed"
      );
    });
  });
});
