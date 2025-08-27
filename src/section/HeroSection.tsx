import React from 'react'
import { LoadingSpinner } from '@/common/components/LoadingSpinner'
import { Badge } from '@/common/components/ui/badge'
import { Button } from '@/common/components/ui/button'
import { Card } from '@/common/components/ui/card'
import { WeatherGlobe } from '@/common/components/WeatherGlobe'
import { useWeatherStore } from '@/store/weatherStore'
import { ArrowRight, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const HeroSection: React.FC = () => {
  const navigate = useNavigate()
  const { weather, loading, error, fetchWeather } = useWeatherStore()

  React.useEffect(() => {
    fetchWeather({ name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 })
  }, [fetchWeather])

  const LegendContent: React.FC = () => (
    <>
      <div className='p-4'>
        {!error ? (
          <div className='flex items-center gap-2 text-base font-medium'>
            <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
            Live Weather Data • Updates Every 5s
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <p className='text-red-500 mb-4'>{error}</p>
            <Button
              onClick={() => navigate('/settings')}
              variant='outline'
              size='sm'
              className='bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/30'
            >
              Configure API Key
            </Button>
          </div>
        )}
      </div>
      <div className='pt-0 border '>
        {loading && <LoadingSpinner loading={true} message='Fetching Paris weather...' />}
        {!loading && !error && weather && (
          <div className='grid grid-cols-2 gap-x-6 gap-y-2 text-sm pt-1 px-4 pb-4'>
            <div className='col-span-2 font-semibold'>Paris</div>
            <div className='text-muted-foreground'>Temperature</div>
            <div className='font-medium'>{Math.round(weather.main.temp)}°C</div>
            <div className='text-muted-foreground'>Condition</div>
            <div className='font-medium capitalize'>{weather.weather[0]?.description}</div>
            <div className='text-muted-foreground'>Humidity</div>
            <div className='font-medium'>{weather.main.humidity}%</div>
            <div className='text-muted-foreground'>Wind</div>
            <div className='font-medium'>{weather.wind.speed} m/s</div>
          </div>
        )}
      </div>
    </>
  )

  return (
    <div className='container mx-auto px-4'>
      {/* Desktop Layout */}
      <div className='hidden lg:flex flex-row justify-between'>
        <section className='max-w-3xl pb-20 pt-14'>
          <div className='space-y-4'>
            <h1 className='text-balance text-2xl tracking-tighter md:text-4xl lg:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent'>
              Quickly access weather data with a <span className='font-bold italic'>reliable</span>{' '}
              companion.
            </h1>
            <p className='text-balance text-muted-foreground mt-2 text-lg max-w-2xl'>
              Over 200,000 cities available with accurate forecasts ready to match your weather
              needs.
            </p>
          </div>
          <div className='mt-4 gap-4'>
            <div className='flex items-center gap-2'>
              <Badge variant='secondary' className='px-3 py-1'>
                <div className='w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse' />
                Live Data
              </Badge>
              <Badge variant='outline'>200K+ Cities</Badge>
            </div>
            <Button
              onClick={() => navigate('/search')}
              size='default'
              className='mt-4 h-12 px-8 font-semibold'
            >
              <Search className='mr-2 h-5 w-5' />
              Get Started
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
          </div>
        </section>
        <section className='flex flex-col items-center space-y-6 py-12 relative'>
          <div className='w-full max-w-md absolute top-0 left-1/2 -translate-x-1/2 z-20'>
            <Card className='backdrop-blur bg-background/60 supports-[backdrop-filter]:bg-background/80 shadow-xl ring-1 ring-black/10 dark:ring-white/10'>
              <LegendContent />
            </Card>
          </div>
          <div className='relative z-10'>
            <WeatherGlobe width={500} height={500} />
          </div>
        </section>
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden space-y-8 py-8'>
        {/* Hero Text */}
        <section className='text-center space-y-6'>
          <h1 className='text-balance text-3xl sm:text-4xl tracking-tighter font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent'>
            Weather data at your fingertips
          </h1>
          <p className='text-balance text-muted-foreground text-lg max-w-lg mx-auto'>
            Access accurate weather forecasts for over 200,000 cities worldwide.
          </p>
          <div className='flex items-center justify-center gap-2'>
            <Badge variant='secondary' className='px-3 py-1'>
              <div className='w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse' />
              Live Data
            </Badge>
            <Badge variant='outline'>200K+ Cities</Badge>
          </div>
          <Button
            onClick={() => navigate('/search')}
            size='default'
            className='h-12 px-8 font-semibold'
          >
            <Search className='mr-2 h-5 w-5' />
            Get Started
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
        </section>

        {/* Globe and Compact Legend */}
        <section className='relative flex flex-col items-center'>
          {/* Compact Mobile Legend */}
          <div className='w-full max-w-sm mb-4'>
            <Card className='backdrop-blur bg-background/80 shadow-lg border'>
              <div className='p-3'>
                {!error ? (
                  <div className='flex items-center justify-center gap-2 text-sm font-medium mb-3'>
                    <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                    Live Paris Weather
                  </div>
                ) : (
                  <div className='text-center'>
                    <p className='text-red-500 text-xs mb-2'>{error}</p>
                    <Button
                      onClick={() => navigate('/settings')}
                      variant='outline'
                      size='sm'
                      className='text-xs h-8'
                    >
                      Configure API
                    </Button>
                  </div>
                )}

                {loading && (
                  <div className='text-center'>
                    <div className='w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
                    <p className='text-xs text-muted-foreground'>Loading...</p>
                  </div>
                )}

                {!loading && !error && weather && (
                  <div className='flex items-center justify-between text-xs'>
                    <div className='text-center'>
                      <div className='font-semibold text-lg'>{Math.round(weather.main.temp)}°C</div>
                      <div className='text-muted-foreground'>Paris</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-medium capitalize'>
                        {weather.weather[0]?.description}
                      </div>
                      <div className='text-muted-foreground'>Condition</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-medium'>{weather.main.humidity}%</div>
                      <div className='text-muted-foreground'>Humidity</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Smaller Globe for Mobile */}
          <div className='relative z-10'>
            <WeatherGlobe width={320} height={320} />
          </div>
        </section>
      </div>
    </div>
  )
}
