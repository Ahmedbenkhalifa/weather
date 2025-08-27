import { ModeToggle } from '@/common/components/ModeToggle'
import { Button } from '@/common/components/ui/button'
import { Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AppHeader() {
  const navigate = useNavigate()

  return (
    <header className='w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between px-4'>
        <div
          onClick={() => navigate('/')}
          className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity'
        >
          <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg'>
            W
          </div>
          <h1 className='text-xl font-bold text-foreground'>WeatherScope</h1>
        </div>

        <div className='flex items-center gap-3'>
          <ModeToggle />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => navigate('/settings')}
            className='h-9 w-9'
          >
            <Settings className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </header>
  )
}
