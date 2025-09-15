import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import config from '@/payload.config'

export default async function ProfilePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>User Profile</h1>
        
        <div className="profile-info">
          <div className="profile-field">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          
          <div className="profile-field">
            <label>First Name:</label>
            <span>{user.firstName || 'Not set'}</span>
          </div>
          
          <div className="profile-field">
            <label>Last Name:</label>
            <span>{user.lastName || 'Not set'}</span>
          </div>
          
          <div className="profile-field">
            <label>Role:</label>
            <span>{user.role || 'user'}</span>
          </div>
          
          <div className="profile-field">
            <label>Account Created:</label>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="profile-actions">
          <Link href="/api/users/logout" className="btn btn-secondary">
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}
