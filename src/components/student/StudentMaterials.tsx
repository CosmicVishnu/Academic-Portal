import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Folder, 
  File, 
  Download, 
  Search, 
  FileText, 
  Image, 
  Video, 
  Archive,
  Calendar,
  User,
  Eye,
  FolderOpen
} from 'lucide-react';

export function StudentMaterials() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['mathematics', 'physics']);

  const materialsData = {
    Mathematics: {
      id: 'mathematics',
      folders: [
        {
          name: 'Lecture Notes',
          files: [
            { name: 'Calculus Chapter 1.pdf', type: 'pdf', size: '2.3 MB', date: '2024-01-10', author: 'Dr. Smith' },
            { name: 'Linear Algebra Basics.pdf', type: 'pdf', size: '1.8 MB', date: '2024-01-08', author: 'Dr. Smith' },
            { name: 'Derivatives and Integrals.pdf', type: 'pdf', size: '3.1 MB', date: '2024-01-05', author: 'Dr. Smith' }
          ]
        },
        {
          name: 'Assignments',
          files: [
            { name: 'Assignment 1 - Limits.pdf', type: 'pdf', size: '450 KB', date: '2024-01-12', author: 'Dr. Smith' },
            { name: 'Problem Set 2.docx', type: 'doc', size: '280 KB', date: '2024-01-09', author: 'Dr. Smith' },
            { name: 'Solution Template.xlsx', type: 'excel', size: '150 KB', date: '2024-01-07', author: 'Dr. Smith' }
          ]
        },
        {
          name: 'Reference Materials',
          files: [
            { name: 'Formula Sheet.pdf', type: 'pdf', size: '1.2 MB', date: '2024-01-03', author: 'Dr. Smith' },
            { name: 'Practice Questions.pdf', type: 'pdf', size: '2.5 MB', date: '2024-01-01', author: 'Dr. Smith' }
          ]
        }
      ]
    },
    'Theory of Computation': {
      id: 'physics',
      folders: [
        {
          name: 'Lecture Slides',
          files: [
            { name: 'Mechanics - Force and Motion.pptx', type: 'ppt', size: '4.2 MB', date: '2024-01-11', author: 'Prof. Johnson' },
            { name: 'Thermodynamics Basics.pptx', type: 'ppt', size: '3.8 MB', date: '2024-01-09', author: 'Prof. Johnson' },
            { name: 'Wave Properties.pptx', type: 'ppt', size: '5.1 MB', date: '2024-01-06', author: 'Prof. Johnson' }
          ]
        },
        {
          name: 'Lab Manuals',
          files: [
            { name: 'Optics Lab Manual.pdf', type: 'pdf', size: '6.3 MB', date: '2024-01-10', author: 'Prof. Johnson' },
            { name: 'Electricity Experiments.pdf', type: 'pdf', size: '4.7 MB', date: '2024-01-08', author: 'Prof. Johnson' },
            { name: 'Lab Safety Guidelines.pdf', type: 'pdf', size: '800 KB', date: '2024-01-04', author: 'Lab Coordinator' }
          ]
        },
        {
          name: 'Videos',
          files: [
            { name: 'Pendulum Motion Demo.mp4', type: 'video', size: '25.6 MB', date: '2024-01-12', author: 'Prof. Johnson' },
            { name: 'Electromagnetic Induction.mp4', type: 'video', size: '31.2 MB', date: '2024-01-07', author: 'Prof. Johnson' }
          ]
        }
      ]
    },
    'Object Oriented Programming': {
      id: 'chemistry',
      folders: [
        {
          name: 'Theory Notes',
          files: [
            { name: 'Organic Chemistry Ch1.pdf', type: 'pdf', size: '3.4 MB', date: '2024-01-11', author: 'Ms. Davis' },
            { name: 'Periodic Table Trends.pdf', type: 'pdf', size: '2.1 MB', date: '2024-01-09', author: 'Ms. Davis' },
            { name: 'Chemical Bonding.pdf', type: 'pdf', size: '2.8 MB', date: '2024-01-07', author: 'Ms. Davis' }
          ]
        },
        {
          name: 'Lab Protocols',
          files: [
            { name: 'Titration Procedure.pdf', type: 'pdf', size: '1.5 MB', date: '2024-01-10', author: 'Ms. Davis' },
            { name: 'Qualitative Analysis.pdf', type: 'pdf', size: '2.2 MB', date: '2024-01-08', author: 'Ms. Davis' }
          ]
        },
        {
          name: 'Reaction Charts',
          files: [
            { name: 'Organic Reactions.png', type: 'image', size: '1.8 MB', date: '2024-01-06', author: 'Ms. Davis' },
            { name: 'Electrochemical Series.jpg', type: 'image', size: '950 KB', date: '2024-01-05', author: 'Ms. Davis' }
          ]
        }
      ]
    },
    'Data Structures and Algorithms': {
      id: 'english',
      folders: [
        {
          name: 'Literature',
          files: [
            { name: 'Shakespeare Analysis.pdf', type: 'pdf', size: '2.7 MB', date: '2024-01-12', author: 'Dr. Brown' },
            { name: 'Modern Poetry Collection.pdf', type: 'pdf', size: '4.1 MB', date: '2024-01-10', author: 'Dr. Brown' },
            { name: 'Essay Writing Guide.pdf', type: 'pdf', size: '1.3 MB', date: '2024-01-08', author: 'Dr. Brown' }
          ]
        },
        {
          name: 'Grammar Resources',
          files: [
            { name: 'Grammar Rules.pdf', type: 'pdf', size: '1.6 MB', date: '2024-01-09', author: 'Dr. Brown' },
            { name: 'Vocabulary Builder.docx', type: 'doc', size: '420 KB', date: '2024-01-07', author: 'Dr. Brown' }
          ]
        }
      ]
    },
    'Digital Circuits and Logic Systems': {
      id: 'computer-science',
      folders: [
        {
          name: 'Programming',
          files: [
            { name: 'Python Basics.pdf', type: 'pdf', size: '3.2 MB', date: '2024-01-12', author: 'Prof. Wilson' },
            { name: 'Data Structures.pdf', type: 'pdf', size: '4.5 MB', date: '2024-01-10', author: 'Prof. Wilson' },
            { name: 'Sample Code.zip', type: 'archive', size: '1.2 MB', date: '2024-01-08', author: 'Prof. Wilson' }
          ]
        },
        {
          name: 'Projects',
          files: [
            { name: 'Project Guidelines.pdf', type: 'pdf', size: '800 KB', date: '2024-01-11', author: 'Prof. Wilson' },
            { name: 'Database Schema.pdf', type: 'pdf', size: '1.1 MB', date: '2024-01-09', author: 'Prof. Wilson' }
          ]
        }
      ]
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'ppt':
      case 'pptx':
        return <FileText className="h-4 w-4 text-orange-600" />;
      case 'excel':
      case 'xlsx':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'image':
      case 'jpg':
      case 'png':
        return <Image className="h-4 w-4 text-purple-600" />;
      case 'video':
      case 'mp4':
        return <Video className="h-4 w-4 text-pink-600" />;
      case 'archive':
      case 'zip':
        return <Archive className="h-4 w-4 text-gray-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredMaterials = Object.entries(materialsData).filter(([subject]) => {
    return selectedSubject === 'all' || subject.toLowerCase().includes(selectedSubject.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A141A] mb-2">Study Materials</h1>
        <p className="text-[#423738]">Access your course materials and resources</p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-academic border-0">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#423738]" />
                <Input
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#D3AF85]/30 focus:border-[#F4B315]"
                />
              </div>
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48 border-[#D3AF85]/30">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="computer">Computer Science</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40 border-[#D3AF85]/30">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">Documents</SelectItem>
                <SelectItem value="ppt">Presentations</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="image">Images</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Materials by Subject */}
      <div className="space-y-6">
        {filteredMaterials.map(([subject, data]) => {
          const isExpanded = expandedFolders.includes(data.id);
          
          return (
            <Card key={subject} className="shadow-academic border-0">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="h-10 w-10 bg-[#F4B315]/10 rounded-xl flex items-center justify-center cursor-pointer"
                      onClick={() => toggleFolder(data.id)}
                    >
                      {isExpanded ? (
                        <FolderOpen className="h-5 w-5 text-[#F4B315]" />
                      ) : (
                        <Folder className="h-5 w-5 text-[#F4B315]" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-[#1A141A]">{subject}</CardTitle>
                      <CardDescription>
                        {data.folders.reduce((total, folder) => total + folder.files.length, 0)} files in {data.folders.length} folders
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => toggleFolder(data.id)}
                    className="text-[#8E5915] hover:bg-[#F4B315]/10"
                  >
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </Button>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent>
                  <div className="space-y-6">
                    {data.folders.map((folder, folderIndex) => (
                      <div key={folderIndex} className="space-y-3">
                        <div className="flex items-center space-x-2 border-b border-[#D3AF85]/20 pb-2">
                          <Folder className="h-4 w-4 text-[#E59312]" />
                          <h4 className="font-medium text-[#1A141A]">{folder.name}</h4>
                          <Badge variant="secondary" className="text-xs bg-[#E59312]/10 text-[#8E5915]">
                            {folder.files.length} files
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                          {folder.files
                            .filter(file => 
                              searchTerm === '' || 
                              file.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .filter(file => 
                              selectedType === 'all' || 
                              file.type === selectedType ||
                              (selectedType === 'doc' && ['doc', 'docx'].includes(file.type)) ||
                              (selectedType === 'ppt' && ['ppt', 'pptx'].includes(file.type))
                            )
                            .map((file, fileIndex) => (
                            <div key={fileIndex} className="flex items-center justify-between p-3 bg-[#F4B315]/5 rounded-lg hover:bg-[#F4B315]/10 transition-colors">
                              <div className="flex items-center space-x-3 flex-1">
                                {getFileIcon(file.type)}
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-[#1A141A] truncate">{file.name}</h5>
                                  <div className="flex items-center space-x-4 text-sm text-[#423738] mt-1">
                                    <span>{file.size}</span>
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="h-3 w-3" />
                                      <span>{formatDate(file.date)}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <User className="h-3 w-3" />
                                      <span>{file.author}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 px-2 text-[#8E5915] hover:bg-[#F4B315]/10"
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 px-2 text-[#8E5915] hover:bg-[#F4B315]/10"
                                >
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Quick Access */}
      <Card className="shadow-academic border-0">
        <CardHeader>
          <CardTitle className="text-[#1A141A]">Quick Access</CardTitle>
          <CardDescription>Recently viewed and important materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F4B315]/5 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-4 w-4 text-red-600" />
                <span className="font-medium text-[#1A141A]">Mid-term Schedule</span>
              </div>
              <p className="text-sm text-[#423738]">Recent exam timetable</p>
            </div>
            <div className="p-4 bg-[#E59312]/5 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Video className="h-4 w-4 text-pink-600" />
                <span className="font-medium text-[#1A141A]">Physics Demo</span>
              </div>
              <p className="text-sm text-[#423738]">Pendulum motion video</p>
            </div>
            <div className="p-4 bg-[#8E5915]/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Archive className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-[#1A141A]">Code Samples</span>
              </div>
              <p className="text-sm text-[#423738]">Programming examples</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}