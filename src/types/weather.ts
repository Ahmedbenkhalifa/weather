export interface Location {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
}

export interface WeatherData {
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  visibility: number
}

export interface WeatherError {
  message: string
}

export interface WeatherState {
  data: WeatherData | null
  loading: boolean
  error: string
}
