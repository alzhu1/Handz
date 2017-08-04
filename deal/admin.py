from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import BridgeTable, UserProfile, Deal, MyUser

# Register your models here.
admin.site.register(MyUser, UserAdmin)
admin.site.register(BridgeTable)
admin.site.register(UserProfile)
admin.site.register(Deal)
