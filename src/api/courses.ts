import apiClient from './client';

export interface Course {
  _id: string;
  name: string;
  code: string;
  facultyId: { _id: string; name: string; email: string };
  credits: number;
  department: string;
  semester: number;
}

export const coursesApi = {
  getAll: async (): Promise<Course[]> => {
    const { data } = await apiClient.get('/courses');
    return data.data;
  },

  getById: async (id: string): Promise<Course> => {
    const { data } = await apiClient.get(`/courses/${id}`);
    return data.data;
  },
};
