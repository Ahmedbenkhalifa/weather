import React from 'react'
import { Clock, TrendingUp } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children?: React.ReactNode
  stats?: Array<{ label: string; value: string; color: string }>
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  children,
  stats = [],
}) => {
  const currentTime = new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className='mb-16 relative overflow-hidden'>
      <div className='p-8 md:p-12 glass-effect rounded-3xl border border-white/6 relative shadow-2xl'>
        <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500' />

        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8'>
          <div>
            <div className='flex items-center gap-4 mb-4'>
              <h1 className='text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent drop-shadow-lg'>
                {title}
              </h1>
              <TrendingUp size={32} className='text-emerald-400 drop-shadow-lg' />
            </div>

            {subtitle && <p className='text-xl text-white/70 font-light mb-4'>{subtitle}</p>}

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 bg-white/8 border border-white/12 rounded-xl px-4 py-2 backdrop-blur-xl'>
                <Clock size={16} className='text-white/60' />
                <span className='text-white/80 font-semibold text-sm'>Updated {currentTime}</span>
              </div>
              <div className='flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl px-4 py-2'>
                <div className='w-2 h-2 bg-white rounded-full animate-pulse' />
                <span className='text-white font-bold text-sm'>Real-time</span>
              </div>
            </div>
          </div>

          {actions && <div className='flex-shrink-0'>{actions}</div>}
        </div>

        {stats.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
            {stats.map((stat, index) => (
              <div
                key={index}
                className='flex-1 p-6 rounded-2xl border backdrop-blur-xl'
                style={{
                  background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}20)`,
                  borderColor: `${stat.color}30`,
                }}
              >
                <h3 className='text-3xl font-bold text-white mb-2'>{stat.value}</h3>
                <p className='text-white/70 font-medium uppercase tracking-wider text-sm'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {children && (
          <div className='p-8 rounded-2xl bg-black/20 border border-white/6 backdrop-blur-xl'>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
