from django.shortcuts import render, redirect
from django.contrib.auth import logout
from .models import Menu
from .decorators import *
from .forms import *


def landingPage(request):
    return render(request, 'main/landingPage.html')


@unauthenticated_user
def loginPage(request):
    # print(request.COOKIES.get('jwt_auth'))
    return render(request, 'main/login.html')

def logOut(request):
    logout(request)
    return redirect('landing-page')


def registerPage(request):
    form = CreateUserForm()
    return render(request, 'main/register.html', context={'form': form})


def passwordResetConfirm(request, uidb64, token):
    return render(request, 'main/passwordResetConfirm.html')


def passwordResetRequest(request):
    return render(request, 'main/resetPassword.html')


def menuPage(request, slug):
    menu = Menu.objects.get(slug=slug)
    context = {'menu_slug': slug}
    return render(request, 'main/menu.html', context)
