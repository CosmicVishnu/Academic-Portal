import { DashboardLayout } from './DashboardLayout';
import { TeacherHome } from './teacher/TeacherHome';
import { MarkAttendance } from './teacher/MarkAttendance';
import { PostNotices } from './teacher/PostNotices';
import { EditTimetable } from './teacher/EditTimetable';
import { Home, Users, FileText, Clock, User } from 'lucide-react';

interface User {
  name: string;
  role: 'student' | 'teacher' | 'admin';
  email: string;
}

interface TeacherDashboardProps {
  user: User;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function TeacherDashboard({ user, currentPage, onPageChange, onLogout }: TeacherDashboardProps) {
  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'attendance', label: 'Mark Attendance', icon: Users },
    { id: 'notices', label: 'Post Notices', icon: FileText },
    { id: 'timetable', label: 'Edit Timetable', icon: Clock },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <TeacherHome onPageChange={onPageChange} />;
      case 'attendance':
        return <MarkAttendance />;
      case 'notices':
        return <PostNotices />;
      case 'timetable':
        return <EditTimetable />;
      default:
        return <TeacherHome onPageChange={onPageChange} />;
    }
  };

  const sidebarContent = (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-4 shadow-academic">
        <h3 className="text-sm font-semibold text-[#1A141A] mb-3">My Profile</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#E59312] rounded-xl flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A141A]">{user.name}</p>
              <p className="text-xs text-[#423738]">Mathematics Department</p>
              <p className="text-xs text-[#8E5915]">Senior Professor</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-[#F4B315]/10 p-2 rounded-lg text-center">
              <p className="text-xs text-[#423738]">Classes</p>
              <p className="text-sm font-semibold text-[#1A141A]">12</p>
            </div>
            <div className="bg-[#E59312]/10 p-2 rounded-lg text-center">
              <p className="text-xs text-[#423738]">Students</p>
              <p className="text-sm font-semibold text-[#1A141A]">156</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-academic">
        <h3 className="text-sm font-semibold text-[#1A141A] mb-3">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#423738]">Today's Classes</span>
            <span className="text-sm font-semibold text-[#1A141A]">4</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#423738]">Pending Grades</span>
            <span className="text-sm font-semibold text-[#E59312]">7</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#423738]">New Messages</span>
            <span className="text-sm font-semibold text-[#F4B315]">3</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout
      user={user}
      navigation={navigation}
      currentPage={currentPage}
      onPageChange={onPageChange}
      onLogout={onLogout}
      sidebarContent={sidebarContent}
    >
      {renderContent()}
    </DashboardLayout>
  );
}