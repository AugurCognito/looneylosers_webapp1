from .models import profile
from .serializers import profileSer, dashboardSerializer
from rest_framework import serializers, viewsets

from rest_framework.permissions import IsAuthenticated, IsAdminUser

class ProfileViewset(viewsets.ModelViewSet):
    queryset = profile.objects.all()

    serializer_class = profileSer

class DashboardViewset(viewsets.ReadOnlyModelViewSet):
    queryset = profile.objects.all()

    serializer_class = dashboardSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this viewset requires.
        """
        permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    