import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Clock, Users, Calendar, Building } from 'lucide-react';

export function EditTimetableAdmin() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A141A] mb-2">Edit Timetable</h1>
        <p className="text-[#423738]">Manage institution-wide timetables and schedules</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Total Classes</p>
                <p className="text-2xl font-bold text-[#1A141A]">156</p>
              </div>
              <Clock className="h-8 w-8 text-[#F4B315]" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Departments</p>
                <p className="text-2xl font-bold text-[#1A141A]">5</p>
              </div>
              <Building className="h-8 w-8 text-[#E59312]" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Rooms</p>
                <p className="text-2xl font-bold text-[#1A141A]">24</p>
              </div>
              <Users className="h-8 w-8 text-[#8E5915]" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Time Slots</p>
                <p className="text-2xl font-bold text-[#1A141A]">6</p>
              </div>
              <Calendar className="h-8 w-8 text-[#D3AF85]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder Content */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">Master Timetable Management</CardTitle>
          <CardDescription>Comprehensive timetable editing interface</CardDescription>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center">
            <Clock className="h-16 w-16 text-[#D3AF85] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1A141A] mb-2">Timetable Editor</h3>
            <p className="text-[#423738] mb-4">
              This feature allows administrators to manage the master timetable for the entire institution,
              including room assignments, teacher schedules, and cross-department coordination.
            </p>
            <div className="flex justify-center space-x-2">
              <Badge className="bg-[#F4B315]/10 text-[#8E5915] border-[#F4B315]/30" variant="outline">
                Coming Soon
              </Badge>
              <Badge className="bg-[#E59312]/10 text-[#8E5915] border-[#E59312]/30" variant="outline">
                Advanced Feature
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}