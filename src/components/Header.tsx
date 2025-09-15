import Link from 'next/link'
import React from 'react'

interface HeaderProps {
  user?: {
    id: string
    email: string
    firstName?: string
    lastName?: string
  }
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <Link href="/">
            <strong>My Website</strong>
          </Link>
        </div>
        
        <div className="nav-menu">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/posts" className="nav-link">Blog</Link>
          <Link href="/about" className="nav-link">About</Link>
          
          <div className="nav-auth">
            {user ? (
              <>
                <span className="nav-welcome">
                  Welcome, {user.firstName || user.email}!
                </span>
                <Link href="/profile" className="nav-link">Profile</Link>
                <Link href="/api/users/logout" className="nav-link logout">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link">Login</Link>
                <Link href="/register" className="nav-link register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
