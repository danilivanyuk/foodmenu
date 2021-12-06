from django.urls import path
from . import views

urlpatterns = [
    path('', views.landingPage, name='landing-page'),
    path('login/', views.loginPage, name='login-page'),
    path('logout/', views.logOut, name='logout'),
    path('register/', views.registerPage, name='register-page'),
    path('password-reset-request/',
         views.passwordResetRequest, name='password-reset-request'),

    path('menu/<str:slug>', views.menuPage, name='menu'),
]
