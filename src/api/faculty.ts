import apiClient from './client';

export interface UserRecord {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  department: string;
  isActive: boolean;
  joinDate: string;
}

export const facultyApi = {
  getAllUsers: async (): Promise<UserRecord[]> => {
    const { data } = await apiClient.get('/faculty/all-users');
    return data.data;
  },

  getAll: async (): Promise<UserRecord[]> => {
    const { data } = await apiClient.get('/faculty');
    return data.data;
  },

  update: async (id: string, updates: Partial<UserRecord>): Promise<UserRecord> => {
    const { data } = await apiClient.put(`/faculty/${id}`, updates);
    return data.data;
  },

  deactivate: async (id: string): Promise<void> => {
    await apiClient.delete(`/faculty/${id}`);
  },
};
