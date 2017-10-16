import ReconnectingWebSocket from 'shopify-reconnecting-websocket';

let _socket = null;

const ChatWebsocket = {
    connect: () => {
        // "ws://"+ window.location.host + "/chat/"
        var url = "ws://localhost:8000/chat/";
        _socket = new ReconnectingWebSocket(url);
    },

    listen: (self, store) => {
        _socket.onmessage = (event) => {
            let data = event.data;
            console.log('receive data')
            console.log(JSON.parse(data));
            if (JSON.parse(data).action === "chat") {
              self.props.chatMessage(data);
            }
            if (JSON.parse(data).action === "user") {
              self.props.modifyUserList(JSON.parse(data).logged_in,JSON.parse(data).username);
            }
        };

        _socket.onopen = () => {
            const state = store.getState();
            let text = JSON.stringify({
              "action":"user",
              "logged_in":true,
              "username":state.username
            });
            console.log("on open");
            console.log(text);
            _socket.send(text);
        }

        _socket.onclose = () => {
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


    disconnect: (store) => {
        const state = store.getState();
        let text = JSON.stringify({
          "action":"user",
          "logged_in":false,
          "username":state.username
        });
        console.log("on close");
        console.log(text);
        _socket.send(text);
        _socket.close();
    }
}

export default ChatWebsocket;
