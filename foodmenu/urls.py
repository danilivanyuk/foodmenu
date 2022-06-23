"""foodmenu URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from frontend.views import profilePage
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ResendEmailVerificationView
from dj_rest_auth.views import LoginView, LogoutView
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenVerifyView,
)
from django.conf.urls.i18n import i18n_patterns
from django.utils.translation import gettext_lazy as _

import main.views

urlpatterns = [
    path(_('admin/'), admin.site.urls),
    path('api/', include('api.urls')),
    # path('', include('main.urls')),
    # path('profile/', include(('frontend.urls', 'frontend'), namespace='frontend')),
    path('qr_code/', include('qr_code.urls', namespace="qr_code")),

    path('auth/', include('dj_rest_auth.urls')),

    path('get-token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    re_path(r'^password-reset/confirm/$', main.views.passwordResetConfirm,
            name="password-reset-confirm"),
    re_path(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,32})/$', main.views.passwordResetConfirm,
            name="password_reset_confirm"),

    path('auth/account-confirm-email/', VerifyEmailView.as_view(),
         name='account_email_verification_sent'),
    path('auth/registration/resend-email/', ResendEmailVerificationView.as_view(),
         name='account_email_verification_sent'),

    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),
]


urlpatterns += i18n_patterns(
    path('', include('main.urls')),
    path('profile/', include(('frontend.urls', 'frontend'), namespace='frontend')),
)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
