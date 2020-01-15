from django.contrib import admin

from django.urls import path, include

urlpatterns = [

    path('admin/', admin.site.urls),

    path('api/', include('jwt_auth.urls')),

    path('api/', include('posts.urls')),

    path('api-auth/', include('rest_framework.urls')),
    path('', include('frontend.urls')),
    path('api/', include('chats.urls'))

]
