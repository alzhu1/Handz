let socket = null;

const ChatWebsocket = {
    connect: (url) => {
        socket = new WebSocket(url);
    },


    disconnect: () => {
        socket.close();
    }
}

export default ChatWebsocket;
