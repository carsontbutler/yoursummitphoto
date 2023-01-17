from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import Photo, Location
from .serializers import PhotoSerializer, LocationSerializer, UserSerializerWithToken, RegisterSerializer
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterUserView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class GetLocationsView(APIView):
    def get(self, request):
        locations = Location.objects.all()
        data = LocationSerializer(locations, many=True).data
        return Response(data, status=status.HTTP_200_OK)


class GetImageDataView(APIView):
    def get(self, request):
        photos = Photo.objects.all()
        data = PhotoSerializer(photos, many=True).data
        for item in data:
            item['author_name'] = User.objects.get(pk=int(item['author'])).username
        return Response(data, status=status.HTTP_200_OK)


class UploadPhotoView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PhotoSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        print(request.__dict__)
        if serializer.is_valid():
            author = request.user
            photo = request.data.get('photo')
            date = request.data.get('date')
            time = request.data.get('time')
            location = Location.objects.get(id=request.data.get('location'))
            new_photo = Photo(author=author, photo=photo,
                              date=date, time=time, location=location)
            new_photo.save()
            return Response({'message': serializer.data}, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response({'message': 'Something went wrong. Please check the form and try again.'}, status=status.HTTP_400_BAD_REQUEST)
