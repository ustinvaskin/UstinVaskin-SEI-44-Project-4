from django.urls import path
# importing our views from JWT auth
from .views import RegisterView, LoginView, ProfileView, ProfileListView, ProfileDetailListView

# no id send in params to any of these routes

urlpatterns = [
    # sending requests to  '/register' to the register view(controller)
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),  # and the same for login
    path('profile/', ProfileView.as_view()),  # and the same for profile
    # and the same for profile
    path('profile-all/', ProfileListView.as_view()),
    # and the same for profile
    path('profile-all/<int:pk>/', ProfileDetailListView.as_view()),






]
