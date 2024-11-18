import 'leaflet/dist/leaflet.css'
import { useCallback, useRef, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { formatDate } from '../../services'
import { IssZoomLevel } from './IssZoomLevel'

const REFRESH_DISABLED_TIMEOUT = 2500

type IssMapControllersProps = {
  lastUpdate: Date,
  onRefreshClicked: () => void
  onZoomChanged: (zoomLevel: number) => void
}

export const IssMapControllers = ({ lastUpdate, onRefreshClicked, onZoomChanged }: IssMapControllersProps) => {
  const [refreshDisabled, setRefreshDisabled] = useState<boolean>(false)
  const refreshingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleRefresh = useCallback(() => {
    onRefreshClicked()
    setRefreshDisabled(true)
    if (refreshingTimeoutRef.current) clearTimeout(refreshingTimeoutRef.current)
    refreshingTimeoutRef.current = setTimeout(() => {
      setRefreshDisabled(false)
    }, REFRESH_DISABLED_TIMEOUT)
  }, [onRefreshClicked])

  return (
    <Stack className="controls" direction="row" justifyContent="space-between">
      <Box flex="1">
        <Button variant="contained" color="primary" disabled={refreshDisabled} onClick={handleRefresh}>
          Refresh Position
        </Button>
      </Box>
      <Box>
        <IssZoomLevel onZoomChanged={onZoomChanged} />
      </Box>
      <Stack direction="row" justifyContent="flex-end" flex="1" gap="15px">
        <Typography variant="h5">Last update:</Typography>
        <Typography variant="h5">{formatDate(lastUpdate)}</Typography>
      </Stack>
    </Stack>
  )
}
