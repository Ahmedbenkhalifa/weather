import React from 'react'
import { MapPin, Search } from 'lucide-react'
import { ActionButton } from './ActionButton'

interface EmptyLocationStateProps {
  onSearchClick: () => void
}

export const EmptyLocationState: React.FC<EmptyLocationStateProps> = ({ onSearchClick }) => {
  return (
    <div className='min-h-[70vh] flex items-center justify-center px-4'>
      <div className='text-center max-w-lg'>
        <div className='mb-8'>
          <MapPin size={80} className='text-blue-500 mx-auto mb-6 animate-float' />
          <h2 className='text-3xl font-bold text-white mb-4'>No Location Selected</h2>
          <p className='text-white/70 text-lg mb-8'>
            Choose a location to view detailed weather information and forecasts.
          </p>
        </div>

        <ActionButton
          onClick={onSearchClick}
          startIcon={<Search size={20} />}
          variant='gradient'
          size='large'
        >
          Search Location
        </ActionButton>
      </div>
    </div>
  )
}
