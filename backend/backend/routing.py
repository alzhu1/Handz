from channels.routing import route, route_class

import api.consumers as api

channel_routing = [
    route_class(api.SockConsumer, path=r"^/$"),
]
