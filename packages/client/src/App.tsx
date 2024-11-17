import { useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { IssMap } from './components'
import { socketService } from './services/socket'

function App() {
  useEffect(() => {
    socketService.connect()
    return () => socketService.disconnect()
  }, [])

  return (
    <Stack className='main-content'>
      <Box component="header">
        <Typography variant="h3" gutterBottom>
          ISS Tracker
        </Typography>
      </Box>
      <Box flex={1}>
        <IssMap />
      </Box>
    </Stack>
  )
}

export default App
