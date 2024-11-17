import './issMap.style.css'
import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { ISSPosition } from 'iss-schema'
import LinearProgress from '@mui/material/LinearProgress'
import { socketService } from '../../services'
import { IssMapControllers } from './IssMapHeader'
import { ISSMarker } from './IssMarker'

const ZOOM_LEVEL = 4

export const IssMap = () => {
  const [position, setPosition] = useState<ISSPosition | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    const detractIssUpdates = socketService
      .onISSPosition((newPosition) => {
        console.log('🎸', '='.repeat(5), `start ISS position updates from server`, newPosition)
        setPosition(newPosition)
        setLastUpdate(new Date(newPosition.timestamp * 1000))
      })

    return () => {
      detractIssUpdates()
      console.log('🎸', '='.repeat(5), `ISS updates terminated`)
    }
  }, [])

  const handleRefresh = useCallback(() => {
    socketService.requestCurrentPosition()
  }, [])

  if (!position) return <LinearProgress />

  return (
    <div className="map-container">
      <IssMapControllers lastUpdate={lastUpdate} onRefreshClicked={handleRefresh} />
      <MapContainer
        center={[
          parseFloat(position.iss_position.latitude),
          parseFloat(position.iss_position.longitude),
        ]}
        zoom={ZOOM_LEVEL}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ISSMarker position={position} zoomLevel={ZOOM_LEVEL} />
      </MapContainer>
    </div>
  )
}
