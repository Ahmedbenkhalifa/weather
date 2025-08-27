import axios from 'axios'
import { create } from 'zustand'
import { Location, WeatherData } from '../types'

interface WeatherState {
  selectedLocation: Location | null
  weather: WeatherData | null
  loading: boolean
  error: string
  searchResults: Location[]
  searching: boolean
  searchError: string
}

interface WeatherActions {
  setSelectedLocation: (location: Location) => void
  fetchWeather: (location: Location) => Promise<void>
  searchCities: (query: string) => Promise<void>
  clearWeather: () => void
  refreshWeather: () => Promise<void>
}

export const useWeatherStore = create<WeatherState & WeatherActions>((set, get) => ({
  selectedLocation: null,
  weather: null,
  loading: false,
  error: '',
  searchResults: [],
  searching: false,
  searchError: '',

  setSelectedLocation: (location: Location) => {
    set({ selectedLocation: location })
    localStorage.setItem('selectedLocation', JSON.stringify(location))
  },

  fetchWeather: async (location: Location) => {
    const { setSelectedLocation } = get()
    setSelectedLocation(location)

    const apiToken = localStorage.getItem('weatherApiToken')

    if (!apiToken?.trim()) {
      set({
        error: 'API token missing. Please configure your API key.',
        loading: false,
      })
      return
    }

    set({
      loading: true,
      error: '',
      weather: null,
    })

    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiToken}&units=metric`,
      )

      set({
        weather: response.data,
        loading: false,
        error: '',
      })
    } catch (_error) {
      set({
        error: 'Error fetching weather data',
        loading: false,
        weather: null,
      })
    }
  },

  searchCities: async (query: string) => {
    const apiToken = localStorage.getItem('weatherApiToken')

    if (!apiToken?.trim()) {
      set({
        searchError: 'Configure your API key in settings',
        searching: false,
      })
      return
    }

    if (!query.trim()) return

    set({
      searching: true,
      searchError: '',
      searchResults: [],
    })

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

      set({
        searchResults: locations,
        searching: false,
        searchError: locations.length === 0 ? 'No results found' : '',
      })

      // Auto-select first result
      if (locations.length > 0) {
        get().fetchWeather(locations[0])
      }
    } catch (_error) {
      set({
        searching: false,
        searchError: 'Search error',
        searchResults: [],
      })
    }
  },

  refreshWeather: async () => {
    const { selectedLocation, fetchWeather } = get()
    if (selectedLocation) {
      await fetchWeather(selectedLocation)
    }
  },

  clearWeather: () => {
    set({
      selectedLocation: null,
      weather: null,
      loading: false,
      error: '',
      searchResults: [],
      searching: false,
      searchError: '',
    })
    localStorage.removeItem('selectedLocation')
  },
}))

// Initialize from localStorage
const storedLocation = localStorage.getItem('selectedLocation')
if (storedLocation) {
  try {
    const location = JSON.parse(storedLocation) as Location
    useWeatherStore.getState().fetchWeather(location)
  } catch (error) {
    console.error('Error parsing stored location:', error)
    localStorage.removeItem('selectedLocation')
  }
}
