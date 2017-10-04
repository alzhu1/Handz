let socket = null;

const LobbyWebsocket = {
    connect: (url) => {
        socket = new WebSocket(url);
    },

    listen: (self) => {

        socket.onmessage = (event) => {
            console.log('lobby websocket received message')
            console.log(event.data);
            var data = JSON.parse(event.data);

            if(data.createText == true)
            {
                self.props.add_text(data.text);
                // self.setState({chat: data.text.text});
            }
        };

        socket.onopen = () => {
            console.log("Web");
        }

        // socket.send('Lobbysocket: hello server!');
    },

    // send: (self) => {
    //     console.log('websocket send')
    //     // self.setState({chat: 'hi!'});
    //     socket.send('Hello Server!');
    //     // socket.addEventListener('open', (event) => {
    //     //     socket.send('Hello Server!');
    //     //     console.log('message sent')
    //     //
    //     // });
    // },

    disconnect: () => {
        socket.close();
    }
}

export default LobbyWebsocket;
