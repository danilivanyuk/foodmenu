# Generated by Django 3.2.5 on 2021-09-15 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_menu_instagram'),
    ]

    operations = [
        migrations.AddField(
            model_name='menu',
            name='theme',
            field=models.CharField(choices=[('default', 'Стандарт'), ('Black-White', 'Черно-Белая')], default='default', max_length=40, verbose_name='Тема'),
        ),
    ]
