from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import LoginValidator,RegisterSerializer,ProfileSerializer
from django.contrib.auth import authenticate
from .models import Profile

@api_view(['POST'])
def login_user(request):
  try:
    data = request.data
    print(data)
    serializer = LoginValidator(data=data)
    if not serializer.is_valid():
      return Response({
        'status': False,
        'message': serializer.errors
      },status.HTTP_400_BAD_REQUEST)
    _user = User.objects.filter(email=serializer.data["email"])[0]
    if _user.profile.aadhar_id[::-1][:4][::-1] == serializer.data["aadhar_id"]:
      user = authenticate(username=_user.username,
                          password=serializer.data["password"])
      if user:
        token,_ = Token.objects.get_or_create(user=user) 
        serializer = ProfileSerializer(user.profile)
        return Response({
          'status':True,
          'token':str(token),
          'user':serializer.data
        },status=status.HTTP_200_OK)
      else:
        return Response({
          'error':"Wrong Username or Password"
        },status=status.HTTP_401_UNAUTHORIZED)
    else:
      return Response({
          'error':"Wrong Aadhar Id"
        },status=status.HTTP_401_UNAUTHORIZED)
  # add an except and take the error as input
  except Exception as error:
     return Response({
          'error':f'{error}'
        },status=status.HTTP_401_UNAUTHORIZED)
    
      
@api_view(['POST'])
def register_user(request):
  serializer = RegisterSerializer(data=request.data)
  if not serializer.is_valid():
    print(serializer.errors)
    return Response({
    'status': False,
    'error': serializer.errors
  },status.HTTP_400_BAD_REQUEST)
  else:
    user = serializer.save()
    token, _ = Token.objects.get_or_create(user=user)
    if token:
      serializer = ProfileSerializer(user.profile)
      return Response({
      'status':True,
      'message':"User created",
      'token':str(token),
      'profile':serializer.data
    },status=status.HTTP_201_CREATED)
    
        
@api_view(['GET'])
def get_user(request,pk):
  profile = Profile.objects.get(id=pk)
  serializer = ProfileSerializer(profile)
  return Response({
    'status':True,
    'user':serializer.data
  },status=status.HTTP_200_OK)
    