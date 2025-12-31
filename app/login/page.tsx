'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      // Step 1: Login
      await axios.post('/api/auth/login', { email: email.trim(), password });

      // Step 2: Fetch current user to determine role
      const meRes = await axios.get('/api/auth/me');
      const userRole = meRes.data.user.role;

      // Step 3: Redirect based on role
      if (userRole === 'student') {
        router.push('/dashboard/student');
      } else if (userRole === 'mentor') {
        router.push('/dashboard/mentor');
      } else {
        router.push('/dashboard/student'); // fallback
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Login failed. Please check your credentials and try again.';
      setError(msg);
      console.error('Login failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && password) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand & CTA */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-accent to-secondary text-white p-12 flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-10">
            <span className="text-2xl font-bold">MH</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
          <p className="text-xl text-white/80">
            Sign in to continue your mentorship journey
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-white/70 text-lg">New to OneWise?</p>
          <Link href="/signup">
            <Button variant="secondary" size="lg" className="w-full h-12 text-base">
              Create a Free Account
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
            <h2 className="text-3xl font-bold mb-2">Sign In</h2>
            <p className="text-muted-foreground">Access your mentorship dashboard</p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium block mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-12"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-12"
                required
                minLength={6}
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
              className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-medium"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}