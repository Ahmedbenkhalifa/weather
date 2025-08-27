import React from 'react'
import { MapPin, RefreshCw } from 'lucide-react'

interface LocationDisplayProps {
  location: any
  onRefresh: () => void
  loading: boolean
}

export const LocationDisplay: React.FC<LocationDisplayProps> = ({
  location,
  onRefresh,
  loading,
}) => {
  return (
    <div className='flex items-center gap-4 p-4 glass-effect rounded-2xl'>
      <MapPin size={20} className='text-blue-400' />
      <div className='flex-1'>
        <h3 className='text-white font-semibold'>{location?.name || 'Unknown Location'}</h3>
        <p className='text-white/60 text-sm'>{location?.country || ''}</p>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className='text-white/60 hover:text-white transition-colors duration-200 disabled:opacity-50'
      >
        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
      </button>
    </div>
  )
}
