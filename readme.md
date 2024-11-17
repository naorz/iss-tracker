# ISS Tracker

A real-time International Space Station tracking application that shows the current location of the ISS on a world map.

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm run server`
4. Run `npm run client`
5. Open `http://localhost:5173` in your browser

## Communication

1. via restful API  
   The restful API implemented just for testing purposes.  
   The web app is using the websocket to get the ISS position.
   for live tracking we can also use polling technique to get the ISS position.
   The following endpoints are available:
   - http://localhost:3000/health - get the health status of the server
   - http://localhost:3000/api/iss/position - get the current position of the ISS
2. via websocket (socket.io)
   - ws://localhost:3000
