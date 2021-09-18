from rest_framework import generics

from . import models
from . import serializers

# List all registered users
# Can be helful in creating a front end admin panel
class UserListView(generics.ListAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
