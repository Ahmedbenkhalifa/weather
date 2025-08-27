import React from 'react'
import { AppHeader } from '@/common/components/AppHeader'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <div className='min-h-screen bg-background'>
      <AppHeader />
      <main className='container py-6'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
