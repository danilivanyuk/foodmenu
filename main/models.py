from django.db.models import Count
from django.conf import settings
from django.db import models

from django.contrib.auth.models import User
from os import truncate
from pytils.translit import slugify
from django.urls import reverse
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

from io import BytesIO
from PIL import Image
from django.core.files import File
from django.db.models.deletion import CASCADE


def compress(image):
    im = Image.open(image)
    # create a BytesIO object
    im_io = BytesIO()
    # save image to BytesIO object
    im.save(im_io, 'JPEG', optimize=True, quality=70)
    # create a django-friendly Files object
    new_image = File(im_io, name=image.name)
    return new_image


THEME_OPTIONS = [
    ('default', 'Стандарт'),
    ('Black-White', 'Черно-Белая'),
    # ('', ''),
]


class Menu(models.Model):
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=CASCADE)
    logo = models.ImageField(blank=True, null=True, default="",
                             verbose_name="Логотип заведения", upload_to='menu_logos/')
    title = models.CharField(verbose_name="Название", max_length=100)
    address = models.CharField(
        verbose_name="Адрес заведения", max_length=255, blank=True, null=True)
    phone = models.CharField(
        verbose_name="Номер телефона(3 макс.)", max_length=50, blank=True, null=True)
    instagram = models.CharField(
        verbose_name='Инстаграм:', blank=True, null=True, max_length=60)
    QRCode = models.CharField(verbose_name="QR код",
                              max_length=1, blank=True, null=True)
    theme = models.CharField(
        choices=THEME_OPTIONS, default='default', max_length=40, verbose_name="Тема")
    slug = models.SlugField(unique=True, null=True, blank=True)

    # def save(self, *args, **kwargs):
    #     # call the compress function

    #     # save
    #     super().save(*args, **kwargs)

    @ property
    def logoURL(self):
        try:
            url = self.logo.url
        except:
            url = ''
        return url

    def get_absolute_url(self):
        return reverse('menu', kwargs={'slug': self.slug})

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Меню"
        verbose_name_plural = "Меню"

    def save(self, *args, **kwargs):
        # if self.logo:
        #     new_image = compress(self.logo)
        #     # set self.image to new_image
        #     self.logo = new_image
        self.slug = slugify(
            self.title+"-"+self.address)
        return super().save(*args, **kwargs)


class Category(models.Model):
    menu = models.ForeignKey(Menu, on_delete=CASCADE)
    title = models.CharField(verbose_name="Название категории", max_length=30)
    # position = models.IntegerField()

    class Meta:
        verbose_name = "Категории"
        verbose_name_plural = "Категории"

    # def getPosition():
    #     # q = Menu.objects.select_related(
    #     #     'Category').annotate(cc=Count('Category'))
    #     return(q)
    # getPosition()

    def __str__(self):
        return self.title


class Dish(models.Model):
    category = models.ForeignKey(Category, on_delete=CASCADE)
    title = models.CharField(verbose_name="Название блюда", max_length=70)
    description = models.TextField(
        verbose_name="Описание/Ингридиенты", blank=True, null=True)
    price = models.IntegerField(verbose_name="Цена", blank=True, null=True)

    class Meta:
        verbose_name = "Блюда"
        verbose_name_plural = "Блюда"

    def __str__(self):
        return self.title
