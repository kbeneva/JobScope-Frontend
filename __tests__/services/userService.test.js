import { userService } from "../../src/services/userService";
import { privateApiClient } from "../../src/services/api";

jest.mock("../../src/services/api", () => ({
  privateApiClient: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

describe("userService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProfile", () => {
    it("calls privateApiClient.get and returns profile data", async () => {
      const mockData = { id: "u1", name: "Test User" };
      privateApiClient.get.mockResolvedValue({ data: mockData });

      const result = await userService.getProfile();

      expect(privateApiClient.get).toHaveBeenCalledWith("/users/profile");
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Failed to fetch profile");
      privateApiClient.get.mockRejectedValue(error);

      await expect(userService.getProfile()).rejects.toThrow(
        "Failed to fetch profile"
      );
    });
  });

  describe("updateProfile", () => {
    it("calls privateApiClient.put with profileData and returns updated data", async () => {
      const profileData = { name: "Updated User" };
      const mockData = { id: "u1", name: "Updated User" };
      privateApiClient.put.mockResolvedValue({ data: mockData });

      const result = await userService.updateProfile(profileData);

      expect(privateApiClient.put).toHaveBeenCalledWith(
        "/users/profile",
        profileData
      );
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Failed to update profile");
      privateApiClient.put.mockRejectedValue(error);

      await expect(
        userService.updateProfile({ name: "Fail User" })
      ).rejects.toThrow("Failed to update profile");
    });
  });
});
