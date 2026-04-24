/**
 * Seed Script — Academic Portal
 * Populates the database with mock data matching the existing frontend's hardcoded values.
 *
 * Run: npm run seed
 * This will DROP existing data and re-seed fresh.
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/User';
import { Admin } from './models/Admin';
import { Student } from './models/Student';
import { Faculty } from './models/Faculty';
import { Course } from './models/Course';
import { Grade } from './models/Grade';
import { Attendance } from './models/Attendance';
import { Announcement } from './models/Announcement';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/academic_portal';

async function seed() {
  console.log('🌱 Starting seed...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // ── Clear existing data ────────────────────────────────────────────────────
  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Grade.deleteMany({}),
    Attendance.deleteMany({}),
    Announcement.deleteMany({}),
  ]);
  console.log('🗑️  Cleared existing data');

  // ── Faculty ────────────────────────────────────────────────────────────────
  const facultyData = [
    { name: 'Nilakshi', email: 'nilakshi@example.com', password: 'password456', department: 'Computer Science', employeeId: 'FAC001' },
    { name: 'Minu K K', email: 'minu@example.com', password: 'password456', department: 'Mathematics', employeeId: 'FAC002' },
    { name: 'Aparna M', email: 'aparna@example.com', password: 'password456', department: 'Computer Science', employeeId: 'FAC003' },
    { name: 'Chinju P Varghese', email: 'chinju@example.com', password: 'password456', department: 'Computer Science', employeeId: 'FAC004' },
    { name: 'Rekha R', email: 'rekha@example.com', password: 'password456', department: 'Computer Science', employeeId: 'FAC005' },
    { name: 'Amrutha P M', email: 'amrutha@example.com', password: 'password456', department: 'Electronics', employeeId: 'FAC006' },
  ];

  const createdFaculty = await Faculty.create(facultyData);
  console.log(`👩‍🏫 Created ${createdFaculty.length} faculty members`);

  // ── Admin ──────────────────────────────────────────────────────────────────
  const admin = await Admin.create({
    name: 'Nitha',
    email: 'nitha@example.com',
    password: 'password789',
    department: 'Administration',
  });
  console.log('🔑 Created admin user');

  // ── Courses ────────────────────────────────────────────────────────────────
  const courseData = [
    { name: 'Mathematics', code: 'MAT301', facultyId: createdFaculty[1]._id, credits: 4, department: 'Mathematics', semester: 3 },
    { name: 'Theory of Computation', code: 'CS302', facultyId: createdFaculty[2]._id, credits: 3, department: 'Computer Science', semester: 3 },
    { name: 'Object Oriented Programming', code: 'CS303', facultyId: createdFaculty[3]._id, credits: 4, department: 'Computer Science', semester: 3 },
    { name: 'Data Structures and Algorithms', code: 'CS304', facultyId: createdFaculty[4]._id, credits: 4, department: 'Computer Science', semester: 3 },
    { name: 'Digital Circuits and Logic Designing', code: 'EC305', facultyId: createdFaculty[5]._id, credits: 3, department: 'Electronics', semester: 3 },
  ];

  const courses = await Course.create(courseData);
  console.log(`📚 Created ${courses.length} courses`);

  // ── Students ───────────────────────────────────────────────────────────────
  const studentData = [
    { name: 'Nava', email: 'nava@example.com', password: 'password123', department: 'Computer Science', rollNumber: 'CS001', semester: 3 },
    { name: 'Aryan', email: 'aryan@example.com', password: 'password123', department: 'Computer Science', rollNumber: 'CS002', semester: 3 },
    { name: 'Vishnu', email: 'vishnu@example.com', password: 'password123', department: 'Computer Science', rollNumber: 'CS003', semester: 3 },
    { name: 'Niloofer', email: 'niloofer@example.com', password: 'password123', department: 'Computer Science', rollNumber: 'CS004', semester: 3 },
    { name: 'Rashid', email: 'rashid@example.com', password: 'password123', department: 'Computer Science', rollNumber: 'CS005', semester: 3 },
    { name: 'George', email: 'george@example.com', password: 'password123', department: 'Computer Science', rollNumber: 'CS006', semester: 3 },
  ];

  const students = await Student.create(studentData);
  console.log(`🎓 Created ${students.length} students`);

  // ── Attendance — matching hardcoded percentages from the frontend ──────────
  // For student Nava (CS001): MAT:92%, TOC:68%, OOP:85%, DSA:94%, DCLD:67%
  const attendancePlans = [
    { courseIdx: 0, totalClasses: 25, presentClasses: 23 },   // MAT 92%
    { courseIdx: 1, totalClasses: 22, presentClasses: 15 },   // TOC 68%
    { courseIdx: 2, totalClasses: 20, presentClasses: 17 },   // OOP 85%
    { courseIdx: 3, totalClasses: 18, presentClasses: 17 },   // DSA 94%
    { courseIdx: 4, totalClasses: 24, presentClasses: 16 },   // DCLD 67%
  ];

  const attendanceRecords = [];
  const baseDate = new Date('2024-01-01');

  for (const student of students) {
    for (const plan of attendancePlans) {
      const course = courses[plan.courseIdx];
      for (let day = 0; day < plan.totalClasses; day++) {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + day * 2); // classes every 2 days
        const isPresent = day < plan.presentClasses;
        attendanceRecords.push({
          studentId: student._id,
          courseId: course._id,
          date,
          status: isPresent ? 'present' : 'absent',
          markedBy: createdFaculty[plan.courseIdx]._id,
          period: `Period ${(day % 6) + 1}`,
        });
      }
    }
  }

  // Bulk insert attendance (skip duplicates)
  await Attendance.insertMany(attendanceRecords, { ordered: false }).catch(() => {});
  console.log(`📋 Created ${attendanceRecords.length} attendance records`);

  // ── Grades ─────────────────────────────────────────────────────────────────
  const gradeRecords = [];
  const gradeValues = [88, 72, 85, 91, 74]; // MAT, TOC, OOP, DSA, DCLD

  for (const student of students) {
    for (let i = 0; i < courses.length; i++) {
      // Vary marks slightly between students
      const baseMarks = gradeValues[i];
      const variation = Math.floor(Math.random() * 10) - 5;
      const marks = Math.min(100, Math.max(0, baseMarks + variation));
      gradeRecords.push({
        studentId: student._id,
        courseId: courses[i]._id,
        marks,
        grade: marks >= 90 ? 'S' : marks >= 80 ? 'A' : marks >= 70 ? 'B' : marks >= 60 ? 'C' : marks >= 50 ? 'D' : 'F',
        semester: 3,
        examType: 'internal',
        gradedBy: createdFaculty[i]._id,
      });
    }
  }

  await Grade.insertMany(gradeRecords, { ordered: false }).catch(() => {});
  console.log(`📊 Created ${gradeRecords.length} grade records`);

  // ── Announcements ──────────────────────────────────────────────────────────
  await Announcement.create([
    {
      title: 'Mid-term Examination Schedule Released',
      content: 'The mid-term examination schedule for all courses has been published. Students are advised to check their individual timetables and prepare accordingly. The examinations will commence from February 15th, 2024.',
      priority: 'high',
      category: 'academic',
      author: createdFaculty[0]._id,
      authorName: 'Academic Office',
      targetAudience: 'all',
      tags: ['exams', 'schedule', 'important'],
      status: 'published',
    },
    {
      title: 'Library Hours Extended During Exam Period',
      content: 'The central library will remain open until 10:00 PM from January 20th to February 28th to accommodate students during the examination period. Additional study spaces have been arranged.',
      priority: 'medium',
      category: 'facilities',
      author: admin._id,
      authorName: 'Library Administration',
      targetAudience: 'all',
      tags: ['library', 'extended hours', 'study'],
      status: 'published',
    },
    {
      title: 'Sem Exam Registration Now Open',
      content: 'Registration for the semester examination is now open. Students must complete their registration before the deadline to be eligible for examinations. Visit the academic office or use the online portal to register.',
      priority: 'high',
      category: 'academic',
      author: admin._id,
      authorName: 'Academic Office',
      targetAudience: 'all',
      tags: ['registration', 'semester', 'exam'],
      status: 'published',
    },
    {
      title: 'Assignment Submission Deadline Extended',
      content: 'The deadline for Mathematics Assignment 3 has been extended to January 20th due to technical difficulties with the submission portal.',
      priority: 'medium',
      category: 'assignment',
      author: createdFaculty[1]._id,
      authorName: 'Minu K K',
      targetAudience: 'Mathematics Students',
      tags: ['mathematics', 'assignment', 'deadline'],
      status: 'published',
    },
    {
      title: 'Extra Tutorial Sessions - Calculus',
      content: 'Additional tutorial sessions for Calculus will be conducted every Saturday from 2-4 PM in Room 101. These sessions are optional but highly recommended for students below 75% attendance.',
      priority: 'low',
      category: 'tutorial',
      author: createdFaculty[1]._id,
      authorName: 'Minu K K',
      targetAudience: 'Class A & B',
      tags: ['mathematics', 'tutorial', 'saturday'],
      status: 'published',
    },
  ]);
  console.log('📢 Created announcements');

  console.log('\n✅ Seed complete! Default credentials:');
  console.log('──────────────────────────────────────────');
  console.log('Student  → nava@example.com / password123');
  console.log('Teacher  → nilakshi@example.com / password456');
  console.log('Admin    → nitha@example.com / password789');
  console.log('──────────────────────────────────────────\n');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  mongoose.disconnect();
  process.exit(1);
});
