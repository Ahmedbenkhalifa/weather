import React from 'react'
import { FeaturesSection } from '@/section/FeaturesSection'
import { HeroSection } from '@/section/HeroSection'
import { SettingsPromoSection } from '@/section/SettingsPromoSection'
import { MapPin, Search, Thermometer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const features = [
    {
      icon: <Search className='h-8 w-8 text-blue-500' />,
      title: 'Search Weather',
      description:
        'Find weather information for any city worldwide with our powerful search feature.',
      action: () => navigate('/search'),
      buttonText: 'Start Searching',
    },
    {
      icon: <Thermometer className='h-8 w-8 text-orange-500' />,
      title: 'Accurate Data',
      description: 'Get precise temperature readings and detailed weather forecasts in real-time.',
      action: () => navigate('/weather'),
      buttonText: 'View Weather',
    },
    {
      icon: <MapPin className='h-8 w-8 text-green-500' />,
      title: 'Location Services',
      description: 'Accurately locate any city with detailed geographical information.',
      action: () => navigate('/search'),
      buttonText: 'Explore Locations',
    },
  ]

  return (
    <div className='space-y-12'>
      <HeroSection />
      <FeaturesSection features={features} />
      <SettingsPromoSection />
    </div>
  )
}

export default HomePage
