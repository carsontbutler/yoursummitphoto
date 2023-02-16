from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import UploadPhotoView, GetLocationsView, GetImageDataView, RegisterUserView, MyTokenObtainPairView, DeletePhotoView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    # Authentication
    path('register/', RegisterUserView.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Gallery API
    path('images/', GetImageDataView.as_view()),
    path('upload/', UploadPhotoView.as_view()),
    path('locations/', GetLocationsView.as_view()),
    path('photos/delete/<str:pk>/', DeletePhotoView.as_view()),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
