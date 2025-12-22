import { adminService } from "../../src/services/adminService";
import { privateApiClient } from "../../src/services/api";

jest.mock("../../src/services/api", () => ({
  privateApiClient: {
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("adminService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("calls API with correct params and returns data", async () => {
      const mockData = { users: [], total: 0 };

      privateApiClient.get.mockResolvedValue({
        data: mockData,
      });

      const result = await adminService.getAllUsers(2, 25);

      expect(privateApiClient.get).toHaveBeenCalledWith("/admin/users", {
        params: { page: 2, limit: 25 },
      });
      expect(result).toEqual(mockData);
    });

    it("throws when API fails", async () => {
      const error = new Error("Network error");

      privateApiClient.get.mockRejectedValue(error);

      await expect(adminService.getAllUsers()).rejects.toThrow("Network error");
    });
  });

  describe("getUserInfo", () => {
    it("calls API with correct userId and returns data", async () => {
      const mockData = { id: "u1", email: "test@test.com" };

      privateApiClient.get.mockResolvedValue({
        data: mockData,
      });

      const result = await adminService.getUserInfo("u1");

      expect(privateApiClient.get).toHaveBeenCalledWith("/admin/users/u1");
      expect(result).toEqual(mockData);
    });
  });

  describe("updateUser", () => {
    it("updates user and returns data", async () => {
      const payload = { role: "admin" };
      const mockData = { success: true };

      privateApiClient.put.mockResolvedValue({
        data: mockData,
      });

      const result = await adminService.updateUser("u1", payload);

      expect(privateApiClient.put).toHaveBeenCalledWith(
        "/admin/users/u1",
        payload
      );
      expect(result).toEqual(mockData);
    });

    it("throws custom error when password update is forbidden", async () => {
      privateApiClient.put.mockRejectedValue({
        response: {
          data: {
            code: "PASSWORD_UPDATE_FORBIDDEN",
          },
        },
      });

      await expect(
        adminService.updateUser("u1", { password: "123" })
      ).rejects.toThrow("Admin cannot modify passwords");
    });

    it("rethrows unknown errors", async () => {
      const error = new Error("Server down");

      privateApiClient.put.mockRejectedValue(error);

      await expect(adminService.updateUser("u1", {})).rejects.toThrow(
        "Server down"
      );
    });
  });

  describe("deleteUser", () => {
    it("deletes user and returns true", async () => {
      privateApiClient.delete.mockResolvedValue({});

      const result = await adminService.deleteUser("u1");

      expect(privateApiClient.delete).toHaveBeenCalledWith("/admin/users/u1");
      expect(result).toBe(true);
    });

    it("throws when delete fails", async () => {
      const error = new Error("Delete failed");

      privateApiClient.delete.mockRejectedValue(error);

      await expect(adminService.deleteUser("u1")).rejects.toThrow(
        "Delete failed"
      );
    });
  });
});
