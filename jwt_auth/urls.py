from django.urls import path
from .views import RegisterView, LoginView, ProfileView, ProfileListView, ProfileDetailListView # importing our views from JWT auth

urlpatterns = [
    path('register/', RegisterView.as_view()), # sending requests to  '/register' to the register view(controller)
    path('login/', LoginView.as_view()),   # and the same for login 
    path('profile/', ProfileView.as_view()),   # and the same for profile 
    path('profile-all/', ProfileListView.as_view()),
    path('profile-all/<int:pk>/', ProfileDetailListView.as_view()),
]
