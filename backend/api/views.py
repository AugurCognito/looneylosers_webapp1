# from django.shortcuts import render
# not important rn

# for api response and stuff
from http.client import error
from typing import KeysView
from django.http.response import Http404
from rest_framework import response
from rest_framework.views import APIView
from users import serializers
from rest_framework.decorators import api_view, authentication_classes ,permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework.response import Response

from rest_framework import generics, mixins
from rest_framework import filters
from rest_framework import status
import json

from .serializers import notePageSerializer, dashboardSerializer, note, noteSerializer

from .models import comment, profile, note
from api import models

# --VIEWS--

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def NoteList(request, fromat=None):
    user = request.user
    usr_profile = user.profile

    serializer = dashboardSerializer(usr_profile)

    return Response(serializer.data)


class DashboardView(generics.GenericAPIView):
    serializer_class = dashboardSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the notes
        for the currently authenticated user.
        """
        user = self.request.user.id
        return profile.objects.filter(user=user)
    def get(self,request):
        
        return Response(self.queryset)

class NoteList(generics.ListAPIView,
                APIView):
    """
        This view should return a list of all the Notes
    """
    serializer_class = noteSerializer

    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    ordering_fields = ['note_title', 'time_created', 'time_last_edited', 'is_public']

    search_fields = ['note_title', 'content']

    def get_queryset(self):
        user_profile = self.request.user.profile
        
        return note.objects.filter(user=user_profile)
    
    def post(self,request):
        print("-->>",request.data.dict())
        data = dict(request.data.dict())
        # json_data = json.dumps(request.data)
        # print(json_data)
        serializer = noteSerializer(data=request.data,context={'request':request})
        if serializer.is_valid():
            # serializer.save()
            # return Response("LUL worked")

            try:
                if data["is_public"].lower() == 'true':
                    is_public=True
                else:
                    is_public=False
            except KeyError:
                is_public=False
            note_model = note(note_title=data["note_title"],
                                content=data["content"].replace('\\n','\n'),
                                is_public =is_public,
                                user_id=request.user.profile.id)
            print(data["content"].replace('\\n','\n'))
            note_model.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
 
        return Response("error in data")
    


class NotePage(
                mixins.CreateModelMixin,
                mixins.DestroyModelMixin,
                generics.GenericAPIView):
    queryset = note.objects.all()
    serializer_class = notePageSerializer

    def get(self, request, *args, **kwargs):
        print(request, args, kwargs)
        pk = kwargs["pk"]
        # if its the user who made the post    
        try:
                usr_profile = request.user.profile
                if note.objects.filter(id=pk)[0].user == usr_profile:
                    note_obj=note.objects.filter(id=pk)[0]
                    nt_serializer = notePageSerializer(note_obj)
                    return Response(nt_serializer.data)
        except:
            pass
        # if post is public and 
        try:
            if note.objects.filter(id=pk)[0].is_public == True:
                note_obj=note.objects.filter(id=pk)[0]
                nt_serializer = notePageSerializer(note_obj)
                return Response(nt_serializer.data)
            else:
                return Response("Post doesnt exist or isnt public!!!")
                
        except:
             return Response("Post doesnt exist or isnt public!!!")

    def delete(self, request, *args, **kwargs):
        # try   :
                print("3")
                pk = kwargs["pk"]
                try:
                    usr_profile = request.user.profile
                    if note.objects.filter(id=pk)[0].user == usr_profile:
                        note_obj=note.objects.filter(id=pk)[0]
                        note_obj.delete()
                        return Response("Deletion Complete!!!")

                    return Response("You arent authorised")

                except:
                    return Response("Anonymous user not authorised!!")

@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def commentPost(request,pk):
    data_dict=request.data
    post=pk
    user=request.user.profile.id
    if request.method == 'POST':
        if note.objects.filter(id=pk)[0].is_public == True or note.objects.filter(id=pk)[0].user == user:
            comment_obj = comment(content=data_dict["content"],post=note.objects.filter(id=pk)[0],user=profile.objects.filter(id=user)[0])
            comment_obj.save()
            return Response(comment_obj)


