from channels.routing import route
import api.consumers as api

channel_routing = [
    route('websocket.connect', api.ws_lobby_connect, path=r'/lobby/$'),
    route('websocket.receive', api.ws_lobby_message, path=r'/lobby/$'),
    route('websocket.disconnect', api.ws_lobby_disconnect, path=r'/lobby/$'),

    route('websocket.connect', api.ws_signup_connect, path=r'/signup/$'),
    route('websocket.receive', api.ws_signup_message, path=r'/signup/$'),
    route('websocket.disconnect', api.ws_signup_disconnect, path=r'/signup/$'),
]
