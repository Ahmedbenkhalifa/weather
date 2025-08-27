import React from 'react'
import { Button } from '@/common/components/ui/button'
import { Thermometer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const SettingsPromoSection: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section className='bg-secondary/30 rounded-xl p-8 text-center space-y-6'>
      <div className='space-y-4'>
        <div className='w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto'>
          <Thermometer className='h-8 w-8 text-white' />
        </div>
        <h2 className='text-2xl font-bold'>Real-Time Weather Data</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>
          Powered by OpenWeatherMap API, get precise and up-to-date weather information with
          detailed forecasts, current conditions, and historical data.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
        <Button onClick={() => navigate('/settings')} variant='default' size='lg'>
          Configure API Settings
        </Button>

        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
          Service Active 24/7
        </div>
      </div>
    </section>
  )
}
