import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import { Separator } from '../ui/separator';
import { Calendar, Users, Search, Save, CheckCircle, XCircle } from 'lucide-react';
import { studentsApi, Student } from '../../api/students';
import { attendanceApi } from '../../api/attendance';
import { coursesApi, Course } from '../../api/courses';

export function MarkAttendance() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState<Record<string, boolean>>({});
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const periods = [
    { id: '1', name: 'Period 1', time: '9:00 - 10:00 AM' },
    { id: '2', name: 'Period 2', time: '10:15 - 11:15 AM' },
    { id: '3', name: 'Period 3', time: '11:30 - 12:30 PM' },
    { id: '4', name: 'Period 4', time: '1:30 - 2:30 PM' },
    { id: '5', name: 'Period 5', time: '2:45 - 3:45 PM' },
    { id: '6', name: 'Period 6', time: '4:00 - 5:00 PM' },
  ];

  // Load courses and students on mount
  useEffect(() => {
    coursesApi.getAll().then(setCourses).catch(() => {});
    studentsApi.getAll().then(setStudents).catch(() => {
      // Fallback hardcoded students
      setStudents([
        { _id: '1', name: 'Nava', rollNumber: 'CS001', email: 'nava@example.com', role: 'student', department: 'CS', semester: 3, isActive: true, joinDate: '' },
        { _id: '2', name: 'Aryan', rollNumber: 'CS002', email: 'aryan@example.com', role: 'student', department: 'CS', semester: 3, isActive: true, joinDate: '' },
        { _id: '3', name: 'Vishnu', rollNumber: 'CS003', email: 'vishnu@example.com', role: 'student', department: 'CS', semester: 3, isActive: true, joinDate: '' },
        { _id: '4', name: 'Niloofer', rollNumber: 'CS004', email: 'niloofer@example.com', role: 'student', department: 'CS', semester: 3, isActive: true, joinDate: '' },
        { _id: '5', name: 'Rashid', rollNumber: 'CS005', email: 'rashid@example.com', role: 'student', department: 'CS', semester: 3, isActive: true, joinDate: '' },
        { _id: '6', name: 'George', rollNumber: 'CS006', email: 'george@example.com', role: 'student', department: 'CS', semester: 3, isActive: true, joinDate: '' },
      ]);
    });
  }, []);

  const handleAttendanceToggle = (studentId: string, present: boolean) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: present }));
  };

  const handleMarkAll = (present: boolean) => {
    const newData: Record<string, boolean> = {};
    filteredStudents.forEach(s => { newData[s._id] = present; });
    setAttendanceData(prev => ({ ...prev, ...newData }));
  };

  const handleSaveAttendance = async () => {
    if (!selectedClass || !selectedPeriod) {
      alert('Please select class and period');
      return;
    }
    setIsSaving(true);
    try {
      const records = filteredStudents.map(s => ({
        studentId: s._id,
        status: attendanceData[s._id] ? 'present' : 'absent',
      }));
      await attendanceApi.save({
        courseId: selectedClass,
        date: selectedDate,
        period: periods.find(p => p.id === selectedPeriod)?.name || selectedPeriod,
        records,
      });
      alert('Attendance saved successfully!');
    } catch {
      alert('Failed to save attendance. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presentCount = Object.values(attendanceData).filter(Boolean).length;
  const totalCount = filteredStudents.length;
  const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  const getAttendanceColor = (pct: number) => {
    if (pct >= 90) return 'text-green-600';
    if (pct >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A141A] mb-2">Mark Attendance</h1>
        <p className="text-[#423738]">Record student attendance for your classes</p>
      </div>

      {/* Class Selection */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <CardTitle className="text-[#1A141A] flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Class Selection</span>
          </CardTitle>
          <CardDescription>Choose class, date, and period for attendance marking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class-select">Class / Course</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class-select" className="border-[#D3AF85]/30">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.name} ({course.code})
                    </SelectItem>
                  ))}
                  {/* Fallback options if no courses loaded */}
                  {courses.length === 0 && (
                    <>
                      <SelectItem value="mat">Mathematics - Class A</SelectItem>
                      <SelectItem value="cs">Computer Science - Class B</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-select">Date</Label>
              <Input id="date-select" type="date" value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-[#D3AF85]/30 focus:border-[#F4B315]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="period-select">Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger id="period-select" className="border-[#D3AF85]/30">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(period => (
                    <SelectItem key={period.id} value={period.id}>{period.name} ({period.time})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={() => { setAttendanceData({}); setSearchTerm(''); }}
                className="w-full bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A]"
                disabled={!selectedClass || !selectedPeriod}>
                Load Students
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedClass && selectedPeriod && (
        <>
          {/* Attendance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="shadow-academic border-0"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-[#423738]">Total Students</p><p className="text-2xl font-bold text-[#1A141A]">{totalCount}</p></div><Users className="h-8 w-8 text-[#F4B315]" /></div></CardContent></Card>
            <Card className="shadow-academic border-0"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-[#423738]">Present</p><p className="text-2xl font-bold text-green-600">{presentCount}</p></div><CheckCircle className="h-8 w-8 text-green-600" /></div></CardContent></Card>
            <Card className="shadow-academic border-0"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-[#423738]">Absent</p><p className="text-2xl font-bold text-red-600">{totalCount - presentCount}</p></div><XCircle className="h-8 w-8 text-red-600" /></div></CardContent></Card>
            <Card className="shadow-academic border-0"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-[#423738]">Attendance %</p><p className={`text-2xl font-bold ${getAttendanceColor(attendancePercentage)}`}>{attendancePercentage}%</p></div><Calendar className="h-8 w-8 text-[#E59312]" /></div></CardContent></Card>
          </div>

          {/* Search and Bulk Actions */}
          <Card className="shadow-academic border-0">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#423738]" />
                    <Input placeholder="Search students by name or roll number..."
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-[#D3AF85]/30 focus:border-[#F4B315]" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => handleMarkAll(true)} className="border-green-500 text-green-600 hover:bg-green-50">Mark All Present</Button>
                  <Button variant="outline" onClick={() => handleMarkAll(false)} className="border-red-500 text-red-600 hover:bg-red-50">Mark All Absent</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student List */}
          <Card className="shadow-academic border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#1A141A]">Student Attendance</CardTitle>
                  <CardDescription>{courses.find(c => c._id === selectedClass)?.name || 'Selected Class'} - {periods.find(p => p.id === selectedPeriod)?.name}</CardDescription>
                </div>
                <Button onClick={handleSaveAttendance} disabled={isSaving} className="bg-[#E59312] hover:bg-[#8E5915] text-white">
                  <Save className="h-4 w-4 mr-2" />{isSaving ? 'Saving...' : 'Save Attendance'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredStudents.map((student, index) => {
                  const isPresent = attendanceData[student._id] || false;
                  return (
                    <div key={student._id}>
                      <div className="flex items-center justify-between p-4 hover:bg-[#F4B315]/5 rounded-lg transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-[#F4B315] rounded-lg flex items-center justify-center text-sm font-semibold text-[#1A141A]">{index + 1}</div>
                          <div>
                            <h4 className="font-medium text-[#1A141A]">{student.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-[#423738]">
                              <span>Roll No: {student.rollNumber}</span>
                              <span>•</span>
                              <span>{student.email}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button variant={isPresent ? 'default' : 'outline'} size="sm"
                            onClick={() => handleAttendanceToggle(student._id, true)}
                            className={isPresent ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-green-500 text-green-600 hover:bg-green-50'}>
                            <CheckCircle className="h-4 w-4 mr-1" />Present
                          </Button>
                          <Button variant={!isPresent && attendanceData.hasOwnProperty(student._id) ? 'default' : 'outline'} size="sm"
                            onClick={() => handleAttendanceToggle(student._id, false)}
                            className={!isPresent && attendanceData.hasOwnProperty(student._id) ? 'bg-red-600 hover:bg-red-700 text-white' : 'border-red-500 text-red-600 hover:bg-red-50'}>
                            <XCircle className="h-4 w-4 mr-1" />Absent
                          </Button>
                        </div>
                      </div>
                      {index < filteredStudents.length - 1 && <Separator className="bg-[#D3AF85]/20" />}
                    </div>
                  );
                })}
              </div>
              {filteredStudents.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-[#D3AF85] mx-auto mb-4" />
                  <p className="text-[#423738]">No students found matching your search criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}