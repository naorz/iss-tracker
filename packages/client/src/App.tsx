import 'react-toastify/dist/ReactToastify.css'
import { useCallback, useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import { IssMap } from './components'
import { socketService } from './services/socket'
import { checkServerHealth } from './services'

function App() {
  const [isServerAlive, setIsServerAlive] = useState<boolean | null>(null)
  useEffect(() => {
    (async function () {
      const isServerAlive = await checkServerHealth()
      setIsServerAlive(isServerAlive)
      if (!isServerAlive) {
        toast.error('Server is not alive')
        return console.error('Server is not alive')
      }
      socketService.connect()
    })()

    return () => socketService.disconnect()
  }, [])

  const Content = useCallback(() => {
    if (isServerAlive === null) return <Typography variant="h4">Checking server health...</Typography>
    if (!isServerAlive) return <Typography variant="h4">Server is responding...</Typography>
    return <IssMap />
  }, [isServerAlive])

  return (<>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <Stack className='main-content'>
      <Box component="header">
        <Typography variant="h3">
          International Space Station Tracker
        </Typography>
      </Box>
      <Box flex={1}>
        <Content />
      </Box>
    </Stack>
  </>)
}

export default App
