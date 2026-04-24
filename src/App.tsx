import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';

type UserRole = 'student' | 'teacher' | 'admin';

// ─── Inner app — uses AuthContext ─────────────────────────────────────────────
function AppInner() {
  const { currentUser, isLoading, login, logout, signup } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      await login({ email, password });
      setCurrentPage('home');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Login failed: Invalid email or password.';
      alert(message);
    }
  };

  const handleSignup = async (newUserData: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    password?: string;
  }) => {
    try {
      await signup({
        name: newUserData.name,
        email: newUserData.email,
        password: newUserData.password || '',
        role: newUserData.role,
      });
      alert(`Welcome, ${newUserData.name}! Your account has been created.`);
      setCurrentPage('home');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Registration failed. Please try again.';
      alert(message);
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  // Show nothing while session is being restored
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#F4B315] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#423738]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  const userForDashboard = {
    id: currentUser._id,
    name: currentUser.name,
    role: currentUser.role as UserRole,
    email: currentUser.email,
  };

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'student':
        return (
          <StudentDashboard
            user={userForDashboard}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onLogout={handleLogout}
          />
        );
      case 'teacher':
        return (
          <TeacherDashboard
            user={userForDashboard}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onLogout={handleLogout}
          />
        );
      case 'admin':
        return (
          <AdminDashboard
            user={userForDashboard}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onLogout={handleLogout}
          />
        );
      default:
        return <div>Invalid user role</div>;
    }
  };

  return <div className="min-h-screen bg-background">{renderDashboard()}</div>;
}

// ─── Root — wraps with AuthProvider ──────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}