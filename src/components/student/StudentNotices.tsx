import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Bell, Search, Filter, Calendar, User, Tag, Download } from 'lucide-react';
import { announcementsApi, Announcement } from '../../api/announcements';

export function StudentNotices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [notices, setNotices] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await announcementsApi.getAll();
        setNotices(data);
      } catch (err) {
        console.error('Failed to fetch notices:', err);
        // Fallback hardcoded data
        setNotices([
          {
            _id: '1',
            title: 'Mid-term Examination Schedule Released',
            content: 'The mid-term examination schedule for all courses has been published. Students are advised to check their individual timetables and prepare accordingly. The examinations will commence from February 15th, 2024.',
            authorName: 'Academic Office',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            priority: 'high',
            category: 'academic',
            tags: ['exams', 'schedule', 'important'],
            attachments: ['exam_schedule.pdf'],
            status: 'published',
            views: 45,
            targetAudience: 'all',
          },
          {
            _id: '2',
            title: 'Library Hours Extended During Exam Period',
            content: 'The central library will remain open until 10:00 PM from January 20th to February 28th to accommodate students during the examination period. Additional study spaces have been arranged.',
            authorName: 'Library Administration',
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            priority: 'medium',
            category: 'facilities',
            tags: ['library', 'extended hours', 'study'],
            attachments: [],
            status: 'published',
            views: 32,
            targetAudience: 'all',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter(notice => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || notice.category === filterCategory;
    return matchesSearch && matchesPriority && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'facilities': return 'bg-purple-100 text-purple-800';
      case 'events': return 'bg-green-100 text-green-800';
      case 'financial': return 'bg-orange-100 text-orange-800';
      case 'technical': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const NoticeCard = ({ notice }: { notice: Announcement }) => (
    <Card className="shadow-academic border-0 border-l-4 border-l-[#F4B315]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={`${getPriorityColor(notice.priority)} border text-xs`} variant="outline">
                {notice.priority.toUpperCase()}
              </Badge>
              <Badge className={`${getCategoryColor(notice.category)} text-xs`} variant="secondary">
                {notice.category}
              </Badge>
            </div>
            <CardTitle className="text-[#1A141A] text-lg">{notice.title}</CardTitle>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-[#423738]">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{notice.authorName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(notice.createdAt)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-[#423738] mb-4 leading-relaxed">{notice.content}</p>
        {notice.tags.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-4 w-4 text-[#8E5915]" />
            <div className="flex flex-wrap gap-1">
              {notice.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-[#F4B315]/10 text-[#8E5915] border-[#F4B315]/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {notice.attachments.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#1A141A]">Attachments:</p>
            <div className="space-y-1">
              {notice.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between bg-[#F4B315]/5 p-2 rounded-lg">
                  <span className="text-sm text-[#423738]">{attachment}</span>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-[#8E5915] hover:bg-[#F4B315]/10">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-32" />
        {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A141A] mb-2">Notices</h1>
          <p className="text-[#423738]">Stay updated with important announcements</p>
        </div>
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-[#F4B315]" />
          <Badge className="bg-[#F4B315] text-[#1A141A]">
            {filteredNotices.length} Notices
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-academic border-0">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#423738]" />
                <Input
                  placeholder="Search notices, tags, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#D3AF85]/30 focus:border-[#F4B315]"
                />
              </div>
            </div>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40 border-[#D3AF85]/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40 border-[#D3AF85]/30">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="facilities">Facilities</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notices List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 max-w-md">
          <TabsTrigger value="all">All ({filteredNotices.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {filteredNotices.length === 0 ? (
            <Card className="shadow-academic border-0">
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-[#D3AF85] mx-auto mb-4" />
                <p className="text-[#423738]">No notices found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotices.map(notice => (
              <NoticeCard key={notice._id} notice={notice} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}