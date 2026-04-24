import { DashboardLayout } from './DashboardLayout';
import { AdminHome } from './admin/AdminHome';
import { EditUsers } from './admin/EditUsers';
import { EditTimetableAdmin } from './admin/EditTimetableAdmin';
import { EditEventsCalendar } from './admin/EditEventsCalendar';
import { Home, Users, Clock, Calendar, Settings, BarChart3 } from 'lucide-react';

interface User {
  name: string;
  role: 'student' | 'teacher' | 'admin';
  email: string;
}

interface AdminDashboardProps {
  user: User;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function AdminDashboard({ user, currentPage, onPageChange, onLogout }: AdminDashboardProps) {
  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'users', label: 'Edit Users', icon: Users },
    { id: 'timetable', label: 'Edit Timetable', icon: Clock },
    { id: 'events', label: 'Edit Events Calendar', icon: Calendar },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <AdminHome onPageChange={onPageChange} />;
      case 'users':
        return <EditUsers />;
      case 'timetable':
        return <EditTimetableAdmin />;
      case 'events':
        return <EditEventsCalendar />;
      default:
        return <AdminHome onPageChange={onPageChange} />;
    }
  };

  const sidebarContent = (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-4 shadow-academic">
        <h3 className="text-sm font-semibold text-[#1A141A] mb-3">System Overview</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#423738]">Total Users</span>
            <span className="text-sm font-semibold text-[#1A141A]">1,247</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#423738]">Students</span>
            <span className="text-sm font-semibold text-[#F4B315]">1,156</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#423738]">Teachers</span>
            <span className="text-sm font-semibold text-[#E59312]">87</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#423738]">Admins</span>
            <span className="text-sm font-semibold text-[#8E5915]">4</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-academic">
        <h3 className="text-sm font-semibold text-[#1A141A] mb-3">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-[#F4B315]" />
            <div>
              <p className="text-xs text-[#423738]">System Health</p>
              <p className="text-sm font-semibold text-green-600">Excellent</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-[#E59312]" />
            <div>
              <p className="text-xs text-[#423738]">Last Backup</p>
              <p className="text-sm font-semibold text-[#1A141A]">2 hours ago</p>
            </div>
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