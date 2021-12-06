from customers.models import Customer
from django.db.models import fields
# from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
import allauth
from main.models import *


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ('email', 'subscription')


class MenuSerializer(serializers.ModelSerializer):
    logoURL = serializers.SerializerMethodField('get_logo_url')

    class Meta:
        model = Menu
        fields = ('id', 'logoURL', 'logo', 'title',
                  'instagram', 'address', 'phone', 'theme', 'slug')

    def get_logo_url(self, obj):
        if obj.logo:
            return obj.logo.url
        else:
            return ''


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'menu', 'title')


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ('id', 'category', 'title', 'description', 'price')
