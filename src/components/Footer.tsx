import React from 'react'
import Link from 'next/link'

'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2025)
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>My Website</h3>
          <p>Built with Love and bits of frustration occasionally</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/posts">Blog</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: hello@mywebsite.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} My Website. All rights reserved.</p>
      </div>
    </footer>
  )
}
