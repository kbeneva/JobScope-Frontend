import { analyticsService } from "../../src/services/analyticsService";
import { publicApiClient } from "../../src/services/api";

jest.mock("../../src/services/api", () => ({
  publicApiClient: {
    get: jest.fn(),
  },
}));

describe("analyticsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getOverview", () => {
    it("calls API and returns data", async () => {
      const mockData = { users: 10, jobs: 5 };
      publicApiClient.get.mockResolvedValue({ data: mockData });

      const result = await analyticsService.getOverview();

      expect(publicApiClient.get).toHaveBeenCalledWith(
        "/analytics/dashboard/overview"
      );
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Network error");
      publicApiClient.get.mockRejectedValue(error);

      await expect(analyticsService.getOverview()).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("getDomainDashboard", () => {
    it("calls API with domain and returns data", async () => {
      const mockData = { domain: "IT", jobs: 3 };
      publicApiClient.get.mockResolvedValue({ data: mockData });

      const result = await analyticsService.getDomainDashboard("IT");

      expect(publicApiClient.get).toHaveBeenCalledWith(
        "/analytics/dashboard/domain/IT"
      );
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Server error");
      publicApiClient.get.mockRejectedValue(error);

      await expect(analyticsService.getDomainDashboard("IT")).rejects.toThrow(
        "Server error"
      );
    });
  });
});
