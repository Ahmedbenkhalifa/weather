import React from 'react'

interface ActionButtonProps {
  onClick: () => void
  children: React.ReactNode
  startIcon?: React.ReactNode
  variant?: 'contained' | 'outlined' | 'text' | 'gradient' | 'glass'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning'
  className?: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  startIcon,
  variant = 'gradient',
  size = 'large',
  fullWidth = false,
  className = '',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-3 px-6 text-sm'
      case 'medium':
        return 'py-4 px-8 text-base'
      case 'large':
        return 'py-6 px-12 text-lg'
      default:
        return 'py-6 px-12 text-lg'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border border-white/20 shadow-2xl hover:from-blue-600 hover:to-purple-700 hover:-translate-y-2 hover:scale-105 hover:shadow-3xl active:-translate-y-1 active:scale-100'

      case 'glass':
        return 'bg-white/10 backdrop-blur-2xl text-white border border-white/20 shadow-2xl hover:bg-white/20 hover:-translate-y-1.5 hover:scale-105 hover:shadow-3xl'

      case 'outlined':
        return 'bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/60 hover:-translate-y-1 hover:scale-105'

      default:
        return 'bg-blue-500 text-white hover:bg-blue-600 hover:-translate-y-1.5 hover:scale-105'
    }
  }

  const baseClasses = `
    relative overflow-hidden rounded-3xl font-bold uppercase tracking-wide
    transition-all duration-700 ease-out transform group
    shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
    ${getSizeClasses()} ${getVariantClasses()} ${fullWidth ? 'w-full' : ''} ${className}
  `.trim()

  return (
    <div className='text-center'>
      <button onClick={onClick} className={baseClasses}>
        {/* Shimmer effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out' />

        {/* Glow effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

        {/* Content */}
        <div className='relative z-10 flex items-center justify-center gap-4'>
          {startIcon && (
            <span className='group-hover:scale-125 group-hover:rotate-12 transition-all duration-500'>
              {startIcon}
            </span>
          )}
          <span className='group-hover:tracking-wider transition-all duration-300'>{children}</span>
        </div>

        {/* Border glow */}
        <div className='absolute inset-0 rounded-3xl border border-white/20 group-hover:border-white/40 transition-all duration-300' />
      </button>
    </div>
  )
}
