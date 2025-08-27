import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

type WeatherPoint = {
  lat: number
  lng: number
  temp: number
  condition: string
  city: string
}

interface WeatherGlobeProps {
  width?: number
  height?: number
}

export function WeatherGlobe({ width = 600, height = 600 }: WeatherGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0

    if (!canvasRef.current) return

    const instance = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: height * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.9, 0.9, 0.9],
      markers: [
        {
          location: [weatherPoints.lat, weatherPoints.lng],
          size: Math.max(0.03, Math.min(0.1, weatherPoints.temp / 100)),
        },
      ],
      onRender: (state) => {
        phi += 0.005
        state.phi = phi

        state.markers = [
          {
            location: [weatherPoints.lat, weatherPoints.lng],
            size: Math.max(0.03, Math.min(0.1, weatherPoints.temp / 100)),
            color: getWeatherColor(weatherPoints.temp, weatherPoints.condition),
          },
        ]
      },
    })

    return () => {
      instance?.destroy()
    }
  }, [width, height])

  const getWeatherColor = (temp: number, _condition: string): [number, number, number] => {
    if (temp > 30) return [1, 0.2, 0.1] // Hot - Red
    if (temp > 20) return [1, 0.7, 0.1] // Warm - Orange
    if (temp > 10) return [0.2, 0.8, 0.2] // Mild - Green
    if (temp > 0) return [0.1, 0.5, 1] // Cool - Blue
    return [0.8, 0.8, 1] // Cold - Light Blue
  }

  return (
    <div className='relative'>
      <canvas
        ref={canvasRef}
        style={{
          width: width,
          height: height,
          maxWidth: '100%',
          aspectRatio: 1,
        }}
        className='opacity-90 hover:opacity-100 transition-opacity duration-300'
      />
    </div>
  )
}

const weatherPoints: WeatherPoint = {
  lat: 48.8566,
  lng: 2.3522,
  temp: 18,
  condition: 'partly-cloudy',
  city: 'Paris',
}
