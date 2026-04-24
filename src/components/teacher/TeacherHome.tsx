import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Users,
  FileText,
  Clock,
  BookOpen,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface TeacherHomeProps {
  onPageChange: (page: string) => void;
}

export function TeacherHome({
  onPageChange,
}: TeacherHomeProps) {
  const todayClasses = [
    {
      time: "9:00 AM",
      subject: "Mathematics - Calculus",
      class: "Class A",
      room: "Room 101",
      students: 32,
    },
    {
      time: "11:00 AM",
      subject: "Mathematics - Algebra",
      class: "Class B",
      room: "Room 101",
      students: 28,
    },
    {
      time: "2:00 PM",
      subject: "Mathematics - Geometry",
      class: "Class C",
      room: "Room 102",
      students: 30,
    },
    {
      time: "4:00 PM",
      subject: "Mathematics - Statistics",
      class: "Class D",
      room: "Room 101",
      students: 25,
    },
  ];

  const recentActivity = [
    {
      action: "Posted notice",
      detail: "Mid-term exam schedule",
      time: "2 hours ago",
      type: "notice",
    },
    {
      action: "Marked attendance",
      detail: "Class A - Mathematics",
      time: "3 hours ago",
      type: "attendance",
    },
    {
      action: "Uploaded material",
      detail: "Calculus Chapter 5 notes",
      time: "1 day ago",
      type: "material",
    },
    {
      action: "Graded assignment",
      detail: "25 submissions reviewed",
      time: "2 days ago",
      type: "grade",
    },
  ];

  const pendingTasks = [
    {
      task: "Grade Class B assignments",
      priority: "high",
      due: "Today",
    },
    {
      task: "Prepare tomorrow's lecture slides",
      priority: "medium",
      due: "Tomorrow",
    },
    {
      task: "Update course syllabus",
      priority: "low",
      due: "This week",
    },
  ];

  const classPerformance = [
    {
      class: "Class A",
      avgAttendance: 92,
      avgGrade: 85,
      students: 32,
    },
    {
      class: "Class B",
      avgAttendance: 88,
      avgGrade: 78,
      students: 28,
    },
    {
      class: "Class C",
      avgAttendance: 95,
      avgGrade: 82,
      students: 30,
    },
    {
      class: "Class D",
      avgAttendance: 84,
      avgGrade: 79,
      students: 25,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "notice":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "attendance":
        return <Users className="h-4 w-4 text-green-600" />;
      case "material":
        return <BookOpen className="h-4 w-4 text-purple-600" />;
      case "grade":
        return (
          <CheckCircle className="h-4 w-4 text-orange-600" />
        );
      default:
        return (
          <AlertCircle className="h-4 w-4 text-gray-600" />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A141A] mb-2">
          Welcome back, Professor!
        </h1>
        <p className="text-[#423738]">
          Here's your teaching dashboard overview
        </p>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-academic border-0 border-l-4 border-l-[#E59312]">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">
            Quick Actions
          </CardTitle>
          <CardDescription>
            Frequently used teaching tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => onPageChange("attendance")}
              className="h-16 bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A] font-semibold rounded-xl shadow-academic flex flex-col items-center justify-center space-y-2"
            >
              <Users className="h-6 w-6" />
              <span>Mark Attendance</span>
            </Button>
            <Button
              onClick={() => onPageChange("notices")}
              className="h-16 bg-[#E59312] hover:bg-[#8E5915] text-white font-semibold rounded-xl shadow-academic flex flex-col items-center justify-center space-y-2"
            >
              <FileText className="h-6 w-6" />
              <span>Post Notice</span>
            </Button>
            <Button
              onClick={() => onPageChange("timetable")}
              className="h-16 bg-[#8E5915] hover:bg-[#423738] text-white font-semibold rounded-xl shadow-academic flex flex-col items-center justify-center space-y-2"
            >
              <BookOpen className="h-6 w-6" />
              <span>Upload Material</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-[#1A141A]">
                  115
                </p>
              </div>
              <div className="h-12 w-12 bg-[#F4B315]/10 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-[#F4B315]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">
                  Today's Classes
                </p>
                <p className="text-2xl font-bold text-[#1A141A]">
                  {todayClasses.length}
                </p>
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
                <p className="text-sm font-medium text-[#423738]">
                  Avg Attendance
                </p>
                <p className="text-2xl font-bold text-[#1A141A]">
                  89.8%
                </p>
              </div>
              <div className="h-12 w-12 bg-[#8E5915]/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#8E5915]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">
                  Pending Tasks
                </p>
                <p className="text-2xl font-bold text-[#1A141A]">
                  {pendingTasks.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-[#D3AF85]/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-[#8E5915]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="shadow-academic border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#1A141A]">
                  Today's Classes
                </CardTitle>
                <CardDescription>
                  Your schedule for today
                </CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-[#F4B315]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map((class_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-[#F4B315]/5 rounded-lg border border-[#D3AF85]/20"
                >
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-semibold text-[#1A141A]">
                      {class_.time}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[#1A141A]">
                      {class_.subject}
                    </h4>
                    <p className="text-sm text-[#423738]">
                      {class_.class} • {class_.room}
                    </p>
                    <p className="text-xs text-[#8E5915]">
                      {class_.students} students
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onPageChange("attendance")}
                    className="border-[#F4B315] text-[#F4B315] hover:bg-[#F4B315] hover:text-[#1A141A]"
                  >
                    Mark Attendance
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="shadow-academic border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#1A141A]">
                  Pending Tasks
                </CardTitle>
                <CardDescription>
                  Items requiring your attention
                </CardDescription>
              </div>
              <AlertCircle className="h-5 w-5 text-[#E59312]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-[#D3AF85]/20 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-[#1A141A] text-sm">
                      {task.task}
                    </h4>
                    <p className="text-xs text-[#423738] mt-1">
                      Due: {task.due}
                    </p>
                  </div>
                  <Badge
                    className={`${getPriorityColor(task.priority)} text-xs border`}
                    variant="outline"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-[#E59312] hover:bg-[#E59312]/10"
            >
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance Overview */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">
            Class Performance Overview
          </CardTitle>
          <CardDescription>
            Attendance and grade statistics for all your classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D3AF85]/20">
                  <th className="text-left py-3 px-4 font-medium text-[#1A141A]">
                    Class
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-[#1A141A]">
                    Students
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-[#1A141A]">
                    Avg Attendance
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-[#1A141A]">
                    Avg Grade
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-[#1A141A]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {classPerformance.map((class_, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#D3AF85]/10"
                  >
                    <td className="py-3 px-4 font-medium text-[#1A141A]">
                      {class_.class}
                    </td>
                    <td className="py-3 px-4 text-center text-[#423738]">
                      {class_.students}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-medium ${class_.avgAttendance >= 90 ? "text-green-600" : class_.avgAttendance >= 80 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {class_.avgAttendance}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-medium ${class_.avgGrade >= 85 ? "text-green-600" : class_.avgGrade >= 75 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {class_.avgGrade}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {class_.avgAttendance >= 85 &&
                      class_.avgGrade >= 80 ? (
                        <Badge
                          className="bg-green-100 text-green-800 border-green-200"
                          variant="outline"
                        >
                          Excellent
                        </Badge>
                      ) : class_.avgAttendance >= 75 &&
                        class_.avgGrade >= 70 ? (
                        <Badge
                          className="bg-yellow-100 text-yellow-800 border-yellow-200"
                          variant="outline"
                        >
                          Good
                        </Badge>
                      ) : (
                        <Badge
                          className="bg-red-100 text-red-800 border-red-200"
                          variant="outline"
                        >
                          Needs Attention
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your recent actions and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 bg-[#F4B315]/5 rounded-lg"
              >
                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1A141A]">
                    {activity.action}
                  </p>
                  <p className="text-sm text-[#423738]">
                    {activity.detail}
                  </p>
                </div>
                <span className="text-xs text-[#8E5915]">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}