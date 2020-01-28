#pylint: disable = no-member, arguments-differ

from rest_framework import serializers # importing the serlaizers funcionality from django rest framework
from django.contrib.auth import get_user_model  # method to get the user model
import django.contrib.auth.password_validation as validations # this is a built in part of django we can use to validate passwords out of the box
from django.contrib.auth.hashers import make_password # built in part of django we can use to hash our passwords
from django.core.exceptions import ValidationError # and error we can use if password and confirmation dont mate
from django.apps import apps   # this is the method used to import a model from another app. We can not always import it directly, as this creates what is called a circular import which can cause issues, to many things being imported all over the place. This is safer method to do it
from posts.serializers import PopulatedPostSerializer
User = get_user_model() # invoking get user model to get our custom User model instance.
Post = apps.get_model('posts', 'Post') # importing the Post model to create a post searlizer here. Importing the exisiting one from the posts project would again cause circular import issues.
Chat = apps.get_model('chats', 'Chat')


class PostSerializer(serializers.ModelSerializer): # We make this quick little serializer to populate a posts field on our user. This gives the nice functionality on the profile route that return our user object, along with all the posts they've made
    class Meta:
        model = Post
        fields = ('id', 'content', 'image')


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'content', 'image')


class UserSerializer(serializers.ModelSerializer):  # Our user serializer, as well as converting our user objects to and from JSON we use a custom validate method inside here to check that the pasword and confirmation match when a User tries to sign up
    password = serializers.CharField(write_only=True) # the write only parts on these fields ensure our password and confirmation will never be sent out wiht he profile or login views.
    password_confirmation = serializers.CharField(write_only=True)
  
    def validate(self, data): 
        password = data.pop('password')  
        password_confirmation = data.pop(
            'password_confirmation')  
        if password != password_confirmation:  
            raise ValidationError({'password_confirmation': 'does not match'})
        try:  
            validations.validate_password(password=password)
        except ValidationError as err:  
            raise serializers.ValidationError({'password': err.messages})
        data['password'] = make_password(password)
        return data
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password',
                  'password_confirmation', 'profile_image', 'bio', 'posts', 'chats')
        extra_kwargs = {'posts': {'required': False},
                        'chats': {'required': False}}


class PopulatedUserSerializer(UserSerializer):
    post = PopulatedPostSerializer(
        source='posts', read_only=True, many=True)


    class Meta(UserSerializer.Meta):
        fields = ('id', 'username', 'profile_image', 'email', 'bio', 'post')
    
    
    
    
