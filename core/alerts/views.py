from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from .models import *
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_alerts(request):
  if request.method == "GET":
    objs = UserAlert.objects.all()
    serializer = UserAlertSerializer(objs,many=True)
    return Response(serializer.data,status.HTTP_200_OK)
  else:
    serializer = UserAlertValidator(data=request.data)
    if serializer.is_valid():
      alert = UserAlert()
      alert.initiator = request.user.profile
      alert.title = serializer.data["title"]
      alert.description = serializer.data["description"]
      alert.category = serializer.data["category"]
      alert.location = serializer.data["location"]
      alert.save()
      return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
      
@api_view(['GET','DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_alert(request,pk):
  if request.method == "GET":
    obj = UserAlert.objects.get(id=pk)
    serializer = UserAlertSerializer(obj)
    return Response({
        'status' : True,
        'alert' : serializer.data
        },status.HTTP_204_NO_CONTENT)
  else:
    try:
      obj = UserAlert.objects.get(id=pk)
      if request.user.id == obj.initiator.user.id:
        serializer = UserAlertSerializer(obj)
        obj.delete()
        return Response({
          'status' : True,
          'item' : serializer.data
          },status.HTTP_204_NO_CONTENT)
      else:
        raise Exception("You are not authorized to delete this alert")
    except Exception as e:
      return Response({
          'status' : False,
          'error' : "{0}".format(e)
          },status.HTTP_404_NOT_FOUND)
    
@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def gov_alerts(request):
  if request.method == "GET":
    objs = GovAlert.objects.all()
    serializer = GovAlertSerializer(objs,many=True)
    return Response(serializer.data,status.HTTP_200_OK)
  else:
    serializer = GovAlertValidator(data=request.data)
    if serializer.is_valid():
      alert = GovAlert()
      alert.initiator = request.user.profile
      alert.title = serializer.data["title"]
      alert.description = serializer.data["description"]
      alert.save()
      return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
      
@api_view(['GET','DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def gov_alert(request,pk):
  if request.method == "GET":
    obj = GovAlert.objects.get(id=pk)
    serializer = GovAlertSerializer(obj)
    return Response({
        'status' : True,
        'alert' : serializer.data
        },status.HTTP_204_NO_CONTENT)
  else:
    try:
      obj = GovAlert.objects.get(id=pk)
      if request.user.id == obj.initiator.user.id:
        serializer = GovAlertSerializer(obj)
        obj.delete()
        return Response({
          'status' : True,
          'item' : serializer.data
          },status.HTTP_204_NO_CONTENT)
      else:
        raise Exception("You are not authorized to delete this alert")
    except Exception as e:
      return Response({
          'status' : False,
          'error' : "{0}".format(e)
          },status.HTTP_404_NOT_FOUND)
    