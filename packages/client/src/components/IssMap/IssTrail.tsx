import { ISSPosition } from 'iss-schema'
import { Polyline, Rectangle } from 'react-leaflet'
import { LatLngBoundsExpression } from 'leaflet'

interface ISSTrailProps {
  positions: ISSPosition[]
}

const BOUNDS_SIZE = 0.2

export const ISSTrail = ({ positions }: ISSTrailProps) => {
  const squares = positions.map((pos) => {
    const lat = parseFloat(pos.iss_position.latitude)
    const lng = parseFloat(pos.iss_position.longitude)
    const bounds: LatLngBoundsExpression = [
      [lat - BOUNDS_SIZE, lng - BOUNDS_SIZE],
      [lat + BOUNDS_SIZE, lng + BOUNDS_SIZE],
    ]
    return bounds
  })

  const linePoints: [number, number][] = positions.map(pos => [
    parseFloat(pos.iss_position.latitude),
    parseFloat(pos.iss_position.longitude),
  ])

  return (
    <>
      <Polyline positions={linePoints} color="#AA5486" />
      {squares.map((bounds, index) => (
        <Rectangle
          key={index}
          bounds={bounds}
          color="#FC8F54"
          weight={1}
          fillOpacity={0.2}
        />
      ))}
    </>
  )
}
