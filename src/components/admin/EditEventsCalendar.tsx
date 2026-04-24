import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Users, Trophy, BookOpen } from 'lucide-react';

export function EditEventsCalendar() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A141A] mb-2">Edit Events Calendar</h1>
        <p className="text-[#423738]">Manage institutional events and academic calendar</p>
      </div>

      {/* Event Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Total Events</p>
                <p className="text-2xl font-bold text-[#1A141A]">47</p>
              </div>
              <Calendar className="h-8 w-8 text-[#F4B315]" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Academic</p>
                <p className="text-2xl font-bold text-[#1A141A]">23</p>
              </div>
              <BookOpen className="h-8 w-8 text-[#E59312]" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Sports</p>
                <p className="text-2xl font-bold text-[#1A141A]">12</p>
              </div>
              <Trophy className="h-8 w-8 text-[#8E5915]" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#423738]">Cultural</p>
                <p className="text-2xl font-bold text-[#1A141A]">12</p>
              </div>
              <Users className="h-8 w-8 text-[#D3AF85]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder Content */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">Events Calendar Management</CardTitle>
          <CardDescription>Comprehensive event planning and calendar management</CardDescription>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center">
            <Calendar className="h-16 w-16 text-[#D3AF85] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1A141A] mb-2">Event Management System</h3>
            <p className="text-[#423738] mb-4">
              This comprehensive event management system allows administrators to create, schedule, and manage
              all institutional events including academic calendar, sports events, cultural activities, and more.
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