// services/adminService.js
import { privateApiClient } from './api';

// 🎭 Données mockées pour la simulation
const MOCK_USERS = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'user',
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    _id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: 'admin',
    created_at: '2024-02-20T14:20:00Z',
  },
  {
    _id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'user',
    created_at: '2024-03-10T09:15:00Z',
  },
  {
    _id: '4',
    firstName: 'Alice',
    lastName: 'Williams',
    email: 'alice.williams@example.com',
    role: 'user',
    created_at: '2024-03-25T16:45:00Z',
  },
  {
    _id: '5',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    role: 'user',
    created_at: '2024-04-05T11:00:00Z',
  },
  {
    _id: '6',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@example.com',
    role: 'user',
    created_at: '2024-04-15T13:30:00Z',
  },
  {
    _id: '7',
    firstName: 'David',
    lastName: 'Miller',
    email: 'david.miller@example.com',
    role: 'admin',
    created_at: '2024-05-01T08:20:00Z',
  },
  {
    _id: '8',
    firstName: 'Sophie',
    lastName: 'Wilson',
    email: 'sophie.wilson@example.com',
    role: 'user',
    created_at: '2024-05-10T15:10:00Z',
  },
  {
    _id: '9',
    firstName: 'Michael',
    lastName: 'Taylor',
    email: 'michael.taylor@example.com',
    role: 'user',
    created_at: '2024-05-20T10:50:00Z',
  },
  {
    _id: '10',
    firstName: 'Sarah',
    lastName: 'Anderson',
    email: 'sarah.anderson@example.com',
    role: 'user',
    created_at: '2024-06-01T12:00:00Z',
  },
  {
    _id: '11',
    firstName: 'Tom',
    lastName: 'Martin',
    email: 'tom.martin@example.com',
    role: 'user',
    created_at: '2024-06-10T09:30:00Z',
  },
  {
    _id: '12',
    firstName: 'Lisa',
    lastName: 'Garcia',
    email: 'lisa.garcia@example.com',
    role: 'user',
    created_at: '2024-06-15T14:45:00Z',
  },
];

// Simule un délai réseau
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const adminService = {
  getAllUsers: async (page = 1, limit = 10) => {
    try {
      // Simuler un délai réseau
      await delay(800);

      // Calculer la pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      const items = MOCK_USERS.slice(start, end);
      const total = MOCK_USERS.length;

      const response = {
        items,
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      };

      return response;
    } catch (error) {
      console.error('Error getAllUsers:', error);
      throw error;
    }
  },

  getUserInfo: async (userId) => {
    try {
      await delay(500);

      const user = MOCK_USERS.find(u => u._id === userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error('Error getUserInfo:', error);
      throw error;
    }
  },

  updateUser: async (userId, data) => {
    try {
      await delay(600);

      if (data.password) {
        throw new Error('Admin cannot modify passwords');
      }

      const userIndex = MOCK_USERS.findIndex(u => u._id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Simuler la mise à jour
      MOCK_USERS[userIndex] = {
        ...MOCK_USERS[userIndex],
        ...data,
      };

      return MOCK_USERS[userIndex];
    } catch (error) {
      console.error('Error updateUser:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      console.log("MOCK adminService.deleteUser");
      console.log("userId:", userId);

      await delay(500);

      const userIndex = MOCK_USERS.findIndex(u => u._id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Simuler la suppression
      const deletedUser = MOCK_USERS.splice(userIndex, 1)[0];

      console.log("Mock user deleted:", deletedUser.email);
      return true;
    } catch (error) {
      console.error('Error deleteUser:', error);
      throw error;
    }
  },
};
// // services/adminService.js
// import { privateApiClient } from './api';

// export const adminService = {
//   getAllUsers: async (page = 1, limit = 10) => {
//     try {

//       const response = await privateApiClient.get('/admin/users', {
//         params: { page, limit },
//       });

//       return response.data;
//     } catch (error) {
//       console.error('❌ Error getAllUsers:', error);
//       throw error;
//     }
//   },

//   getUserInfo: async (userId) => {
//     try {

//       const response = await privateApiClient.get(`/admin/users/${userId}`);

//       return response.data;
//     } catch (error) {
//       console.error('❌ Error getUserInfo:', error);
//       throw error;
//     }
//   },

//   updateUser: async (userId, data) => {
//     try {
//       const response = await privateApiClient.put(`/admin/users/${userId}`, data);

//       return response.data;
//     } catch (error) {
//       console.error('❌ Error updateUser:', error);
      
//       if (error.response?.data?.code === 'PASSWORD_UPDATE_FORBIDDEN') {
//         throw new Error('Admin cannot modify passwords');
//       }
      
//       throw error;
//     }
//   },

//   deleteUser: async (userId) => {
//     try {

//       await privateApiClient.delete(`/admin/users/${userId}`);

//       return true;
//     } catch (error) {
//       console.error('❌ Error deleteUser:', error);
//       throw error;
//     }
//   },
// };