from django.urls import path  
from .views import ChatListView, ChatDetailView, MessageListView, MessageDetailView

urlpatterns = [
    path('chats/', ChatListView.as_view()),    
    path('chats/<int:pk>/', ChatDetailView.as_view()),
    path('chats/<int:pk>/messages/', MessageListView.as_view()),
    path('chats/<int:pk>/messages/<int:message_pk>/',
         MessageDetailView.as_view()),
]
