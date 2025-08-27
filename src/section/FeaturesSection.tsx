import React from 'react'
import { Button } from '@/common/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card'

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
  action: () => void
  buttonText: string
}

interface FeaturesSectionProps {
  features: FeatureItem[]
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {features.map((feature, index) => (
        <Card
          key={index}
          className='h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
        >
          <CardHeader className='space-y-4'>
            <div className='w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center'>
              {feature.icon}
            </div>
            <div>
              <CardTitle className='text-xl'>{feature.title}</CardTitle>
              <CardDescription className='text-base leading-relaxed'>
                {feature.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button onClick={feature.action} variant='outline' className='w-full font-medium'>
              {feature.buttonText}
            </Button>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
