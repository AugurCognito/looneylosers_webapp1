from django.db import models

# Create your models here.
from users.models import CustomUser

import uuid

class profile(models.Model):
    """
        User Profile, Connected to User auth model User
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    name = models.CharField(max_length=50,verbose_name="User Name")
    email = models.EmailField(max_length=200,verbose_name="User Email",blank=True)

    profile_creation_time = models.DateTimeField(auto_now_add=True)

    # profilepic = models.ImageField()

    def __str__(self) -> str:
        return self.name

class note(models.Model):
    """
        User notes, User will have list of notes unique user id or something
    """
    id = models.UUIDField(  primary_key=True,default=uuid.uuid4,
                            help_text="Unique ID for this particular Note",
                            auto_created=True,editable=False)

    note_title = models.CharField(max_length=100)
    content = models.CharField(max_length=2000)

    time_created = models.DateTimeField(auto_now_add=True)
    time_last_edited = models.DateTimeField(auto_now=True)

    is_public = models.BooleanField(default=False)

    user = models.ForeignKey(profile,on_delete=models.CASCADE,related_name="notes")

    def __str__(self) -> str:
        return f"{self.note_title} by {self.user.name}"

class comment(models.Model):
    """
        Comments Under the notes
    """

    content = models.CharField(max_length=1000)
    time_created = models.DateTimeField(auto_now_add=True)
    

    post = models.ForeignKey(note,on_delete=models.CASCADE,related_name="comments")
    user = models.ForeignKey(profile,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.user.name} on {self.post.note_title}"
