from django.urls import path
from django.urls.conf import include
from . import views



urlpatterns = [
    # --for user auth/registring and such--

    # shows list of users with their emails, not VERY good in production
    path('users/', include('users.urls')),

    path('rest-auth/', include('rest_auth.urls')),

    path('rest-auth/registration/', include('rest_auth.registration.urls')),

    # --for api access other than auth--
    # path('dashboard/', views.NoteList), #not needed right now
    path('notes/',views.NoteList.as_view()),
    path('note/<str:pk>/',views.NotePage.as_view()),
    path('comment/<str:pk>/',views.commentPost)
]
 