import apiClient from './client';

export interface Grade {
  _id: string;
  studentId: string;
  courseId: { _id: string; name: string; code: string; credits: number };
  marks: number;
  grade: string;
  semester: number;
  examType: string;
}

export const gradesApi = {
  getByStudent: async (studentId: string): Promise<Grade[]> => {
    const { data } = await apiClient.get(`/grades/student/${studentId}`);
    return data.data;
  },

  getByCourse: async (courseId: string): Promise<Grade[]> => {
    const { data } = await apiClient.get(`/grades/course/${courseId}`);
    return data.data;
  },

  save: async (gradeData: {
    studentId: string;
    courseId: string;
    marks: number;
    semester: number;
    examType?: string;
  }): Promise<Grade> => {
    const { data } = await apiClient.post('/grades', gradeData);
    return data.data;
  },
};
