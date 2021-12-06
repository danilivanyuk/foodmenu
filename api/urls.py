from django.urls import path
from . import views

urlpatterns = [
    path('menus/', views.getMenus, name='menus-page'),
    path('menu/<slug:slug>', views.menuPage, name='menu-page'),

    path('menu/get_categories/<int:pk>',
         views.getCategories, name='get-categories'),
    path('menu/get_dishes/<int:category_id>',
         views.getDishes, name='get-dishes'),


    path('menu/create_menu/',
         views.createMenu, name='create-menu'),
    path('menu/create_category/',
         views.createCategory, name='create-category'),
    path('menu/create_dish/',
         views.createDish, name='create-dish'),

    path('menu/edit_menu/<int:pk>',
         views.editHeader, name='edit-menu'),
    path('menu/edit_dish/<int:pk>',
         views.editDish, name='edit-dish'),
    path('menu/edit_category/<int:pk>',
         views.editCategory, name='edit-category'),

    path('menu/delete_menu/<int:pk>',
         views.deleteMenu, name='delete-menu'),
    path('menu/delete_dish/<int:pk>',
         views.deleteDish, name='delete-dish'),
    path('menu/delete_category/<int:pk>',
         views.deleteCategory, name='delete-category'),


    path('profile/delete_customer/',
         views.deleteCustomer, name='delete-customer'),
    path('profile/get_customer/',
         views.getProfile, name='get-customer'),



]
