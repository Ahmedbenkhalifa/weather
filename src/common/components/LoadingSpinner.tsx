import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  loading: boolean
  message?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading, message }) => {
  if (!loading) return null

  return (
    <div className='flex items-center justify-center py-12'>
      <div className='text-center'>
        <Loader2 size={32} className='text-blue-500 animate-spin mx-auto mb-4' />
        {message && <p className='text-white/70 text-sm'>{message}</p>}
      </div>
    </div>
  )
}
