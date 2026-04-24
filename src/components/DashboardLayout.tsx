import { type LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { GraduationCap, LogOut, Hexagon } from 'lucide-react';

interface User {
  name: string;
  role: 'student' | 'teacher' | 'admin';
  email: string;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardLayoutProps {
  user: User;
  navigation: NavigationItem[];
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
}

export function DashboardLayout({
  user,
  navigation,
  currentPage,
  onPageChange,
  onLogout,
  children,
  sidebarContent
}: DashboardLayoutProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'text-[#F4B315]';
      case 'teacher':
        return 'text-[#E59312]';
      case 'admin':
        return 'text-[#8E5915]';
      default:
        return 'text-[#F4B315]';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-[#D3AF85]/20 shadow-academic">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-[#F4B315] p-2 rounded-xl">
              <GraduationCap className="h-6 w-6 text-[#1A141A]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1A141A]">Academic Portal</h1>
              <p className="text-sm text-[#423738] capitalize">{user.role} Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-[#1A141A]">{user.name}</p>
              <p className={`text-xs capitalize ${getRoleColor(user.role)}`}>{user.role}</p>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-[#D3AF85] text-[#1A141A] font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="text-[#423738] hover:text-[#E59312] hover:bg-[#F4B315]/10"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-[#D3AF85]/20 shadow-academic min-h-[calc(100vh-73px)]">
          <div className="p-6">
            {/* Navigation */}
            <nav className="space-y-2 mb-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-[#F4B315] text-[#1A141A] shadow-academic'
                        : 'text-[#423738] hover:bg-[#F4B315]/10 hover:text-[#1A141A]'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <Separator className="my-6 bg-[#D3AF85]/20" />

            {/* Additional Sidebar Content */}
            {sidebarContent}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-73px)]">
          <div className="p-6">
            {children}
          </div>
          
          {/* Decorative hexagons */}
          <div className="fixed bottom-10 right-10 text-[#F4B315]/10 pointer-events-none">
            <Hexagon size={48} />
          </div>
          <div className="fixed top-32 right-32 text-[#E59312]/10 pointer-events-none">
            <Hexagon size={32} />
          </div>
        </main>
      </div>
    </div>
  );
}