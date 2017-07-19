from django.conf.urls import url
from django.contrib.auth import views as auth_views

from . import views

app_name = 'deal'
urlpatterns = [
    url(r'^$', views.lobby, name='lobby'),
    url(r'^create-board/$', views.create_board, name='create_board'),
    url(r'^board/(?P<pk>[0-9]+)/$', views.play_board, name='play_board'),
    url(r'^login/$', auth_views.login,
        {'template_name': 'deal/login.html'}, name='login'),

    url(r'^logout/$', auth_views.logout, {'next_page': '/login'}, name='logout'),
    url(r'^signup/$', views.SignupView.as_view(), name='signup'),
]
