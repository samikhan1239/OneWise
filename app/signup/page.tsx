'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function Signup() {
  const router = useRouter();
  const [role, setRole] = useState<'mentor' | 'student' | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!role) return;

    setError(null);
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/signup', {
        email: email.trim(),
        password,
        role,
        fullName: fullName.trim() || undefined,
      });

      // Redirect based on role after successful signup
      if (role === 'student') {
        router.push('/dashboard/student');
      } else {
        router.push('/dashboard/mentor');
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.details?.[0]?.message ||
        'Signup failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && password && role) {
      handleSubmit();
    }
  };

  // Dynamic button styling based on role
  const roleColor = role === 'mentor' ? 'accent' : 'primary';

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Feature Highlights (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-accent to-secondary text-white p-12 flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-10">
            <span className="text-2xl font-bold">MH</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">Join OneWise</h1>
          <p className="text-xl text-white/80 mb-12">
            Start your mentorship journey today. Learn from experts or share your knowledge.
          </p>
        </div>

        <div className="space-y-8">
          {[
            { title: 'Real-time Video Sessions', desc: 'Crystal clear 1-on-1 mentoring' },
            { title: 'Collaborative Code Editor', desc: 'Learn and code together seamlessly' },
            { title: 'Instant Communication', desc: 'Chat, share code snippets, and more' },
          ].map((feature) => (
            <div key={feature.title} className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 text-2xl">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                <p className="text-white/70">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-12 bg-background">
        <div className="w-full max-w-md mx-auto space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div>
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-muted-foreground">Join our community of mentors and learners</p>
          </div>

          {/* Role Selection Step */}
          {!role ? (
            <div className="space-y-6">
              <p className="text-sm font-medium text-foreground">I want to:</p>
              <div className="space-y-4">
                <button
                  onClick={() => setRole('student')}
                  className="w-full p-6 border-2 border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Learn from mentors
                  </h3>
                  <p className="text-muted-foreground">Find expert guidance and improve your skills</p>
                </button>

                <button
                  onClick={() => setRole('mentor')}
                  className="w-full p-6 border-2 border-border rounded-xl hover:border-accent hover:bg-accent/5 transition-all text-left group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    Share my expertise
                  </h3>
                  <p className="text-muted-foreground">Mentor others and make a positive impact</p>
                </button>
              </div>
            </div>
          ) : (
            /* Form Step */
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setRole(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Go back to role selection"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <p className="text-xs text-muted-foreground">Signing up as</p>
                  <p className="font-semibold capitalize text-lg">{role}</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="text-sm font-medium block mb-2">
                    Full Name <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12"
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium block mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="text-sm font-medium block mb-2">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-12"
                    onKeyDown={handleKeyDown}
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={loading || !email || !password}
                  className={`w-full h-12 text-base font-medium bg-${roleColor} hover:bg-${roleColor}/90`}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline font-semibold">
                  Sign in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}