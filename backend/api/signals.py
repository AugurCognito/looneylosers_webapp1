from django import dispatch
from django.db.models.fields import AutoField, EmailField
from django.db.models.signals import post_save
from django.contrib.auth.models import Group
from users.models import CustomUser
from .models import profile

# When a user is creted, make changes to user or something something
def user_profile(sender, instance, created,**kwargs):
    print("FUNCTION CALLED")
    if created:
        group = Group.objects.get(name='approvedusers')
        instance.groups.add(group)

        profile.objects.create(
            user=instance,
            name=instance.username,
            email=instance.email,
            )
        print(f"Profile Created => {instance.username}")

# Connects(?) user and approveduser group for auth stuff
post_save.connect(user_profile, sender=CustomUser)
