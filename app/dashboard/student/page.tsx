'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/navbar';
import { Users, Calendar, Sparkles, ArrowRight, Trophy, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [joinId, setJoinId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        if (res.data.user.role !== 'student') {
          router.push('/dashboard/mentor');
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

  const joinSession = async () => {
    if (!joinId.trim()) return;
    try {
      await axios.post(`/api/sessions/${joinId}/join`);
      router.push(`/session/${joinId}`);
    } catch (error) {
      console.error('Failed to join session', error);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <Navbar userRole="student" userName={user.name || 'Student'} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name || 'Learner'}!</h1>
          <p className="text-lg text-muted-foreground">Keep learning and growing with your mentors</p>
        </div>

        {/* Quick Join Card */}
        <Card className="p-8 mb-12 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Join a Live Session</h2>
              <p className="text-muted-foreground">Enter the session ID from your mentor</p>
            </div>
          </div>
          <div className="flex gap-4 max-w-xl">
            <Input
              placeholder="Session ID"
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              className="h-12"
              onKeyDown={(e) => e.key === 'Enter' && joinSession()}
            />
            <Button
              onClick={joinSession}
              disabled={!joinId.trim()}
              size="lg"
              className="px-8 bg-primary hover:bg-primary/90"
            >
              Join Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold">Explore</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Link href="/find-mentor">
                <Card className="p-8 hover:border-primary/50 transition group cursor-pointer">
                  <Users className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition" />
                  <h3 className="text-xl font-semibold mb-2">Find a Mentor</h3>
                  <p className="text-muted-foreground">Connect with expert mentors</p>
                </Card>
              </Link>

              <Link href="/my-sessions">
                <Card className="p-8 hover:border-primary/50 transition group cursor-pointer">
                  <Calendar className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition" />
                  <h3 className="text-xl font-semibold mb-2">My Sessions</h3>
                  <p className="text-muted-foreground">View past and upcoming</p>
                </Card>
              </Link>

              <Link href="/goals">
                <Card className="p-8 hover:border-primary/50 transition group cursor-pointer">
                  <Trophy className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition" />
                  <h3 className="text-xl font-semibold mb-2">Learning Goals</h3>
                  <p className="text-muted-foreground">Track your progress</p>
                </Card>
              </Link>

              <Link href="/resources">
                <Card className="p-8 hover:border-primary/50 transition group cursor-pointer">
                  <BookOpen className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition" />
                  <h3 className="text-xl font-semibold mb-2">Resources</h3>
                  <p className="text-muted-foreground">Curated learning materials</p>
                </Card>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-6">Your Progress</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Hours Learned
                    </span>
                    <span className="font-bold">24.5</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent w-3/4 transition-all" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Skills Mastered</span>
                    <span className="font-bold">7</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent w-1/2 transition-all" />
                  </div>
                </div>
              </div>
            </Card>

            <Button onClick={logout} variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/5">
              Logout
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}