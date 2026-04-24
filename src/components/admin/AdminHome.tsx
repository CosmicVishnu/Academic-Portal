import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Users, 
  Clock, 
  Calendar, 
  Settings, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  BarChart3,
  Database,
  Shield
} from 'lucide-react';

interface AdminHomeProps {
  onPageChange: (page: string) => void;
}

export function AdminHome({ onPageChange }: AdminHomeProps) {
  const systemStats = [
    { label: 'Total Users', value: '1,247', change: '+12', icon: Users, color: 'text-[#F4B315]' },
    { label: 'Active Sessions', value: '342', change: '+8', icon: TrendingUp, color: 'text-green-600' },
    { label: 'System Uptime', value: '99.9%', change: '', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Storage Used', value: '68%', change: '+2%', icon: Database, color: 'text-[#E59312]' },
  ];

  const recentActivity = [
    { action: 'New user registered', detail: 'Arun (Student)', time: '5 minutes ago', type: 'user' },
    { action: 'Timetable updated', detail: 'Mathematics Department', time: '12 minutes ago', type: 'timetable' },
    { action: 'Event created', detail: 'Excel 2025', time: '1 hour ago', type: 'event' },
    { action: 'System backup completed', detail: 'All data backed up successfully', time: '2 hours ago', type: 'system' },
    { action: 'User role updated', detail: 'Sarah Wilson promoted to Teacher', time: '3 hours ago', type: 'user' },
  ];

  const systemAlerts = [
    { message: 'Database backup scheduled for tonight', severity: 'info', time: '2 hours ago' },
    { message: 'Server maintenance window this weekend', severity: 'warning', time: '1 day ago' },
    { message: 'New security patch available', severity: 'high', time: '2 days ago' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'timetable':
        return <Clock className="h-4 w-4 text-green-600" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'system':
        return <Settings className="h-4 w-4 text-gray-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A141A] mb-2">Admin Dashboard</h1>
        <p className="text-[#423738]">System overview and management tools</p>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-academic border-0 border-l-4 border-l-[#8E5915]">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">Quick Actions</CardTitle>
          <CardDescription>Frequently used administrative tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => onPageChange('users')}
              className="h-16 bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A] font-semibold rounded-xl shadow-academic flex flex-col items-center justify-center space-y-2"
            >
              <Users className="h-6 w-6" />
              <span>Edit Users</span>
            </Button>
            <Button
              onClick={() => onPageChange('timetable')}
              className="h-16 bg-[#E59312] hover:bg-[#8E5915] text-white font-semibold rounded-xl shadow-academic flex flex-col items-center justify-center space-y-2"
            >
              <Clock className="h-6 w-6" />
              <span>Edit Timetable</span>
            </Button>
            <Button
              onClick={() => onPageChange('events')}
              className="h-16 bg-[#8E5915] hover:bg-[#423738] text-white font-semibold rounded-xl shadow-academic flex flex-col items-center justify-center space-y-2"
            >
              <Calendar className="h-6 w-6" />
              <span>Edit Events</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-academic border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#423738]">{stat.label}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-[#1A141A]">{stat.value}</p>
                      {stat.change && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          {stat.change}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <Card className="shadow-academic border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#1A141A]">System Alerts</CardTitle>
                <CardDescription>Important system notifications</CardDescription>
              </div>
              <Shield className="h-5 w-5 text-[#F4B315]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <Badge variant="outline" className="text-xs ml-2">
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs mt-1 opacity-75">{alert.time}</p>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-[#8E5915] hover:bg-[#F4B315]/10"
            >
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-academic border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#1A141A]">Recent Activity</CardTitle>
                <CardDescription>Latest system activities</CardDescription>
              </div>
              <BarChart3 className="h-5 w-5 text-[#E59312]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-[#F4B315]/5 rounded-lg">
                  <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1A141A]">{activity.action}</p>
                    <p className="text-sm text-[#423738]">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-[#8E5915]">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">Department Overview</CardTitle>
          <CardDescription>Statistics by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D3AF85]/20">
                  <th className="text-left py-3 px-4 font-medium text-[#1A141A]">Department</th>
                  <th className="text-center py-3 px-4 font-medium text-[#1A141A]">Teachers</th>
                  <th className="text-center py-3 px-4 font-medium text-[#1A141A]">Students</th>
                  <th className="text-center py-3 px-4 font-medium text-[#1A141A]">Classes</th>
                  <th className="text-center py-3 px-4 font-medium text-[#1A141A]">Avg Attendance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Mathematics', teachers: 12, students: 245, classes: 18, attendance: 89 },
                  { name: 'Physics', teachers: 8, students: 198, classes: 15, attendance: 86 },
                  { name: 'Chemistry', teachers: 7, students: 167, classes: 12, attendance: 91 },
                  { name: 'Computer Science', teachers: 15, students: 312, classes: 22, attendance: 93 },
                  { name: 'English', teachers: 10, students: 234, classes: 16, attendance: 88 },
                ].map((dept, index) => (
                  <tr key={index} className="border-b border-[#D3AF85]/10">
                    <td className="py-3 px-4 font-medium text-[#1A141A]">{dept.name}</td>
                    <td className="py-3 px-4 text-center text-[#423738]">{dept.teachers}</td>
                    <td className="py-3 px-4 text-center text-[#423738]">{dept.students}</td>
                    <td className="py-3 px-4 text-center text-[#423738]">{dept.classes}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-medium ${dept.attendance >= 90 ? 'text-green-600' : dept.attendance >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {dept.attendance}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-academic border-0">
          <CardHeader>
            <CardTitle className="text-[#1A141A] text-lg">Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#423738]">Web Server</span>
                <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#423738]">Database</span>
                <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#423738]">File Server</span>
                <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                  Online
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardHeader>
            <CardTitle className="text-[#1A141A] text-lg">Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#423738]">CPU Usage</span>
                  <span className="text-[#1A141A]">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#F4B315] h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#423738]">Memory</span>
                  <span className="text-[#1A141A]">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#E59312] h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#423738]">Storage</span>
                  <span className="text-[#1A141A]">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#8E5915] h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardHeader>
            <CardTitle className="text-[#1A141A] text-lg">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#423738]">Firewall</span>
                <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#423738]">SSL Certificate</span>
                <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                  Valid
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#423738]">Last Scan</span>
                <span className="text-xs text-[#8E5915]">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}