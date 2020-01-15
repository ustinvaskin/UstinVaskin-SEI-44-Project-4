from django.urls import path  # we always need to import this from django
# an import all the views we need to hook up to a URL, remeber in Django, the term view is used for what most other frameworks, including express apps, would use the term controller for
from .views import ChatListView, ChatDetailView, MessageListView, MessageDetailView

urlpatterns = [
    # our just '/chats view(controller), handles GET for Index and POST for Create, actions effecting the ListView
    path('chats/', ChatListView.as_view()),
    # the details view for post, GET show, PUT update, DELETE delete, routes that affect a single post instead of all the chats
    path('chats/<int:pk>/', ChatDetailView.as_view()),
    # this is the messages list route , leads to our messages create method view.
    path('chats/<int:pk>/messages/', MessageListView.as_view()),
    # comment details view only includes a delete method at the moment
    path('chats/<int:pk>/messages/<int:message_pk>/',
         MessageDetailView.as_view()),
]
