import { DashboardLayout } from './DashboardLayout';
import { StudentHome } from './student/StudentHome';
import { StudentAttendance } from './student/StudentAttendance';
import { StudentNotices } from './student/StudentNotices';
import { StudentTimetable } from './student/StudentTimetable';
import { StudentMaterials } from './student/StudentMaterials';
import { StudentCalendar } from './student/StudentCalendar';
import { Home, Calendar, FileText, Clock, BookOpen, CalendarDays } from 'lucide-react';

interface User {
  name: string;
  role: 'student' | 'teacher' | 'admin';
  email: string;
}

interface StudentDashboardProps {
  user: User;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function StudentDashboard({ user, currentPage, onPageChange, onLogout }: StudentDashboardProps) {
  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'notices', label: 'Notices', icon: FileText },
    { id: 'timetable', label: 'Timetable', icon: Clock },
    { id: 'materials', label: 'Study Materials', icon: BookOpen },
    { id: 'calendar', label: 'Events Calendar', icon: CalendarDays },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <StudentHome onPageChange={onPageChange} />;
      case 'attendance':
        return <StudentAttendance />;
      case 'notices':
        return <StudentNotices />;
      case 'timetable':
        return <StudentTimetable />;
      case 'materials':
        return <StudentMaterials />;
      case 'calendar':
        return <StudentCalendar />;
      default:
        return <StudentHome onPageChange={onPageChange} />;
    }
  };

  const sidebarContent = (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-4 shadow-academic">
        <h3 className="text-sm font-semibold text-[#1A141A] mb-3">My Teachers</h3>
        <div className="space-y-3">
          {[
            { name: 'Minu K K', subject: 'Mathematics', avatar: '👨‍🏫' },
            { name: 'Aparna M', subject: 'Theory of Computation', avatar: '👩‍🏫' },
            { name: 'Chinju P Varghese', subject: 'Object Oriented Programming', avatar: '👩‍💼' },
            { name: 'Rekha R', subject: 'Data Structures and Algorithms', avatar: '👨‍🏫' },
            { name: 'Amrutha P M', subject: 'Digital Circuits and Logic Designing', avatar: '👩‍🏫' },
          ].map((teacher, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#F4B315] rounded-lg flex items-center justify-center text-sm">
                {teacher.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A141A]">{teacher.name}</p>
                <p className="text-xs text-[#423738]">{teacher.subject}</p>
              </div>
            </div>
          ))}
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