let socket = null;

const ChatWebsocket = {
    connect: (url) => {
        socket = new WebSocket(url);
    },

    listen: (self) => {
        socket.onmessage = (event) => {
            console.log(event);
            var data = event.data;
            self.props.chat_message(data);
        };

        socket.onopen = () => {
            console.log("Web");
        }
    },

    send: (self, message, username) => {
        console.log('websocket send');
        console.log(message);
        socket.send(message);
        // socket.send({'message':message});
        // socket.send({'username':username,
        //               'message':message});
    },


    disconnect: () => {
        socket.close();
    }
}

export default ChatWebsocket;
