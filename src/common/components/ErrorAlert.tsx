import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorAlertProps {
  error: string | null
  onRetry: () => void
  severity?: 'error' | 'warning' | 'info'
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onRetry }) => {
  if (!error) return null

  return (
    <div className='mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-xl'>
      <div className='flex items-start gap-3'>
        <AlertTriangle size={20} className='text-red-400 mt-0.5 flex-shrink-0' />
        <div className='flex-1'>
          <p className='text-red-200 font-medium'>{error}</p>
        </div>
        <button
          onClick={onRetry}
          className='text-red-400 hover:text-red-300 transition-colors duration-200'
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  )
}
