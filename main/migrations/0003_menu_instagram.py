# Generated by Django 3.2.5 on 2021-09-01 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_menu_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='menu',
            name='instagram',
            field=models.CharField(blank=True, default='', max_length=60, null=True, verbose_name='Инстаграм:'),
        ),
    ]