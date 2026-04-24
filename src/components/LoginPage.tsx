import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GraduationCap, Hexagon } from 'lucide-react';

type UserRole = 'student' | 'teacher' | 'admin';
interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  password?: string;
}

// Updated prop: login now uses email instead of id
interface LoginPageProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  onSignup: (userData: User) => void;
}

export function LoginPage({ onLogin, onSignup }: LoginPageProps) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginData);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSignup({
      id: signupData.id,
      name: signupData.name,
      email: signupData.email,
      role: signupData.role,
      password: signupData.password,
    });
  };

  return (
    <div className="min-h-screen honeycomb-pattern bg-background flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F4B315]/5 to-[#E59312]/5" />
      <div className="absolute top-20 left-20 text-[#F4B315]/20"><Hexagon size={64} /></div>
      <div className="absolute bottom-20 right-20 text-[#E59312]/20"><Hexagon size={48} /></div>
      <div className="absolute top-1/2 left-10 text-[#D3AF85]/20"><Hexagon size={32} /></div>
      <div className="absolute top-32 right-32 text-[#8E5915]/20"><Hexagon size={40} /></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#F4B315] p-3 rounded-2xl shadow-academic-lg">
                <GraduationCap className="h-8 w-8 text-[#1A141A]" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#1A141A] mb-2">Academic Portal</h1>
            <p className="text-[#423738]">Welcome to your educational hub</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* --- LOGIN FORM --- */}
          <TabsContent value="login">
            <Card className="shadow-academic-lg border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-[#1A141A]">Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="e.g., nava@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="h-12 rounded-xl border-[#D3AF85]/30 focus:border-[#F4B315]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="h-12 rounded-xl border-[#D3AF85]/30 focus:border-[#F4B315]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A] font-semibold rounded-xl shadow-academic">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* --- SIGNUP FORM --- */}
          <TabsContent value="signup">
            <Card className="shadow-academic-lg border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-[#1A141A]">Create Account</CardTitle>
                <CardDescription>Sign up to get started with your academic journey</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name" type="text" placeholder="Enter your full name" value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      className="h-12 rounded-xl border-[#D3AF85]/30 focus:border-[#F4B315]" required
                    />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email" type="email" placeholder="Enter your email" value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="h-12 rounded-xl border-[#D3AF85]/30 focus:border-[#F4B315]" required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">Role</Label>
                    <Select value={signupData.role} onValueChange={(value: UserRole) => setSignupData({ ...signupData, role: value })}>
                      <SelectTrigger className="h-12 rounded-xl border-[#D3AF85]/30 focus:border-[#F4B315]">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password" type="password" placeholder="Create a password" value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="h-12 rounded-xl border-[#D3AF85]/30 focus:border-[#F4B315]" required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password" type="password" placeholder="Confirm your password" value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="h-12 rounded-xl border-[#D3AF85]/30 focus:border-[#F4B315]" required
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A] font-semibold rounded-xl shadow-academic">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}