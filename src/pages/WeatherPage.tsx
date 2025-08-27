import React from 'react'
import { Button } from '@/common/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card'
import { Compass, Droplets, Eye, MapPin, Thermometer, Wind } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { EmptyLocationState } from '../common'
import { useWeatherStore } from '../store/weatherStore'

const WeatherPage: React.FC = () => {
  const navigate = useNavigate()
  const { selectedLocation, weather, loading, error } = useWeatherStore()

  const handleSearchClick = () => navigate('/search')

  if (!selectedLocation) {
    return <EmptyLocationState onSearchClick={handleSearchClick} />
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Loading weather data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center px-4'>
        <Card className='max-w-md w-full'>
          <CardContent className='pt-6 text-center'>
            <p className='text-red-500 mb-4'>{error}</p>
            <Button
              onClick={() => navigate('/settings')}
              variant='outline'
              size='sm'
              className='bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/30'
            >
              Configure API Key
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className='min-h-screen flex items-center justify-center px-4'>
        <Card className='max-w-md w-full'>
          <CardContent className='pt-6 text-center'>
            <p className='text-muted-foreground mb-4'>No weather data available</p>
            <Button onClick={handleSearchClick} variant='outline'>
              <Compass className='w-4 h-4 mr-2' />
              Search Location
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='min-h-screen '>
      <div className='max-w-2xl mx-auto'>
        {/* Main Weather Card */}
        <Card className='backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-white/20 shadow-2xl overflow-hidden'>
          <CardHeader className='bg-gradient-to-r from-blue-500 to-purple-600 text-white relative'>
            <div className='absolute top-4 right-4'>
              <Button
                onClick={handleSearchClick}
                size='sm'
                className='bg-white hover:bg-gray-50 text-black border-2 border-gray-300 shadow-xl font-medium'
              >
                <Compass className='w-4 h-4 mr-1 text-black' />
                Search
              </Button>
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-full bg-white/20 flex items-center justify-center'>
                <MapPin className='w-6 h-6' />
              </div>
              <div>
                <CardTitle className='text-2xl font-bold'>
                  {selectedLocation.name}
                  {selectedLocation.state && `, ${selectedLocation.state}`}
                </CardTitle>
                <p className='text-white/80'>{selectedLocation.country}</p>
              </div>
            </div>

            {/* Main Temperature Display */}
            <div className='mt-6 text-center'>
              <div className='text-6xl font-light mb-2'>{Math.round(weather.main.temp)}°</div>
              <div className='text-xl capitalize'>{weather.weather[0]?.description}</div>
              <div className='text-white/80 mt-1'>
                Feels like {Math.round(weather.main.feels_like)}°
              </div>
            </div>
          </CardHeader>

          <CardContent className='p-6'>
            {/* Weather Details Grid */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20'>
                <div className='w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center'>
                  <Thermometer className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Temperature</p>
                  <p className='font-semibold'>{Math.round(weather.main.temp)}°C</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 rounded-lg bg-cyan-50 dark:bg-cyan-900/20'>
                <div className='w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center'>
                  <Droplets className='w-5 h-5 text-cyan-600 dark:text-cyan-400' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Humidity</p>
                  <p className='font-semibold'>{weather.main.humidity}%</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20'>
                <div className='w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center'>
                  <Wind className='w-5 h-5 text-green-600 dark:text-green-400' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Wind Speed</p>
                  <p className='font-semibold'>{weather.wind.speed} m/s</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20'>
                <div className='w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center'>
                  <Eye className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Visibility</p>
                  <p className='font-semibold'>{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className='mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50'>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='text-muted-foreground'>Pressure:</span>
                  <span className='ml-2 font-medium'>{weather.main.pressure} hPa</span>
                </div>
                <div>
                  <span className='text-muted-foreground'>Feels like:</span>
                  <span className='ml-2 font-medium'>{Math.round(weather.main.feels_like)}°C</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WeatherPage
