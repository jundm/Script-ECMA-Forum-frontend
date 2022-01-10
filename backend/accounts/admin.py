from django.contrib import admin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
<<<<<<< HEAD
    list_display = ["email", "username", "nickname"]
=======
    list_display = ["email", "name", "username", "is_active", "is_staff", "is_admin"]
>>>>>>> 2d0cac79333aaa0f888ff12252cde9a93a475488
