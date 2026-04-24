import apiClient from './client';

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  authorName: string;
  targetAudience: string;
  tags: string[];
  attachments: string[];
  status: 'published' | 'draft' | 'scheduled';
  views: number;
  createdAt: string;
}

export interface CreateAnnouncementData {
  title: string;
  content: string;
  priority?: string;
  category?: string;
  targetAudience?: string;
  tags?: string;
  scheduledDate?: string;
  status?: 'published' | 'draft';
}

export const announcementsApi = {
  getAll: async (): Promise<Announcement[]> => {
    const { data } = await apiClient.get('/announcements');
    return data.data;
  },

  getAllWithDrafts: async (): Promise<Announcement[]> => {
    const { data } = await apiClient.get('/announcements/all');
    return data.data;
  },

  create: async (announcementData: CreateAnnouncementData): Promise<Announcement> => {
    const { data } = await apiClient.post('/announcements', announcementData);
    return data.data;
  },

  update: async (id: string, updates: Partial<CreateAnnouncementData>): Promise<Announcement> => {
    const { data } = await apiClient.put(`/announcements/${id}`, updates);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/announcements/${id}`);
  },
};
