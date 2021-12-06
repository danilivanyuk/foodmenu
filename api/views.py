from os import error
from django.core import files
from django.http import response
from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import *
from main.models import *
from customers.models import Customer
# from rest_framework_simplejwt.serializers import (
#     TokenVerifySerializer,
# )


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def getMenus(request):
    menus = Menu.objects.filter(customer__id=request.user.id)
    serializer = MenuSerializer(menus, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny, ))
def menuPage(request, slug):
    menu = Menu.objects.get(slug=slug)
    # print(menu.image)
    serializer = MenuSerializer(menu)
    return Response(serializer.data)


@api_view(['GET'])
def getCategories(request, pk):
    categories = Category.objects.filter(menu__id=pk)
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getDishes(request, category_id):
    dishes = Dish.objects.filter(category__id=category_id)
    serializer = DishSerializer(dishes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def createMenu(request):
    serializer = MenuSerializer(data=request.data)
    if serializer.is_valid():

        serializer.save(customer_id=request.user.id)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def createCategory(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def createDish(request):
    serializer = DishSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def editDish(request, pk):
    dish = Dish.objects.get(id=pk)
    serializer = DishSerializer(instance=dish, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def editCategory(request, pk):
    category = Category.objects.get(id=pk)
    serializer = CategorySerializer(instance=category, data=request.data)

    if serializer.is_valid():

        serializer.save()
    else:
        print(error)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def editHeader(request, pk):
    menu = Menu.objects.get(id=pk)
    parser_classes = [MultiPartParser]
    print('logo prev: ', menu)
    # print('loGO: ', request.data['file'])

    serializer = MenuSerializer(
        instance=menu, data=request.data)
    print(serializer)
    if serializer.is_valid():

        serializer.save()
    else:
        print(serializer.errors)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def deleteMenu(request, pk):
    menu = Menu.objects.get(id=pk)
    menu.delete()

    return Response('dish deleted')


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def deleteDish(request, pk):
    dish = Dish.objects.get(id=pk)
    dish.delete()

    return Response('dish deleted')


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def deleteCategory(request, pk):
    category = Category.objects.get(id=pk)
    category.delete()

    return Response('category deleted')


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def getProfile(request):
    customer = Customer.objects.get(id=request.user.id)
    serializer = CustomerSerializer(customer)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def deleteCustomer(request):
    customer_id = request.user.id
    user = Customer.objects.get(id=customer_id)
    user.delete()
    return Response('user deleted')
