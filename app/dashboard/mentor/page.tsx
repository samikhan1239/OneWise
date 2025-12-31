'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/navbar';
import { Plus, Link2, Users, Calendar, LogOut, TrendingUp, MessageCircle } from 'lucide-react';

export default function MentorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [sessionLink, setSessionLink] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        if (res.data.user.role !== 'mentor') {
          router.push('/dashboard/student');
          return;
        }
        setUser(res.data.user);
      } catch (error) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const createSession = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/sessions');
      setSessionLink(res.data.link);
    } catch (error) {
      console.error('Failed to create session', error);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(sessionLink);
  };

  const logout = async () => {
    await axios.get('/api/auth/logout');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      <Navbar userRole="mentor" userName={user.name || 'Mentor'} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Hello, {user.name || 'Mentor'}!</h1>
          <p className="text-lg text-muted-foreground">Share your knowledge and guide the next generation</p>
        </div>

        {/* Create Session Card */}
        <Card className="p-8 mb-12 bg-accent/5 border-accent/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
              <Users className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Start a New Session</h2>
              <p className="text-muted-foreground">Create a live mentoring room and invite students</p>
            </div>
          </div>

          <Button
            onClick={createSession}
            disabled={loading}
            size="lg"
            className="w-full max-w-md bg-accent hover:bg-accent/90 gap-3 h-14 text-lg"
          >
            <Plus className="w-5 h-5" />
            {loading ? 'Creating...' : 'Create New Session'}
          </Button>

          {sessionLink && (
            <div className="mt-8 p-6 bg-muted/50 rounded-xl border">
              <p className="font-medium mb-4">Session ready! Share this link with students:</p>
              <div className="flex gap-3">
                <Input value={sessionLink} readOnly className="font-mono text-sm" />
                <Button onClick={copyLink} variant="secondary" size="sm">
                  <Link2 className="w-4 h-4" />
                  Copy
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold">Manage</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-8 hover:border-accent/50 transition cursor-pointer">
                <Calendar className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Schedule</h3>
                <p className="text-muted-foreground">View upcoming sessions</p>
              </Card>

              <Card className="p-8 hover:border-accent/50 transition cursor-pointer">
                <Users className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">My Students</h3>
                <p className="text-muted-foreground">Track progress and feedback</p>
              </Card>

              <Card className="p-8 hover:border-accent/50 transition cursor-pointer">
                <MessageCircle className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Messages</h3>
                <p className="text-muted-foreground">Chat with your mentees</p>
              </Card>

              <Card className="p-8 hover:border-accent/50 transition cursor-pointer">
                <TrendingUp className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Impact Analytics</h3>
                <p className="text-muted-foreground">See your mentoring stats</p>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-6">Mentoring Impact</h3>
              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students Mentored</span>
                  <span className="font-bold text-2xl text-accent">32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Hours</span>
                  <span className="font-bold text-2xl text-accent">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Rating</span>
                  <span className="font-bold text-2xl text-accent">4.9 ★</span>
                </div>
              </div>
            </Card>

            <Button onClick={logout} variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/5">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}