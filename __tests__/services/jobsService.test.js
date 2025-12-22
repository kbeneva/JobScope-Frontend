import { jobsService } from "../../src/services/jobsService";
import {
  publicApiClient,
  optionalAuthApiClient,
  privateApiClient,
} from "../../src/services/api";

jest.mock("../../src/services/api", () => ({
  publicApiClient: { get: jest.fn() },
  optionalAuthApiClient: { get: jest.fn() },
  privateApiClient: { get: jest.fn() },
}));

describe("jobsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("searchJobs", () => {
    it("calls optionalAuthApiClient with correct query and returns data", async () => {
      const filters = {
        title: "engineer",
        jobType: ["full-time"],
        experience: ["senior"],
      };
      const mockData = { jobs: [], total: 0 };
      optionalAuthApiClient.get.mockResolvedValue({ data: mockData });

      const result = await jobsService.searchJobs(filters, 2, 20);

      expect(optionalAuthApiClient.get).toHaveBeenCalledWith(
        expect.stringContaining(
          "/jobs/search?page=2&limit=20&title=engineer&jobType=full-time&experience=senior"
        )
      );
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Search failed");
      optionalAuthApiClient.get.mockRejectedValue(error);

      await expect(jobsService.searchJobs()).rejects.toThrow("Search failed");
    });
  });

  describe("getRecentJobs", () => {
    it("calls publicApiClient with correct limit and returns data", async () => {
      const mockData = { jobs: [] };
      publicApiClient.get.mockResolvedValue({ data: mockData });

      const result = await jobsService.getRecentJobs(5);

      expect(publicApiClient.get).toHaveBeenCalledWith("/jobs/recent", {
        params: { limit: 5 },
      });
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Failed to fetch recent jobs");
      publicApiClient.get.mockRejectedValue(error);

      await expect(jobsService.getRecentJobs()).rejects.toThrow(
        "Failed to fetch recent jobs"
      );
    });
  });

  describe("getPersonalizedJobs", () => {
    it("calls privateApiClient and returns data", async () => {
      const mockData = { jobs: [] };
      privateApiClient.get.mockResolvedValue({ data: mockData });

      const result = await jobsService.getPersonalizedJobs();

      expect(privateApiClient.get).toHaveBeenCalledWith("/jobs/personalized");
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Personalized jobs failed");
      privateApiClient.get.mockRejectedValue(error);

      await expect(jobsService.getPersonalizedJobs()).rejects.toThrow(
        "Personalized jobs failed"
      );
    });
  });

  describe("getJobById", () => {
    it("calls optionalAuthApiClient with correct jobId and returns data", async () => {
      const mockData = { id: "job1", title: "Engineer" };
      optionalAuthApiClient.get.mockResolvedValue({ data: mockData });

      const result = await jobsService.getJobById("job1");

      expect(optionalAuthApiClient.get).toHaveBeenCalledWith("/jobs/job1");
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Job fetch failed");
      optionalAuthApiClient.get.mockRejectedValue(error);

      await expect(jobsService.getJobById("job1")).rejects.toThrow(
        "Job fetch failed"
      );
    });
  });
});
