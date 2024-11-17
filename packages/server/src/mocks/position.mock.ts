import { ISSPosition } from 'iss-schema'

let currentIndex = 0

// can be generated with fakerjs
const positionMockList: ISSPosition[] = [
  {
    message: 'success',
    timestamp: 1627448400,
    iss_position: {
      latitude: '15.2048',
      longitude: '33.6476',
    },
  },
  {
    message: 'success',
    timestamp: 1627658401,
    iss_position: {
      latitude: '31.2049',
      longitude: '15.6477',
    },
  },
  {
    message: 'success',
    timestamp: 1626448402,
    iss_position: {
      latitude: '43.2050',
      longitude: '9.6478',
    },
  },

  {
    iss_position: { latitude: '12.1614', longitude: '-109.9927' },
    timestamp: 1731797250,
    message: 'success',
  },
  {
    iss_position: { latitude: '12.9101', longitude: '-109.4242' },
    timestamp: 1731797265,
    message: 'success',
  },
]


export const getMockPosition = (): ISSPosition => {
  return positionMockList[currentIndex++ % positionMockList.length]
}
