from api.viewsets import ProfileViewset, DashboardViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register('pofiles',DashboardViewset,basename="dashboard")
