import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { 
  Clock, 
  Edit, 
  Save, 
  Plus, 
  MapPin, 
  Users, 
  BookOpen, 
  AlertCircle,
  Laptop,
  Calendar
} from 'lucide-react';

interface ClassEntry {
  id: string;
  subject: string;
  class: string;
  room: string;
  time: string;
  type: string;
  prerequisites?: string;
}

export function EditTimetable() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [editingClass, setEditingClass] = useState<ClassEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [timetableData, setTimetableData] = useState<Record<string, ClassEntry[]>>({
    Monday: [
      { id: '1', subject: 'Mathematics', class: 'Class A', room: 'Room 101', time: '9:00 - 10:00 AM', type: 'Lecture' },
      { id: '2', subject: 'Mathematics', class: 'Class B', room: 'Room 101', time: '10:15 - 11:15 AM', type: 'Tutorial', prerequisites: 'Bring assignment solutions' },
      { id: '3', subject: 'Mathematics', class: 'Class C', room: 'Room 102', time: '11:30 - 12:30 PM', type: 'Lecture' },
      { id: '4', subject: 'Mathematics', class: 'Class A', room: 'Room 101', time: '2:45 - 3:45 PM', type: 'Problem Solving', prerequisites: 'Calculator required' },
    ],
    Tuesday: [
      { id: '5', subject: 'Mathematics', class: 'Class B', room: 'Room 101', time: '9:00 - 10:00 AM', type: 'Lecture' },
      { id: '6', subject: 'Mathematics', class: 'Class D', room: 'Room 102', time: '10:15 - 11:15 AM', type: 'Tutorial' },
      { id: '7', subject: 'Mathematics', class: 'Class C', room: 'Room 101', time: '1:30 - 2:30 PM', type: 'Lecture' },
      { id: '8', subject: 'Mathematics', class: 'Class A', room: 'Lab 201', time: '2:45 - 3:45 PM', type: 'Practical', prerequisites: 'Laptop with MATLAB required' },
    ],
    Wednesday: [
      { id: '9', subject: 'Mathematics', class: 'Class C', room: 'Room 101', time: '9:00 - 10:00 AM', type: 'Lecture' },
      { id: '10', subject: 'Mathematics', class: 'Class A', room: 'Room 102', time: '11:30 - 12:30 PM', type: 'Test', prerequisites: 'No calculator allowed' },
      { id: '11', subject: 'Mathematics', class: 'Class B', room: 'Room 101', time: '1:30 - 2:30 PM', type: 'Lecture' },
    ],
    Thursday: [
      { id: '12', subject: 'Mathematics', class: 'Class D', room: 'Room 101', time: '9:00 - 10:00 AM', type: 'Lecture' },
      { id: '13', subject: 'Mathematics', class: 'Class C', room: 'Room 102', time: '10:15 - 11:15 AM', type: 'Tutorial', prerequisites: 'Previous homework completed' },
      { id: '14', subject: 'Mathematics', class: 'Class B', room: 'Room 101', time: '2:45 - 3:45 PM', type: 'Problem Solving' },
    ],
    Friday: [
      { id: '15', subject: 'Mathematics', class: 'Class A', room: 'Room 101', time: '9:00 - 10:00 AM', type: 'Lecture' },
      { id: '16', subject: 'Mathematics', class: 'Class D', room: 'Room 102', time: '11:30 - 12:30 PM', type: 'Tutorial' },
      { id: '17', subject: 'Mathematics', class: 'Class C', room: 'Lab 201', time: '1:30 - 2:30 PM', type: 'Practical', prerequisites: 'Laptop and graphing calculator' },
    ],
  });

  const [classForm, setClassForm] = useState({
    subject: 'Mathematics',
    class: '',
    room: '',
    time: '',
    type: '',
    prerequisites: ''
  });

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const classTypes = ['Lecture', 'Tutorial', 'Practical', 'Problem Solving', 'Test', 'Lab', 'Seminar'];
  const classes = ['Class A', 'Class B', 'Class C', 'Class D'];
  const rooms = ['Room 101', 'Room 102', 'Room 201', 'Room 202', 'Lab 201', 'Lab 301', 'Lab 401'];
  const timeSlots = [
    '9:00 - 10:00 AM',
    '10:15 - 11:15 AM',
    '11:30 - 12:30 PM',
    '1:30 - 2:30 PM',
    '2:45 - 3:45 PM',
    '4:00 - 5:00 PM'
  ];

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'tutorial':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'practical':
      case 'lab':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'problem solving':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'test':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'seminar':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEditClass = (classEntry: ClassEntry) => {
    setEditingClass(classEntry);
    setClassForm({
      subject: classEntry.subject,
      class: classEntry.class,
      room: classEntry.room,
      time: classEntry.time,
      type: classEntry.type,
      prerequisites: classEntry.prerequisites || ''
    });
    setIsDialogOpen(true);
  };

  const handleAddClass = () => {
    setEditingClass(null);
    setClassForm({
      subject: 'Mathematics',
      class: '',
      room: '',
      time: '',
      type: '',
      prerequisites: ''
    });
    setIsDialogOpen(true);
  };

  const handleSaveClass = () => {
    if (!classForm.class || !classForm.room || !classForm.time || !classForm.type) {
      alert('Please fill in all required fields');
      return;
    }

    const newClass: ClassEntry = {
      id: editingClass?.id || Date.now().toString(),
      subject: classForm.subject,
      class: classForm.class,
      room: classForm.room,
      time: classForm.time,
      type: classForm.type,
      prerequisites: classForm.prerequisites
    };

    setTimetableData(prev => {
      const dayClasses = prev[selectedDay] || [];
      
      if (editingClass) {
        // Update existing class
        const updatedClasses = dayClasses.map(cls => 
          cls.id === editingClass.id ? newClass : cls
        );
        return { ...prev, [selectedDay]: updatedClasses };
      } else {
        // Add new class
        return { ...prev, [selectedDay]: [...dayClasses, newClass] };
      }
    });

    setIsDialogOpen(false);
    setEditingClass(null);
  };

  const handleDeleteClass = (classId: string) => {
    if (confirm('Are you sure you want to delete this class?')) {
      setTimetableData(prev => ({
        ...prev,
        [selectedDay]: prev[selectedDay].filter(cls => cls.id !== classId)
      }));
    }
  };

  const getTotalClassesForDay = (day: string) => {
    return timetableData[day]?.length || 0;
  };

  const hasPrerequisites = (prerequisites?: string) => {
    return prerequisites && prerequisites.trim().length > 0;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A141A] mb-2">Edit Timetable</h1>
        <p className="text-[#423738]">Manage your class schedule and add prerequisites for students</p>
      </div>

      {/* Day Selection and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-academic border-0">
            <CardHeader>
              <CardTitle className="text-[#1A141A]">Select Day</CardTitle>
              <CardDescription>Choose a day to view and edit your schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {weekdays.map(day => (
                  <Button
                    key={day}
                    variant={selectedDay === day ? "default" : "outline"}
                    onClick={() => setSelectedDay(day)}
                    className={selectedDay === day 
                      ? "bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A]" 
                      : "border-[#D3AF85] text-[#423738] hover:bg-[#F4B315]/10"
                    }
                  >
                    <div className="text-center">
                      <div className="font-medium">{day}</div>
                      <div className="text-xs mt-1">{getTotalClassesForDay(day)} classes</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-academic border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#423738]">Total Classes</p>
                  <p className="text-2xl font-bold text-[#1A141A]">
                    {Object.values(timetableData).reduce((total, day) => total + day.length, 0)}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-[#F4B315]" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-academic border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#423738]">Today's Classes</p>
                  <p className="text-2xl font-bold text-[#1A141A]">{getTotalClassesForDay(selectedDay)}</p>
                </div>
                <Clock className="h-8 w-8 text-[#E59312]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Timetable for Selected Day */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1A141A]">{selectedDay} Schedule</CardTitle>
              <CardDescription>Your classes for {selectedDay.toLowerCase()}</CardDescription>
            </div>
            <Button
              onClick={handleAddClass}
              className="bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {timetableData[selectedDay]?.length > 0 ? (
            <div className="space-y-4">
              {timetableData[selectedDay]
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((classEntry) => (
                <div key={classEntry.id} className="p-4 border border-[#D3AF85]/20 rounded-lg hover:bg-[#F4B315]/5 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={`${getTypeColor(classEntry.type)} text-xs border`} variant="outline">
                          {classEntry.type}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-[#8E5915]">
                          <Clock className="h-3 w-3" />
                          <span>{classEntry.time}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-[#1A141A] mb-1">
                        {classEntry.subject} - {classEntry.class}
                      </h4>
                      
                      <div className="flex items-center space-x-4 text-sm text-[#423738] mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{classEntry.room}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{classEntry.class}</span>
                        </div>
                      </div>

                      {hasPrerequisites(classEntry.prerequisites) && (
                        <div className="flex items-start space-x-2 mt-3 p-2 bg-[#F4B315]/10 rounded-lg">
                          {classEntry.prerequisites?.includes('laptop') || classEntry.prerequisites?.includes('computer') ? (
                            <Laptop className="h-4 w-4 text-[#E59312] mt-0.5" />
                          ) : classEntry.prerequisites?.includes('calculator') ? (
                            <BookOpen className="h-4 w-4 text-[#E59312] mt-0.5" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-[#E59312] mt-0.5" />
                          )}
                          <div>
                            <p className="text-xs font-medium text-[#1A141A]">Prerequisites for Students:</p>
                            <p className="text-xs text-[#8E5915]">{classEntry.prerequisites}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClass(classEntry)}
                        className="text-[#8E5915] hover:bg-[#F4B315]/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClass(classEntry.id)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-[#D3AF85] mx-auto mb-4" />
              <p className="text-[#423738] mb-4">No classes scheduled for {selectedDay}</p>
              <Button
                onClick={handleAddClass}
                className="bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Class
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Class Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1A141A]">
              {editingClass ? 'Edit Class' : 'Add New Class'}
            </DialogTitle>
            <DialogDescription>
              {editingClass ? 'Update the class details' : 'Fill in the details for the new class'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class-select">Class</Label>
                <Select value={classForm.class} onValueChange={(value: string) => setClassForm(prev => ({ ...prev, class: value }))}>
                  <SelectTrigger id="class-select" className="border-[#D3AF85]/30">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type-select">Type</Label>
                <Select value={classForm.type} onValueChange={(value: string) => setClassForm(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger id="type-select" className="border-[#D3AF85]/30">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {classTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room-select">Room</Label>
                <Select value={classForm.room} onValueChange={(value: string) => setClassForm(prev => ({ ...prev, room: value }))}>
                  <SelectTrigger id="room-select" className="border-[#D3AF85]/30">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(room => (
                      <SelectItem key={room} value={room}>{room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-select">Time</Label>
                <Select value={classForm.time} onValueChange={(value: string) => setClassForm(prev => ({ ...prev, time: value }))}>
                  <SelectTrigger id="time-select" className="border-[#D3AF85]/30">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prerequisites">Prerequisites/Notes for Students</Label>
              <Textarea
                id="prerequisites"
                placeholder="e.g., Bring laptop, calculator required, complete homework first..."
                value={classForm.prerequisites}
                onChange={(e) => setClassForm(prev => ({ ...prev, prerequisites: e.target.value }))}
                className="border-[#D3AF85]/30 focus:border-[#F4B315]"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-[#8E5915] text-[#8E5915] hover:bg-[#8E5915] hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveClass}
                className="bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A]"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingClass ? 'Update' : 'Add'} Class
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}