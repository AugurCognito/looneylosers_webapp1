from decimal import Context
from inspect import currentframe
from django.db import models
from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers
from rest_framework.fields import ReadOnlyField

from .models import profile, note, comment
import uuid

class profileSer(serializers.ModelSerializer):
    class Meta:
        model = profile
        fields = ("__all__")
    

class commentSerializer(serializers.ModelSerializer):
    class Meta:
        model = comment
        fields = ("__all__")

class notePageSerializer(serializers.ModelSerializer):
    comments = commentSerializer(many=True)
    class Meta:
        model = note
        fields = ("note_title","content","time_created","time_last_edited","is_public",'comments')

class CurrentProfile(profile):
    """
    May be applied as a `default=...` value on a serializer field.
    Returns the current user.
    """
    requires_context = True

    def __call__(self, serializer_field):
        print("Running")
        print(type(serializer_field.context['request'].user.profile.id),"<-----")
        return serializer_field.context['request'].user.profile.id

class noteSerializer(serializers.ModelSerializer):
    user=serializers.SerializerMethodField(CurrentProfile())

    # def to_representation(self, obj):
    #     data = super().to_representation(obj)
    #     data['user']= CurrentProfile()
    #     print(data)
    #     return data

    # @staticmethod
    # def get_user(obj):
    #     return CurrentProfile()

    class Meta:
        model = note
        fields = ('id',"note_title","content","time_created","time_last_edited","is_public","user",)
        read_only_field = ("id",)


class dashboardSerializer(serializers.ModelSerializer):
    notes = noteSerializer(many=True, read_only=True)
    class Meta:
        model = profile
        fields = ('name','notes')
