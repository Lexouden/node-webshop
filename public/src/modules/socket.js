var ws = new WebSocket('ws://localhost:3000/socket');

ws.onopen = error => {
  console.log(`Websocket error: ${error}`)
}