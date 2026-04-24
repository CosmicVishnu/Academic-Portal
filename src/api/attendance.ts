import apiClient from './client';

export interface CourseAttendance {
  courseName: string;
  courseCode: string;
  totalClasses: number;
  attended: number;
  percentage: number;
}

export interface AttendanceRecord {
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  period: string;
}

export const attendanceApi = {
  getByStudent: async (studentId: string): Promise<CourseAttendance[]> => {
    const { data } = await apiClient.get(`/attendance/student/${studentId}`);
    return data.data;
  },

  getByCourse: async (courseId: string): Promise<AttendanceRecord[]> => {
    const { data } = await apiClient.get(`/attendance/course/${courseId}`);
    return data.data;
  },

  save: async (payload: {
    courseId: string;
    date: string;
    period: string;
    records: { studentId: string; status: string }[];
  }): Promise<void> => {
    await apiClient.post('/attendance', payload);
  },
};
