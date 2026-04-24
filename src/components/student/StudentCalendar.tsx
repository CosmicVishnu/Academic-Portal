import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Trophy, 
  BookOpen, 
  Presentation,
  AlertCircle,
  Check,
  X
} from 'lucide-react';

export function StudentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Series 1 Examinations Begin',
      date: '2024-02-25',
      type: 'exam',
      time: '9:00 AM',
      location: 'Various Rooms',
      description: 'Mid-term examinations for all subjects commence',
      attendanceRequired: true,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Submission of Notebook',
      date: '2024-01-25',
      type: 'submission',
      time: '3:00 PM',
      location: 'Staff Room',
      description: 'Submission of notebooks for Mathematics',
      attendanceRequired: false,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Assignment Submission Deadline',
      date: '2024-02-20',
      type: 'assignment',
      time: '8:00 AM',
      location: 'Staff Room',
      description: 'Submission of assignments for Data Structures',
      attendanceRequired: false,
      status: 'deadline set'
    },
    {
      id: 4,
      title: 'Project Presentation Day',
      date: '2024-02-10',
      type: 'presentation',
      time: '10:00 AM',
      location: 'Classroom',
      description: 'Student project presentations',
      attendanceRequired: true,
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Class Test',
      date: '2024-01-18',
      type: 'Test',
      time: '2:00 PM',
      location: 'Classroom',
      description: 'Class test on linked list for DSA',
      attendanceRequired: false,
      status: 'upcoming'
    },
    {
      id: 6,
      title: 'Mathematics Competition',
      date: '2024-01-12',
      type: 'competition',
      time: '9:00 AM',
      location: 'Room 101',
      description: 'Inter-college mathematics competition',
      attendanceRequired: true,
      status: 'attended'
    },
    {
      id: 7,
      title: 'Cultural Fest Opening',
      date: '2024-03-05',
      type: 'cultural',
      time: '6:00 PM',
      location: 'Main Auditorium',
      description: 'Annual cultural festival inauguration',
      attendanceRequired: false,
      status: 'upcoming'
    },
    {
      id: 8,
      title: 'Career Guidance Session',
      date: '2024-01-30',
      type: 'workshop',
      time: '11:00 AM',
      location: 'Conference Hall',
      description: 'Industry experts sharing career insights',
      attendanceRequired: false,
      status: 'upcoming'
    }
  ];

  const attendanceData: Record<string, { present: boolean; classes: number }> = {
    '2024-01-15': { present: true, classes: 5 },
    '2024-01-16': { present: true, classes: 4 },
    '2024-01-17': { present: false, classes: 5 },
    '2024-01-18': { present: true, classes: 3 },
    '2024-01-19': { present: true, classes: 4 },
    '2024-01-22': { present: true, classes: 5 },
    '2024-01-23': { present: true, classes: 4 },
    '2024-01-24': { present: false, classes: 5 },
    '2024-01-25': { present: true, classes: 3 },
    '2024-01-26': { present: true, classes: 4 },
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'lecture':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sports':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'presentation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'workshop':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'competition':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cultural':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <BookOpen className="h-4 w-4" />;
      case 'lecture':
        return <Presentation className="h-4 w-4" />;
      case 'sports':
        return <Trophy className="h-4 w-4" />;
      case 'presentation':
        return <Presentation className="h-4 w-4" />;
      case 'workshop':
        return <Users className="h-4 w-4" />;
      case 'competition':
        return <Trophy className="h-4 w-4" />;
      case 'cultural':
        return <Users className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'attended':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'registered':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'upcoming':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'missed':
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getAttendanceForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return attendanceData[dateString];
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  const selectedDateAttendance = selectedDate ? getAttendanceForDate(selectedDate) : null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A141A] mb-2">Events Calendar</h1>
        <p className="text-[#423738]">Your academic schedule and attendance tracker</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="shadow-academic border-0">
            <CardHeader>
              <CardTitle className="text-[#1A141A] flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Academic Calendar</span>
              </CardTitle>
              <CardDescription>Click on a date to view events and attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md border border-[#D3AF85]/20"
                modifiers={{
                  hasEvent: (date: Date) => getEventsForDate(date).length > 0,
                  hasAttendance: (date: Date) => getAttendanceForDate(date) !== undefined,
                  presentDay: (date: Date) => {
                    const attendance = getAttendanceForDate(date);
                    return attendance?.present === true;
                  },
                  absentDay: (date: Date) => {
                    const attendance = getAttendanceForDate(date);
                    return attendance?.present === false;
                  }
                }}
                modifiersStyles={{
                  hasEvent: { 
                    backgroundColor: '#F4B315', 
                    color: '#1A141A',
                    fontWeight: 'bold'
                  },
                  presentDay: { 
                    backgroundColor: '#dcfce7',
                    color: '#166534'
                  },
                  absentDay: { 
                    backgroundColor: '#fee2e2',
                    color: '#dc2626'
                  }
                }}
              />
              
              {/* Calendar Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-[#F4B315] rounded"></div>
                  <span className="text-[#423738]">Events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                  <span className="text-[#423738]">Present</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                  <span className="text-[#423738]">Absent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <Card className="shadow-academic border-0">
            <CardHeader>
              <CardTitle className="text-[#1A141A]">Upcoming Events</CardTitle>
              <CardDescription>Next 5 events on your calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getUpcomingEvents().map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 bg-[#F4B315]/5 rounded-lg">
                    <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#1A141A] text-sm truncate">{event.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={`${getEventTypeColor(event.type)} text-xs border`} variant="outline">
                          {event.type}
                        </Badge>
                        {getStatusIcon(event.status)}
                      </div>
                      <p className="text-xs text-[#423738] mt-1">
                        {formatDate(event.date)} at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Summary */}
          <Card className="shadow-academic border-0">
            <CardHeader>
              <CardTitle className="text-[#1A141A]">This Week's Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(attendanceData)
                  .slice(-5)
                  .map(([date, data]) => (
                    <div key={date} className="flex items-center justify-between p-2 rounded-lg bg-[#F4B315]/5">
                      <div className="flex items-center space-x-2">
                        {data.present ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm text-[#1A141A]">
                          {new Date(date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <span className="text-xs text-[#423738]">
                        {data.classes} classes
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card className="shadow-academic border-0">
          <CardHeader>
            <CardTitle className="text-[#1A141A]">
              {formatDate(selectedDate.toISOString().split('T')[0])}
            </CardTitle>
            <CardDescription>Events and attendance for selected date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Events for Selected Date */}
              <div>
                <h3 className="font-medium text-[#1A141A] mb-4 flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Events ({selectedDateEvents.length})</span>
                </h3>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => (
                      <div key={event.id} className="p-4 border border-[#D3AF85]/20 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-[#1A141A]">{event.title}</h4>
                          <Badge className={`${getEventTypeColor(event.type)} text-xs border`} variant="outline">
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#423738] mb-2">{event.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-[#8E5915]">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(event.status)}
                            <span className="text-xs text-[#423738] capitalize">{event.status}</span>
                          </div>
                          {event.attendanceRequired && (
                            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-800 border-orange-200">
                              Attendance Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#423738] p-4 bg-[#F4B315]/5 rounded-lg">
                    No events scheduled for this date.
                  </p>
                )}
              </div>

              {/* Attendance for Selected Date */}
              <div>
                <h3 className="font-medium text-[#1A141A] mb-4 flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Attendance</span>
                </h3>
                {selectedDateAttendance ? (
                  <div className="p-4 border border-[#D3AF85]/20 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-[#1A141A]">Class Attendance</span>
                      <div className="flex items-center space-x-2">
                        {selectedDateAttendance.present ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${selectedDateAttendance.present ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedDateAttendance.present ? 'Present' : 'Absent'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#423738]">
                      Total classes: {selectedDateAttendance.classes}
                    </p>
                    <div className={`mt-3 p-2 rounded-lg text-xs ${selectedDateAttendance.present ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      {selectedDateAttendance.present 
                        ? 'You attended all scheduled classes on this day.' 
                        : 'You were absent from classes on this day.'}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#423738] p-4 bg-[#F4B315]/5 rounded-lg">
                    No attendance data available for this date.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}