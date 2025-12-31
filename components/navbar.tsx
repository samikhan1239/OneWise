"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

interface NavbarProps {
  userRole?: "mentor" | "student"
  userName?: string
}

export function Navbar({ userRole = "student", userName = "User" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">MH</span>
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:inline">OneWise</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
            Dashboard
          </Link>
          {userRole === "mentor" ? (
            <Link href="/sessions" className="text-sm text-muted-foreground hover:text-foreground transition">
              My Sessions
            </Link>
          ) : (
            <Link href="/find-mentor" className="text-sm text-muted-foreground hover:text-foreground transition">
              Find Mentor
            </Link>
          )}
          <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition">
            Profile
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="capitalize text-foreground">{userName}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-card">
          <div className="px-4 py-4 space-y-2">
            <Link href="/" className="block py-2 text-sm font-medium text-foreground hover:text-primary">
              Dashboard
            </Link>
            <Link href="/profile" className="block py-2 text-sm font-medium text-foreground hover:text-primary">
              Profile
            </Link>
            <hr className="my-2 border-border/30" />
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
