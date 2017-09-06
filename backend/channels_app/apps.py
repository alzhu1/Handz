from django.apps import AppConfig


class ChannelsAppConfig(AppConfig):
    name = 'channels_app'

    def ready(self):
        import channels_app.signals
