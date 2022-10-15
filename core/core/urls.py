from django.urls import path,include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from alerts.views import *
from users.views import *


urlpatterns = [
    path('admin/',admin.site.urls),
    path('user_alerts/',user_alerts),
    path('user_alerts/<str:pk>',user_alert),
    path('gov_alert/',gov_alerts),
    path('gov_alert/<str:pk>',gov_alert),
    path('users/login',login_user),
    path('users/register',register_user),
    path("users/<str:pk>", get_user),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)