let socket = null;

const ChatWebsocket = {
    connect: (url) => {
        socket = new WebSocket(url);
    },

    listen: (self) => {
        socket.onmessage = (event) => {
            var data = JSON.parse(event.data);
            console.log(data);
            self.props.chat_message(data);
        };

        socket.onopen = () => {
            console.log("Web");
        }
    },

    send: (self, message) => {
        console.log('websocket send');
        var action = '{type: "CHAT_MESSAGE", message: message};'
        console.log(action);
        socket.send(action);

    },


    disconnect: () => {
        socket.close();
    }
}

export default ChatWebsocket;
