from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from .models import Profile

class LoginValidator(serializers.Serializer):
  email = serializers.CharField()
  password = serializers.CharField()
  aadhar_id = serializers.CharField()

class RegisterSerializer(serializers.Serializer):
  email = serializers.EmailField()
  username = serializers.CharField()
  password = serializers.CharField()
  state = serializers.CharField()
  group = serializers.CharField()
  aadhar_id = serializers.CharField()
  
  
  def validate(self,data):
    if User.objects.filter(email=data["email"]).exists():
      raise serializers.ValidationError("Email is already taken")
    if User.objects.filter(username=data["username"]).exists():
      raise serializers.ValidationError("Username is already taken")
    return data
  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data["username"],
      email=validated_data["email"]
    )
    user.profile.state = validated_data["state"]
    user.profile.aadhar_id = validated_data["aadhar_id"].strip()
    user.set_password(validated_data["password"])
    group = Group.objects.get(name=validated_data["group"]) 
    group.user_set.add(user)
    user.save()
    return user
  
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["groups"]
    depth = 1

class ProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  class Meta:
    model = Profile
    fields = "__all__"

  