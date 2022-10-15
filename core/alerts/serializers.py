from rest_framework import serializers
from .models import GovAlert, UserAlert


class UserAlertSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserAlert
    fields = "__all__"
    
class GovAlertSerializer(serializers.ModelSerializer):
  class Meta:
    model = GovAlert
    fields = "__all__"
    
class UserAlertValidator(serializers.Serializer):
  title = serializers.CharField()
  description = serializers.CharField()
  category = serializers.CharField()

class GovAlertValidator(serializers.Serializer):
  title = serializers.CharField()
  description = serializers.CharField()