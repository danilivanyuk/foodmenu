# Generated by Django 3.2.5 on 2022-03-29 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_menu_logo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='logo',
            field=models.ImageField(blank=True, default='static\\images\\menu_logos\\defaultCafeIcon.jpg', null=True, upload_to='menu_logos/', verbose_name='Логотип заведения'),
        ),
    ]
