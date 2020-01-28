from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Chat, Message
User = get_user_model()  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'profile_image')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'text', 'owner', 'chat')

class PopulatedMessageSerializer(MessageSerializer):
    owner = UserSerializer()  
class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ('id', 'content', 'image', 'owner', 'created_at',
                  'messages')
        extra_kwargs = {'messages': {'required': False},
                        'categories': {'required': False}}

class PopulatedChatSerializer(ChatSerializer):
    owner = UserSerializer()
    messages = PopulatedMessageSerializer(many=True)
    
