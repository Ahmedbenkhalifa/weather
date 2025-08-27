import React from 'react'
import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import { useWeatherStore } from '@/store/weatherStore'
import { Compass, Globe, MapPin, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SearchPage: React.FC = () => {
  const navigate = useNavigate()
  const { searchResults, searching, searchError, searchCities, fetchWeather } = useWeatherStore()
  const [query, setQuery] = React.useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    await searchCities(query)
    // Navigate to weather page after search
    if (useWeatherStore.getState().searchResults.length > 0) {
      navigate('/weather')
    }
  }

  const selectLocation = (location: {
    name: string
    country: string
    state?: string
    lat: number
    lon: number
  }) => {
    fetchWeather(location)
    navigate('/weather')
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl mx-auto'>
        <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 sm:p-12'>
          {/* Decorative Icons */}
          <div className='absolute top-6 left-6 text-blue-400/30 dark:text-blue-400/30'>
            <MapPin size={24} />
          </div>
          <div className='absolute top-12 right-8 text-purple-400/30 dark:text-purple-400/30'>
            <Globe size={20} />
          </div>
          <div className='absolute bottom-8 left-12 text-indigo-400/30 dark:text-indigo-400/30'>
            <Compass size={18} />
          </div>

          <div className='text-center relative z-10'>
            {/* Header Icon */}
            <div className='mb-6 relative'>
              <div className='w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg'>
                <Search size={40} className='text-white' />
              </div>
            </div>

            {/* Title */}
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
              Search for a City
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className='mb-6'>
              <div className='flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-inner'>
                <Search size={20} className='text-gray-500 dark:text-gray-400' />
                <Input
                  type='text'
                  placeholder='Enter city name...'
                  className='flex-1 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  type='submit'
                  size='sm'
                  className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-6'
                  disabled={searching}
                >
                  {searching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </form>

            {/* Error Message */}
            {searchError && (
              <div className='text-sm text-red-500 dark:text-red-400 mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
                <div className='mb-3'>{searchError}</div>
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

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className='text-left bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl p-3 max-h-80 overflow-auto'>
                <div className='text-sm text-gray-600 dark:text-gray-400 mb-2 px-3'>
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}:
                </div>
                {searchResults.map((r, i) => (
                  <button
                    key={`${r.name}-${r.lat}-${r.lon}-${i}`}
                    onClick={() => selectLocation(r)}
                    className='w-full text-left px-4 py-3 rounded-xl hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-between group'
                  >
                    <div>
                      <span className='text-gray-900 dark:text-white font-medium'>
                        {r.name}
                        {r.state && (
                          <span className='text-gray-600 dark:text-gray-300'>, {r.state}</span>
                        )}
                      </span>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>{r.country}</div>
                    </div>
                    <div className='text-xs text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'>
                      {r.lat.toFixed(2)}, {r.lon.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
