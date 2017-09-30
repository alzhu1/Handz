let socket = null;

const LobbyWebsocket = {
    connect: (url) => {
        socket = new WebSocket(url);
    },

    listen: (self) => {
        socket.onmessage = (event) => {
            console.log('lobby websocket')
            console.log(event.data);
            var data = JSON.parse(event.data);

            if(data.createText == true)
            {
                self.props.add_text(data.text);
            }
        };

        socket.onopen = () => {
            console.log("Web");
        }
    },

    disconnect: () => {
        socket.close();
    }
}

export default LobbyWebsocket;
