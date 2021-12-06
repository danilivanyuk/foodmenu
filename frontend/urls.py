from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.profilePage, name='profile-page'),
    re_path(r'^(?:.*)/?$', views.profilePage)
]
