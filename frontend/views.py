from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


@permission_classes((IsAuthenticated, ))
def profilePage(request):
    return render(request, 'frontend/index.html')
