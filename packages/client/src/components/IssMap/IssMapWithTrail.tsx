import './issMap.style.css'
import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { ISSPosition } from 'iss-schema'
import LinearProgress from '@mui/material/LinearProgress'
import { socketService } from '../../services'
import { IssMapControllers } from './IssMapControllers'
import { ISSMarker } from './IssMarker'
import { ISSTrail } from './IssTrail'

const DEFAULT_POSITION_HISTORY = 50

type ISSMapProps = {
  maxPositionHistory?: number
}

export const IssMap = ({ maxPositionHistory = DEFAULT_POSITION_HISTORY }:ISSMapProps) => {
  const [position, setPosition] = useState<ISSPosition | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [positionHistory, setPositionHistory] = useState<ISSPosition[]>([])
  const [zoomLevel, setZoomLevel] = useState<number>(1)

  useEffect(() => {
    const detractIssUpdates = socketService
      .onISSPosition((newPosition) => {
        console.log('🎸', '='.repeat(5), `start ISS position updates from server`, newPosition)
        setPosition(newPosition)
        setPositionHistory(prev => [...prev.slice(-maxPositionHistory), newPosition])
        setLastUpdate(new Date(newPosition.timestamp * 1000))
      })

    return () => {
      detractIssUpdates()
      console.log('🎸', '='.repeat(5), `ISS updates terminated`)
    }
  }, [maxPositionHistory])

  const handleRefresh = useCallback(() => {
    socketService.requestCurrentPosition()
  }, [])

  const onZoomChanged = useCallback((newZoomLevel:number) => {
    setZoomLevel(newZoomLevel)
  }, [])

  if (!position) return <LinearProgress />

  return (
    <div className="map-container">
      <IssMapControllers
        lastUpdate={lastUpdate}
        onRefreshClicked={handleRefresh}
        onZoomChanged={onZoomChanged} />
      <MapContainer
        center={[
          parseFloat(position.iss_position.latitude),
          parseFloat(position.iss_position.longitude),
        ]}
        zoom={zoomLevel}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ISSTrail positions={positionHistory} />
        <ISSMarker position={position} zoomLevel={zoomLevel}/>
      </MapContainer>
    </div>
  )
}
