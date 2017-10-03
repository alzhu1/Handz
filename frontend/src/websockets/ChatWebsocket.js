let socket = null;

const ChatWebsocket = {
    connect: (url) => {
        socket = new WebSocket(url);
    },

    listen: (self) => {
        socket.onmessage = (event) => {
            console.log('chat websocket');
            console.log(event.data);
            var data = JSON.parse(event.data);

            console.log('received');
            console.log(data);

        };

        socket.onopen = () => {
            console.log("Web");
        }
    },

    send: (self) => {
        console.log('websocket send')
        // self.setState({chat: 'hi!'});
        socket.send('Hello Server!');
        // socket.addEventListener('open', (event) => {
        //     socket.send('Hello Server!');
        //     console.log('message sent')
        //
        // });
    },


    disconnect: () => {
        socket.close();
    }
}

export default ChatWebsocket;
