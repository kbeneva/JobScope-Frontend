import { favoritesService } from "../../src/services/favoritesService";
import { privateApiClient } from "../../src/services/api";

jest.mock("../../src/services/api", () => ({
  privateApiClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("favoritesService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getFavorites", () => {
    it("calls API with correct params and returns data", async () => {
      const mockData = { favorites: [], total: 0 };
      privateApiClient.get.mockResolvedValue({ data: mockData });

      const result = await favoritesService.getFavorites(2, 20);

      expect(privateApiClient.get).toHaveBeenCalledWith("/favorites", {
        params: { page: 2, limit: 20 },
      });
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Network error");
      privateApiClient.get.mockRejectedValue(error);

      await expect(favoritesService.getFavorites()).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("addFavorite", () => {
    it("adds a favorite and returns data", async () => {
      const mockData = { success: true };
      privateApiClient.post.mockResolvedValue({ data: mockData });

      const result = await favoritesService.addFavorite("job123");

      expect(privateApiClient.post).toHaveBeenCalledWith("/favorites/job123");
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Add favorite failed");
      privateApiClient.post.mockRejectedValue(error);

      await expect(favoritesService.addFavorite("job123")).rejects.toThrow(
        "Add favorite failed"
      );
    });
  });

  describe("removeFavorite", () => {
    it("removes a favorite and returns data", async () => {
      const mockData = { success: true };
      privateApiClient.delete.mockResolvedValue({ data: mockData });

      const result = await favoritesService.removeFavorite("job123");

      expect(privateApiClient.delete).toHaveBeenCalledWith("/favorites/job123");
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Remove favorite failed");
      privateApiClient.delete.mockRejectedValue(error);

      await expect(favoritesService.removeFavorite("job123")).rejects.toThrow(
        "Remove favorite failed"
      );
    });
  });
});
