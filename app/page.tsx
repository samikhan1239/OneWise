"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Video, MessageSquare, Users, Star, CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">MH</span>
            </div>
            <span className="text-xl font-bold text-foreground">OneWise</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Star className="w-4 h-4" />
                  Top-Rated Mentorship Platform
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                Connect with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                  Expert Mentors
                </span>
              </h1>
              <p className="text-lg text-muted-foreground text-balance leading-relaxed">
                Experience personalized 1-on-1 mentorship with live video sessions, real-time code collaboration, and
                expert guidance tailored to your goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link href="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-muted-foreground">Expert Mentors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/mentor.png" alt="Mentor video session" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for transformative mentorship experiences
          </p>
        </div>

        {/* Feature Grid - Bento Style */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Large Feature Card */}
          <div className="md:col-span-2 rounded-2xl border border-border bg-card/40 backdrop-blur hover:border-primary/30 hover:bg-card/60 transition-all duration-300 overflow-hidden group">
            <div className="grid md:grid-cols-2">
              <div className="p-8 space-y-4 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">HD Video Sessions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Crystal clear 1-on-1 video conferencing with integrated screen sharing and professional session
                  controls
                </p>
              </div>
              <div className="relative h-64 md:h-full min-h-64 overflow-hidden">
                <Image
                  src="/video.png"
                  alt="Video sessions"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Vertical Feature Card */}
          <div className="rounded-2xl border border-border bg-card/40 backdrop-blur hover:border-accent/30 hover:bg-card/60 transition-all duration-300 overflow-hidden group">
            <div className="p-8 space-y-4 h-full flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Code Editor</h3>
              <p className="text-muted-foreground text-sm flex-grow leading-relaxed">
                Real-time collaborative code editing with syntax highlighting and multi-language support
              </p>
              <div className="relative h-32 mt-4 -mx-8 -mb-8 overflow-hidden rounded-lg">
                <Image src="/code.png" alt="Code editor" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Chat Feature Card */}
          <div className="rounded-2xl border border-border bg-card/40 backdrop-blur hover:border-secondary/30 hover:bg-card/60 transition-all duration-300 overflow-hidden p-8 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold">Live Chat</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Instant messaging with code snippets and session history
            </p>
          </div>

          {/* Sessions Feature Card */}
          <div className="md:col-span-2 rounded-2xl border border-border bg-card/40 backdrop-blur hover:border-primary/30 hover:bg-card/60 transition-all duration-300 p-8 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Session Management</h3>
                <p className="text-muted-foreground max-w-md leading-relaxed">
                  Easy scheduling, secure session links, and comprehensive history tracking with detailed session
                  analytics
                </p>
              </div>
              <div className="relative h-40 w-40 rounded-lg overflow-hidden flex-shrink-0">
                <Image src="/calender.png" alt="Session management" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Why Choose OneWise?</h2>
          <p className="text-lg text-muted-foreground">Join thousands of learners accelerating their growth</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Expert Mentors", desc: "Learn from industry leaders with 10+ years of experience" },
            { title: "Flexible Scheduling", desc: "Book sessions that fit your lifestyle and timezone" },
            { title: "Progress Tracking", desc: "Monitor your growth with detailed learning analytics" },
            { title: "Community Support", desc: "Connect with peers and build lasting relationships" },
            { title: "Lifetime Access", desc: "Revisit session recordings and learning materials anytime" },
            { title: "Guaranteed Results", desc: "Achieve your goals or get a full refund" },
          ].map((benefit, i) => (
            <div key={i} className="p-6 rounded-xl border border-border bg-card/20 hover:bg-card/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl p-8 md:p-16 text-center space-y-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="/abstract-mentorship-growth-learning.jpg" alt="Background" fill className="object-cover" />
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Transform Your Learning?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Start your free trial today and connect with your perfect mentor
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MH</span>
                </div>
                <span className="font-bold">OneWise</span>
              </div>
              <p className="text-sm text-muted-foreground">Connecting mentors and learners worldwide</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 OneWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
