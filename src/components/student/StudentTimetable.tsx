import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Clock, MapPin, User, Laptop, Book, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';

export function StudentTimetable() {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const timetableData = {
    Monday: [
      {
        period: 1,
        time: '9:00 - 10:00 AM',
        subject: 'Mathematics',
        teacher: 'Minu K K',
        room: 'Room 101',
        type: 'lecture',
        notes: ''
      },
      {
        period: 2,
        time: '10:15 - 11:15 AM',
        subject: 'Thoery of Computation',
        teacher: 'Aparna M',
        room: 'Lab 201',
        type: 'lab',
        notes: 'Bring calculator and lab notebook'
      },
      {
        period: 3,
        time: '11:30 - 12:30 PM',
        subject: 'Object Oriented Programming',
        teacher: 'Chinju P Varghese',
        room: 'Lab 301',
        type: 'lab',
        notes: 'Safety goggles required'
      },
      {
        period: 4,
        time: '1:30 - 2:30 PM',
        subject: 'Data Structures and Algorithms',
        teacher: 'Rekha R',
        room: 'Room 205',
        type: 'lecture',
        notes: ''
      },
      {
        period: 5,
        time: '2:45 - 3:45 PM',
        subject: 'Digital Circuits and Logic Design',
        teacher: 'Amrutha P M',
        room: 'Lab 401',
        type: 'practical',
        notes: 'Bring laptop with development environment setup'
      },
      {
        period: 6,
        time: '4:00 - 5:00 PM',
        subject: 'Free Period',
        teacher: '',
        room: '',
        type: 'free',
        notes: ''
      }
    ],
    Tuesday: [
      {
        period: 1,
        time: '9:00 - 10:00 AM',
        subject: 'Object Oriented Programming',
        teacher: 'Chinju P Varghese',
        room: 'Room 302',
        type: 'lecture',
        notes: ''
      },
      {
        period: 2,
        time: '10:15 - 11:15 AM',
        subject: 'Theory of Computation',
        teacher: 'Aparna M',
        room: 'Room 101',
        type: 'tutorial',
        notes: 'Bring assignment solutions'
      },
      {
        period: 3,
        time: '11:30 - 12:30 PM',
        subject: 'Object Oriented Programming',
        teacher: 'Chinju P Varghese',
        room: 'Room 205',
        type: 'lecture',
        notes: ''
      },
      {
        period: 4,
        time: '1:30 - 2:30 PM',
        subject: 'Mathematics',
        teacher: 'Minu K K',
        room: 'Room 202',
        type: 'lecture',
        notes: ''
      },
      {
        period: 5,
        time: '2:45 - 3:45 PM',
        subject: 'Digitial Circuits and Logic Design',
        teacher: 'Amrutha P M',
        room: 'Lab 401',
        type: 'lecture',
        notes: ''
      },
      {
        period: 6,
        time: '4:00 - 5:00 PM',
        subject: 'Study Hall',
        teacher: '',
        room: 'Library',
        type: 'study',
        notes: 'Self-study time'
      }
    ],
    Wednesday: [
      {
        period: 1,
        time: '9:00 - 10:00 AM',
        subject: 'Physics',
        teacher: 'Prof. Johnson',
        room: 'Lab 201',
        type: 'lab',
        notes: 'Experiment on optics - bring safety glasses'
      },
      {
        period: 2,
        time: '10:15 - 11:15 AM',
        subject: 'Computer Science',
        teacher: 'Prof. Wilson',
        room: 'Lab 401',
        type: 'practical',
        notes: 'Project presentation - laptop required'
      },
      {
        period: 3,
        time: '11:30 - 12:30 PM',
        subject: 'Mathematics',
        teacher: 'Dr. Smith',
        room: 'Room 101',
        type: 'lecture',
        notes: ''
      },
      {
        period: 4,
        time: '1:30 - 2:30 PM',
        subject: 'Chemistry',
        teacher: 'Ms. Davis',
        room: 'Lab 301',
        type: 'lab',
        notes: 'Titration experiment'
      },
      {
        period: 5,
        time: '2:45 - 3:45 PM',
        subject: 'English',
        teacher: 'Dr. Brown',
        room: 'Room 205',
        type: 'seminar',
        notes: 'Group discussion on literature'
      },
      {
        period: 6,
        time: '4:00 - 5:00 PM',
        subject: 'Free Period',
        teacher: '',
        room: '',
        type: 'free',
        notes: ''
      }
    ],
    Thursday: [
      {
        period: 1,
        time: '9:00 - 10:00 AM',
        subject: 'English',
        teacher: 'Dr. Brown',
        room: 'Room 205',
        type: 'lecture',
        notes: ''
      },
      {
        period: 2,
        time: '10:15 - 11:15 AM',
        subject: 'Mathematics',
        teacher: 'Dr. Smith',
        room: 'Room 101',
        type: 'problem solving',
        notes: 'Calculator permitted'
      },
      {
        period: 3,
        time: '11:30 - 12:30 PM',
        subject: 'Physics',
        teacher: 'Prof. Johnson',
        room: 'Room 202',
        type: 'lecture',
        notes: ''
      },
      {
        period: 4,
        time: '1:30 - 2:30 PM',
        subject: 'Computer Science',
        teacher: 'Prof. Wilson',
        room: 'Lab 401',
        type: 'practical',
        notes: 'Debugging session - laptop with IDE required'
      },
      {
        period: 5,
        time: '2:45 - 3:45 PM',
        subject: 'Chemistry',
        teacher: 'Ms. Davis',
        room: 'Room 302',
        type: 'lecture',
        notes: ''
      },
      {
        period: 6,
        time: '4:00 - 5:00 PM',
        subject: 'Tutorial',
        teacher: 'Various',
        room: 'Various',
        type: 'tutorial',
        notes: 'Subject-wise doubt clearing'
      }
    ],
    Friday: [
      {
        period: 1,
        time: '9:00 - 10:00 AM',
        subject: 'Computer Science',
        teacher: 'Prof. Wilson',
        room: 'Lab 401',
        type: 'practical',
        notes: 'Final project submission - laptop required'
      },
      {
        period: 2,
        time: '10:15 - 11:15 AM',
        subject: 'Chemistry',
        teacher: 'Ms. Davis',
        room: 'Lab 301',
        type: 'lab',
        notes: 'Organic chemistry lab'
      },
      {
        period: 3,
        time: '11:30 - 12:30 PM',
        subject: 'Physics',
        teacher: 'Prof. Johnson',
        room: 'Room 202',
        type: 'lecture',
        notes: ''
      },
      {
        period: 4,
        time: '1:30 - 2:30 PM',
        subject: 'Mathematics',
        teacher: 'Dr. Smith',
        room: 'Room 101',
        type: 'test',
        notes: 'Weekly assessment - no calculator'
      },
      {
        period: 5,
        time: '2:45 - 3:45 PM',
        subject: 'English',
        teacher: 'Dr. Brown',
        room: 'Room 205',
        type: 'lecture',
        notes: ''
      },
      {
        period: 6,
        time: '4:00 - 5:00 PM',
        subject: 'Free Period',
        teacher: '',
        room: '',
        type: 'free',
        notes: ''
      }
    ]
  };

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    return days[today];
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'lab':
        return 'bg-green-100 text-green-800';
      case 'practical':
        return 'bg-purple-100 text-purple-800';
      case 'tutorial':
        return 'bg-orange-100 text-orange-800';
      case 'seminar':
        return 'bg-yellow-100 text-yellow-800';
      case 'test':
        return 'bg-red-100 text-red-800';
      case 'study':
        return 'bg-gray-100 text-gray-800';
      case 'free':
        return 'bg-gray-50 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDayOfWeek = (dayName: string) => {
    const today = getCurrentDay();
    const isToday = dayName === today;
    const isWeekend = dayName === 'Saturday' || dayName === 'Sunday';
    
    return { isToday, isWeekend };
  };

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A141A] mb-2">Timetable</h1>
          <p className="text-[#423738]">Your weekly class schedule</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-48 border-[#D3AF85]/30">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Week</SelectItem>
              <SelectItem value="next">Next Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Today's Classes Summary */}
      {getCurrentDay() !== 'Saturday' && getCurrentDay() !== 'Sunday' && (
        <Card className="shadow-academic border-0 border-l-4 border-l-[#F4B315]">
          <CardHeader>
            <CardTitle className="text-[#1A141A] flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Today's Classes ({getCurrentDay()})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timetableData[getCurrentDay() as keyof typeof timetableData]?.map((class_, index) => (
                <div key={index} className={`p-4 rounded-lg border ${class_.type === 'free' ? 'bg-gray-50' : 'bg-white border-[#D3AF85]/20'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#423738]">Period {class_.period}</span>
                    <Badge className={`${getTypeColor(class_.type)} text-xs`} variant="secondary">
                      {class_.type}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-[#1A141A] mb-1">
                    {class_.subject || 'Free Period'}
                  </h4>
                  <p className="text-sm text-[#423738] mb-2">{class_.time}</p>
                  {class_.teacher && (
                    <div className="flex items-center space-x-1 text-sm text-[#8E5915] mb-1">
                      <User className="h-3 w-3" />
                      <span>{class_.teacher}</span>
                    </div>
                  )}
                  {class_.room && (
                    <div className="flex items-center space-x-1 text-sm text-[#8E5915] mb-1">
                      <MapPin className="h-3 w-3" />
                      <span>{class_.room}</span>
                    </div>
                  )}
                  {class_.notes && (
                    <div className="flex items-start space-x-1 text-xs text-[#E59312] bg-[#F4B315]/10 p-2 rounded mt-2">
                      {class_.notes.includes('laptop') ? (
                        <Laptop className="h-3 w-3 mt-0.5" />
                      ) : class_.notes.includes('calculator') || class_.notes.includes('notebook') ? (
                        <Book className="h-3 w-3 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mt-0.5" />
                      )}
                      <span>{class_.notes}</span>
                    </div>
                  )}
                </div>
              )) || []}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Timetable */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">Weekly Schedule</CardTitle>
          <CardDescription>Complete timetable for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                <div className="p-3 font-semibold text-[#1A141A] text-center">Period/Time</div>
                {weekdays.map(day => {
                  const { isToday } = getDayOfWeek(day);
                  return (
                    <div
                      key={day}
                      className={`p-3 font-semibold text-center rounded-lg ${
                        isToday 
                          ? 'bg-[#F4B315] text-[#1A141A]' 
                          : 'bg-[#F4B315]/10 text-[#423738]'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              {/* Timetable Grid */}
              {[1, 2, 3, 4, 5, 6].map(period => (
                <div key={period} className="grid grid-cols-7 gap-2 mb-2">
                  <div className="p-3 bg-[#D3AF85]/10 rounded-lg text-center">
                    <div className="font-medium text-[#1A141A]">Period {period}</div>
                    <div className="text-xs text-[#423738] mt-1">
                      {period === 1 && '9:00-10:00'}
                      {period === 2 && '10:15-11:15'}
                      {period === 3 && '11:30-12:30'}
                      {period === 4 && '1:30-2:30'}
                      {period === 5 && '2:45-3:45'}
                      {period === 6 && '4:00-5:00'}
                    </div>
                  </div>
                  
                  {weekdays.map(day => {
                    const { isToday } = getDayOfWeek(day);
                    const classData = timetableData[day as keyof typeof timetableData]?.[period - 1];
                    
                    return (
                      <div
                        key={`${day}-${period}`}
                        className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                          isToday 
                            ? 'border-[#F4B315] bg-[#F4B315]/5' 
                            : 'border-[#D3AF85]/20 bg-white'
                        }`}
                      >
                        {classData ? (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-[#1A141A] text-sm truncate">
                                {classData.subject}
                              </h4>
                              <Badge className={`${getTypeColor(classData.type)} text-xs`} variant="secondary">
                                {classData.type}
                              </Badge>
                            </div>
                            {classData.teacher && (
                              <p className="text-xs text-[#423738] truncate">{classData.teacher}</p>
                            )}
                            {classData.room && (
                              <div className="flex items-center space-x-1 text-xs text-[#8E5915]">
                                <MapPin className="h-2 w-2" />
                                <span className="truncate">{classData.room}</span>
                              </div>
                            )}
                            {classData.notes && (
                              <div className="flex items-center space-x-1 text-xs text-[#E59312]">
                                {classData.notes.includes('laptop') && <Laptop className="h-2 w-2" />}
                                {classData.notes.includes('calculator') && <Book className="h-2 w-2" />}
                                {!classData.notes.includes('laptop') && !classData.notes.includes('calculator') && <AlertCircle className="h-2 w-2" />}
                                <span className="truncate">{classData.notes}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center text-xs text-[#8E5915]">No Class</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">Class Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'lecture', label: 'Lecture' },
              { type: 'lab', label: 'Laboratory' },
              { type: 'practical', label: 'Practical' },
              { type: 'tutorial', label: 'Tutorial' },
              { type: 'seminar', label: 'Seminar' },
              { type: 'test', label: 'Test/Exam' },
              { type: 'study', label: 'Study Hall' },
              { type: 'free', label: 'Free Period' },
            ].map(item => (
              <div key={item.type} className="flex items-center space-x-2">
                <Badge className={`${getTypeColor(item.type)} text-xs`} variant="secondary">
                  {item.type}
                </Badge>
                <span className="text-sm text-[#423738]">{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}