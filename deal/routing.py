from channels.routing import route
from . import consumers


channel_routing = [
    route('websocket.connect', consumers.ws_connect, path=r'/table/(?P<table_id>[0-9]+)/$'),
    route('websocket.receive', consumers.ws_message, path=r'/table/(?P<table_id>[0-9]+)/$'),
    route('websocket.disconnect', consumers.ws_disconnect, path=r'/table/(?P<table_id>[0-9]+)/$'),
]
