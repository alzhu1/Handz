from channels.routing import route
import api.consumers as api
import channels_app.consumers as chat

channel_routing = [

    route('websocket.connect', chat.ws_connect, path =r'/users/$'),
    route('websocket.disconnect', chat.ws_disconnect, path =r'/users/$'),


    route('websocket.connect', api.ws_lobby_connect, path=r'/lobby/$'),
    route('websocket.receive', api.ws_lobby_message, path=r'/lobby/$'),
    route('websocket.disconnect', api.ws_lobby_disconnect, path=r'/lobby/$'),

    route('websocket.connect', api.ws_signup_connect, path=r'/signup/$'),
    route('websocket.receive', api.ws_signup_message, path=r'/signup/$'),
    route('websocket.disconnect', api.ws_signup_disconnect, path=r'/signup/$'),
]
