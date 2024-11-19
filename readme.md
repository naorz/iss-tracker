# ISS Tracker

A real-time International Space Station tracking application that shows the current location of the ISS on a world map.  

> This project is for learning purposes.  
> The API used for the ISS position is provided by the [open-notify.org](http://api.open-notify.org/iss-now.json)  
> There is no really need for the server side to get the ISS position. It can be done directly from the client side.  
> The server side is just for learning purposes 👨‍🏫👩‍🏫💻  

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
  
> Note: The websocket usage here for learning purposes only.  
> The API used for the ISS position is provided by the [open-notify.org](http://api.open-notify.org/iss-now.json)  
> There is no really need for the server side to get the ISS position. It can be done directly from the client side.  
> The server side is just for learning purposes 👨‍🏫👩‍🏫💻  

### Client Side

Technologies:
- React
- TypeScript (using vite + react-ts template)
- [Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project)
- [Leaflet](https://leafletjs.com/)
- [React-Leaflet](https://react-leaflet.js.org/)
- [Socket.io-client](https://socket.io/docs/v4/client-api/) - get real-time ISS position from the server - just for fun 🧂🌶️
- [Axios](axios-http.com) - for the restful API - for health check api (just for fun 🧂🎸 - can be done with fetch API)
- [Material-UI](https://mui.com/)


### Configurations
The server and the client are using the `.env` file to get the configuration.  
Available configurations:  
| Name | Description | Default |
|------|-------------|---------|
| `PORT` | The port of the server | `3000` |
| `ISS_USE_MOCK` | default is `false`, if `true` the serve will use some mock data | `false` |

See `packages/server/config/index.ts` for more details.  

## Demo ISS Tracker

![ISS Tracker](./docs/iss-tracker-demo.gif)
