import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { AlertTriangle, Calendar, FileText, Clock, TrendingUp, BookOpen } from 'lucide-react';
import { attendanceApi, CourseAttendance } from '../../api/attendance';
import { announcementsApi, Announcement } from '../../api/announcements';
import { useAuth } from '../../context/AuthContext';

interface StudentHomeProps {
  onPageChange: (page: string) => void;
}

export function StudentHome({ onPageChange }: StudentHomeProps) {
  const { currentUser } = useAuth();
  const [attendanceData, setAttendanceData] = useState<CourseAttendance[]>([]);
  const [recentNotices, setRecentNotices] = useState<Announcement[]>([]);

  const todaySchedule = [
    { time: '9:00 AM', subject: 'Mathematics', teacher: 'Minu K K', room: 'Room 101' },
    { time: '11:00 AM', subject: 'Theory of Computation', teacher: 'Aparna M', room: 'Room 201' },
    { time: '2:00 PM', subject: 'Object Oriented Programming', teacher: 'Chinju P Varghese', room: 'Room 301' },
  ];

  useEffect(() => {
    if (!currentUser) return;

    // Fetch attendance
    attendanceApi.getByStudent(currentUser._id)
      .then(data => setAttendanceData(data))
      .catch(() => {
        // Fallback
        setAttendanceData([
          { courseName: 'Mathematics', courseCode: 'MAT301', totalClasses: 25, attended: 23, percentage: 92 },
          { courseName: 'Theory of Computation', courseCode: 'CS302', totalClasses: 22, attended: 15, percentage: 68 },
          { courseName: 'Object Oriented Programming', courseCode: 'CS303', totalClasses: 20, attended: 17, percentage: 85 },
          { courseName: 'Data Structures and Algorithms', courseCode: 'CS304', totalClasses: 18, attended: 17, percentage: 94 },
          { courseName: 'Digital Circuits and Logic Designing', courseCode: 'EC305', totalClasses: 24, attended: 16, percentage: 67 },
        ]);
      });

    // Fetch notices
    announcementsApi.getAll()
      .then(data => setRecentNotices(data.slice(0, 3)))
      .catch(() => {
        setRecentNotices([
          { _id: '1', title: 'Mid-term Exam Schedule Released', content: 'The mid-term examination schedule has been published...', createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), priority: 'high', category: 'academic', authorName: 'Academic Office', tags: [], attachments: [], status: 'published', views: 0, targetAudience: 'all' },
          { _id: '2', title: 'Library Hours Extended', content: 'Library will now remain open until 10 PM...', createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), priority: 'medium', category: 'facilities', authorName: 'Library', tags: [], attachments: [], status: 'published', views: 0, targetAudience: 'all' },
        ]);
      });
  }, [currentUser]);

  const overallTotal = attendanceData.reduce((s, a) => s + a.totalClasses, 0);
  const overallAttended = attendanceData.reduce((s, a) => s + a.attended, 0);
  const overallPct = overallTotal > 0 ? ((overallAttended / overallTotal) * 100).toFixed(1) : '0.0';

  const lowAttendanceSubjects = attendanceData.filter(s => s.percentage < 75);

  const formatDate = (dateString: string) => {
    const diffInHours = Math.floor((Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A141A] mb-2">Welcome back, {currentUser?.name || 'Student'}!</h1>
        <p className="text-[#423738]">Here's your academic overview for today</p>
      </div>

      {/* At a Glance Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Overall Attendance</p>
                <p className="text-2xl font-bold text-[#1A141A]">{overallPct}%</p>
              </div>
              <div className="h-12 w-12 bg-[#F4B315]/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#F4B315]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Today's Classes</p>
                <p className="text-2xl font-bold text-[#1A141A]">{todaySchedule.length}</p>
              </div>
              <div className="h-12 w-12 bg-[#E59312]/10 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#E59312]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Pending Assignments</p>
                <p className="text-2xl font-bold text-[#1A141A]">3</p>
              </div>
              <div className="h-12 w-12 bg-[#8E5915]/10 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-[#8E5915]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Unread Notices</p>
                <p className="text-2xl font-bold text-[#1A141A]">{recentNotices.length}</p>
              </div>
              <div className="h-12 w-12 bg-[#D3AF85]/20 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#8E5915]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Warning */}
      {lowAttendanceSubjects.length > 0 && (
        <Card className="shadow-academic border-0 border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A141A] mb-2">Attendance Warning</h3>
                <p className="text-sm text-[#423738] mb-3">Your attendance is below 75% in the following subjects:</p>
                <div className="space-y-2">
                  {lowAttendanceSubjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                      <span className="font-medium text-[#1A141A]">{subject.courseName}</span>
                      <Badge variant="destructive">{subject.percentage}%</Badge>
                    </div>
                  ))}
                </div>
                <Button onClick={() => onPageChange('attendance')} variant="outline" size="sm" className="mt-3 border-red-500 text-red-500 hover:bg-red-50">
                  View Detailed Attendance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Timetable */}
        <Card className="shadow-academic border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#1A141A]">Today's Schedule</CardTitle>
                <CardDescription>Your classes for today</CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-[#F4B315]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((class_, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-[#F4B315]/5 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-[#1A141A]">{class_.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#1A141A]">{class_.subject}</p>
                    <p className="text-sm text-[#423738]">{class_.teacher} • {class_.room}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={() => onPageChange('timetable')} variant="ghost" className="w-full mt-4 text-[#F4B315] hover:bg-[#F4B315]/10">
              View Full Timetable
            </Button>
          </CardContent>
        </Card>

        {/* Recent Notices */}
        <Card className="shadow-academic border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#1A141A]">Recent Notices</CardTitle>
                <CardDescription>Latest announcements</CardDescription>
              </div>
              <FileText className="h-5 w-5 text-[#E59312]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotices.map((notice, index) => (
                <div key={notice._id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-[#1A141A] text-sm">{notice.title}</h4>
                    <Badge
                      variant={notice.priority === 'high' ? 'destructive' : notice.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {notice.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#423738]">{notice.content.substring(0, 80)}...</p>
                  <p className="text-xs text-[#8E5915]">{formatDate(notice.createdAt)}</p>
                  {index < recentNotices.length - 1 && <div className="border-b border-[#D3AF85]/20 pb-2" />}
                </div>
              ))}
            </div>
            <Button onClick={() => onPageChange('notices')} variant="ghost" className="w-full mt-4 text-[#E59312] hover:bg-[#E59312]/10">
              View All Notices
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Overview */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">Attendance Overview</CardTitle>
          <CardDescription>Your attendance percentage by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attendanceData.map((subject, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#1A141A]">{subject.courseName}</span>
                  <span className={`font-semibold ${subject.percentage < 75 ? 'text-red-500' : 'text-[#8E5915]'}`}>
                    {subject.percentage}%
                  </span>
                </div>
                <Progress
                  value={subject.percentage}
                  className="h-2"
                  style={{ background: subject.percentage < 75 ? '#fee2e2' : '#f0f9ff' }}
                />
                <p className="text-xs text-[#423738]">Present: {subject.attended}/{subject.totalClasses} classes</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}