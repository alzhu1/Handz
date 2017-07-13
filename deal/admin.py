from django.contrib import admin

from .models import BridgeTable, UserProfile, Deal
# Register your models here.

admin.site.register(BridgeTable)
admin.site.register(UserProfile)
admin.site.register(Deal)
