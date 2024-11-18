import { useLeafletContext } from '@react-leaflet/core'
import { ISSPosition } from 'iss-schema'
import { Icon } from 'leaflet'
import { useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'

const ISS_ICON_SIZE = 46

const issIcon = new Icon({
  iconUrl: 'iss.png',
  iconSize: [ISS_ICON_SIZE, ISS_ICON_SIZE],
})

type ISSMarkerProps = {
  position: ISSPosition
  zoomLevel?: number
}

export const ISSMarker = ({ position, zoomLevel = 4 }: ISSMarkerProps) => {
  const context = useLeafletContext()

  useEffect(() => {
    const lat = parseFloat(position.iss_position.latitude)
    const lng = parseFloat(position.iss_position.longitude)
    context.map.setView([lat, lng], zoomLevel, {
      animate: true,
      duration: 1,
    })
  }, [position, context.map, zoomLevel])

  return (
    <Marker
      icon={issIcon}
      position={[
        parseFloat(position.iss_position.latitude),
        parseFloat(position.iss_position.longitude),
      ]}
    >
      <Popup>
        ISS Current Position<br />
        Lat: {position.iss_position.latitude}<br />
        Long: {position.iss_position.longitude}
      </Popup>
    </Marker>
  )
}
