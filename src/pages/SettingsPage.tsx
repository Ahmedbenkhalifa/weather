import React from 'react'
import { Button } from '@/common/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card'
import { CheckCircle2, Eye, EyeOff, Key } from 'lucide-react'

const SettingsPage: React.FC = () => {
  const [apiKey, setApiKey] = React.useState('')
  const [saved, setSaved] = React.useState(false)
  const [showKey, setShowKey] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const existing = localStorage.getItem('weatherApiToken') || ''
    setApiKey(existing)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const value = apiKey.trim()
    try {
      localStorage.setItem('weatherApiToken', value)
      const verify = localStorage.getItem('weatherApiToken') || ''
      if (verify !== value) {
        setError('Failed to save. Please try again.')
        return
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    } catch (_e) {
      setError('Local storage unavailable. Check browser settings.')
    }
  }

  return (
    <div className='min-h-[70vh] relative flex items-center justify-center px-4'>
      <div className='absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-blue-500/10 rounded-3xl blur-3xl' />
      <div className='w-full max-w-xl'>
        <Card className='shadow-xl ring-1 ring-border/50'>
          <CardHeader className='space-y-2'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white'>
              <Key className='w-6 h-6' />
            </div>
            <CardTitle className='text-2xl'>OpenWeather API</CardTitle>
            <div className='text-sm text-muted-foreground'>
              Enter and manage your API key used for live weather.
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>API Key</label>
                <div className='relative'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground'>
                    <Key className='h-4 w-4' />
                  </div>
                  <input
                    type={showKey ? 'text' : 'password'}
                    className='w-full rounded-md border bg-background pl-10 pr-10 py-2 text-sm outline-none focus:ring-2 focus:ring-ring'
                    placeholder='Enter your OpenWeather API key'
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <button
                    type='button'
                    onClick={() => setShowKey((v) => !v)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground'
                  >
                    {showKey ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                  </button>
                </div>
                {error && <div className='mt-2 text-sm text-red-500'>{error}</div>}
              </div>
              <div className='flex items-center gap-3'>
                <Button type='submit' size='sm' disabled={!apiKey.trim()}>
                  Save
                </Button>
                {saved && (
                  <div className='inline-flex items-center gap-1 text-sm text-emerald-600'>
                    <CheckCircle2 className='h-4 w-4' />
                    Saved
                  </div>
                )}
              </div>
              <div className='text-xs text-muted-foreground'>
                Get your key at openweathermap.org and paste it here.
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage
