import 'leaflet/dist/leaflet.css'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const ZOOM_CONF = {
  LEVEL: 4,
  MIN: 1,
  MAX: 10,
}

type IssZoomLevelProps = {
  onZoomChanged: (zoomLevel: number) => void
}

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    '& .MuiInputAdornment-root': {
      color: 'white',
    },
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
    '& input': {
      color: 'white',
    },
  },
}

export const IssZoomLevel = ({ onZoomChanged }: IssZoomLevelProps) => {
  const [zoomLevelVal, setZoomLevelVal] = useState<number>(ZOOM_CONF.LEVEL)

  useEffect(() => {
    onZoomChanged(ZOOM_CONF.LEVEL)
  }, [onZoomChanged])

  const triggerUpdateZoom = useCallback((currentZoomLevel:number) => {
    if (currentZoomLevel < ZOOM_CONF.MIN || currentZoomLevel > ZOOM_CONF.MAX) {
      setZoomLevelVal(ZOOM_CONF.LEVEL)
      onZoomChanged(ZOOM_CONF.LEVEL)
      return
    }
    onZoomChanged(currentZoomLevel)
  }, [onZoomChanged])

  const onZoomLevelChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    setZoomLevelVal(value)
    triggerUpdateZoom(value)
  }, [setZoomLevelVal, triggerUpdateZoom])

  return (
    <TextField
      id='zoom-level'
      type="number"
      value={zoomLevelVal}
      onChange={onZoomLevelChange}
      label="Zoom Level"
      sx={inputStyle}
      slotProps={{
        inputLabel: { style: { color: 'white' }, shrink: true },
        input: {
          inputProps: { min: ZOOM_CONF.MIN, max: ZOOM_CONF.MAX, step: 1 },
          style: { color: 'green', width: '100px' },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
