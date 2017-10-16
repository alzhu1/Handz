from django.conf.urls import url, include
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views as drf_views

urlpatterns = [
    url(r'^auth/$', drf_views.obtain_auth_token, name='auth'),
    url(r'^text/$', views.TextView.as_view(), name='text'),
    url(r'^login/$', views.LoginView.as_view()),
    url(r'^logout/$', views.LogoutView.as_view()),
    url(r'^signup/$', views.SignupView.as_view()),
    url(r'^users/$', views.UsersView.as_view()),
    url(r'^test/$', views.testview),
]

urlpatterns = format_suffix_patterns(urlpatterns)
