from django.conf.urls import url, include
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views as drf_views

urlpatterns = [
    url(r'^auth/$', drf_views.obtain_auth_token, name='auth'),
    # url(r'^login/$', views.login_view, name='login'),
    url(r'^login/$', views.CurrentUserView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
