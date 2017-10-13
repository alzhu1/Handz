import ReconnectingWebSocket from 'shopify-reconnecting-websocket';

let _socket = null;

const ChatWebsocket = {
    connect: () => {
        // "ws://"+ window.location.host + "/chat/"
        var url = "ws://localhost:8000/chat/";
        _socket = new ReconnectingWebSocket(url);
        // let text = JSON.stringify({
        //   "action":"chat",
        //   "message":"hiii",
        //   "username":username
        // });
        // console.log(text);
        // socket.send(text);
    },

    listen: (self, store) => {
        _socket.onmessage = (event) => {
            let data = event.data;
            if (JSON.parse(data).action === "chat") {
              self.props.chat_message(data);
            }
        };

        _socket.onopen = () => {
            const state = store.getState();
            let text = JSON.stringify({
              "action":"chat",
              "message":"hiii",
              "username":state.username
            });
            console.log(text);
            _socket.send(text);
        }

    },

    send: (self, action, message, username) => {
        var text = JSON.stringify({
          "action":action,
          "message":message,
          "username":username
        });
        console.log(text);
        _socket.send(text);
    },


    disconnect: () => {
        _socket.close();
    }
}

export default ChatWebsocket;
