from django.contrib import admin

# Register your models here.
from .models import profile,note, comment

admin.site.register(profile)
admin.site.register(note)
admin.site.register(comment)