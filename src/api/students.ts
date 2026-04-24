import apiClient from './client';

export interface Student {
  _id: string;
  name: string;
  email: string;
  role: 'student';
  department: string;
  rollNumber: string;
  semester: number;
  isActive: boolean;
  joinDate: string;
}

export const studentsApi = {
  getAll: async (): Promise<Student[]> => {
    const { data } = await apiClient.get('/students');
    return data.data;
  },

  getById: async (id: string): Promise<Student> => {
    const { data } = await apiClient.get(`/students/${id}`);
    return data.data;
  },

  update: async (id: string, updates: Partial<Student>): Promise<Student> => {
    const { data } = await apiClient.put(`/students/${id}`, updates);
    return data.data;
  },

  deactivate: async (id: string): Promise<void> => {
    await apiClient.delete(`/students/${id}`);
  },
};
