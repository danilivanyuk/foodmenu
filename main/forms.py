from django.forms import ModelForm

from django import forms

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from customers.models import Customer


class CreateUserForm(UserCreationForm):
    phone = forms.CharField()
    first_name = forms.CharField()
    # last_name = forms.CharField()

    class Meta:
        model = Customer
        fields = ['email', 'password1', 'password2']
