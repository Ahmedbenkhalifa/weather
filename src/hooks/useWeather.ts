import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Location, WeatherData, WeatherState } from '../types'

export const useWeather = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [weatherState, setWeatherState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: '',
  })
  const [searchState, setSearchState] = useState<{
    results: Location[]
    searching: boolean
    searchError: string
  }>({
    results: [],
    searching: false,
    searchError: '',
  })

  useEffect(() => {
    const storedLocation = localStorage.getItem('selectedLocation')
    if (storedLocation) {
      try {
        const location = JSON.parse(storedLocation) as Location
        setSelectedLocation(location)
        fetchWeather(location)
      } catch (error) {
        console.error('Error parsing stored location:', error)
        localStorage.removeItem('selectedLocation')
      }
    }
  }, [])

  const fetchWeather = useCallback(async (location: Location) => {
    setSelectedLocation(location)
    localStorage.setItem('selectedLocation', JSON.stringify(location))

    const apiToken = localStorage.getItem('weatherApiToken')

    if (!apiToken?.trim()) {
      setWeatherState((prev) => ({
        ...prev,
        error: 'API token missing. Please configure your API key.',
        loading: false,
      }))
      return
    }

    setWeatherState((prev) => ({
      ...prev,
      loading: true,
      error: '',
      data: null,
    }))

    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiToken}&units=metric`,
      )

      setWeatherState((prev) => ({
        ...prev,
        data: response.data,
        loading: false,
        error: '',
      }))
    } catch (_error) {
      setWeatherState((prev) => ({
        ...prev,
        error: 'Error fetching weather data',
        loading: false,
        data: null,
      }))
    }
  }, [])

  const refreshWeather = useCallback(() => {
    if (selectedLocation) {
      fetchWeather(selectedLocation)
    }
  }, [selectedLocation, fetchWeather])

  const searchCities = useCallback(
    async (query: string) => {
      const apiToken = localStorage.getItem('weatherApiToken')

      if (!apiToken?.trim()) {
        setSearchState((prev) => ({
          ...prev,
          searchError: 'Configure your API key in settings',
          searching: false,
        }))
        return
      }

      if (!query.trim()) return

      setSearchState((prev) => ({
        ...prev,
        searching: true,
        searchError: '',
        results: [],
      }))

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query.trim())}&limit=5&appid=${apiToken}`,
        )

        const locations: Location[] = (response.data || []).map((d: any) => ({
          name: d.name,
          country: d.country,
          state: d.state,
          lat: d.lat,
          lon: d.lon,
        }))

        setSearchState((prev) => ({
          ...prev,
          results: locations,
          searching: false,
          searchError: locations.length === 0 ? 'No results found' : '',
        }))

        // Auto-select first result
        if (locations.length > 0) {
          fetchWeather(locations[0])
        }
      } catch (_error) {
        setSearchState((prev) => ({
          ...prev,
          searching: false,
          searchError: 'Search error',
          results: [],
        }))
      }
    },
    [fetchWeather],
  )

  const clearWeather = useCallback(() => {
    setWeatherState({
      data: null,
      loading: false,
      error: '',
    })
    setSelectedLocation(null)
    localStorage.removeItem('selectedLocation')
    setSearchState({
      results: [],
      searching: false,
      searchError: '',
    })
  }, [])

  return {
    selectedLocation,
    weather: weatherState.data,
    loading: weatherState.loading,
    error: weatherState.error,
    searchResults: searchState.results,
    searching: searchState.searching,
    searchError: searchState.searchError,
    fetchWeather,
    searchCities,
    refreshWeather,
    clearWeather,
  }
}
