from channels.routing import route
import deal.consumers as deal
import channels_app.consumers as chat

channel_routing = [
    route('websocket.connect', deal.ws_play_connect,
          path=r'/table/(?P<table_id>[0-9]+)/play/$'),
    route('websocket.receive', deal.ws_play_message,
          path=r'/table/(?P<table_id>[0-9]+)/play/$'),
    route('websocket.disconnect', deal.ws_play_disconnect,
          path=r'/table/(?P<table_id>[0-9]+)/play/$'),

    route('websocket.connect', deal.ws_connect,
          path=r'/table/(?P<table_id>[0-9]+)/$'),
    route('websocket.receive', deal.ws_message,
          path=r'/table/(?P<table_id>[0-9]+)/$'),
    route('websocket.disconnect', deal.ws_disconnect,
          path=r'/table/(?P<table_id>[0-9]+)/$'),

    route('websocket.connect', chat.ws_connect, path =r'/users/$'),
    route('websocket.disconnect', chat.ws_disconnect, path =r'/users/$'),
]
