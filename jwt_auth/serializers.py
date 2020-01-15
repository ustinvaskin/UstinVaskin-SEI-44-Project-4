# pylint: disable = no-member, arguments-differ
# importing the serlaizers funcionality from django rest framework
from rest_framework import serializers
from django.contrib.auth import get_user_model  # method to get the user model
# this is a built in part of django we can use to validate passwords out of the box
import django.contrib.auth.password_validation as validations
# built in part of django we can use to hash our passwords
from django.contrib.auth.hashers import make_password
# and error we can use if password and confirmation dont mate
from django.core.exceptions import ValidationError
from django.apps import apps  # this is the method used to import a model from another app. We can not always import it directly, as this creates what is called a circular import which can cause issues, to many things being imported all over the place. This is safer method to do it
# invoking get user model to get our custom User model instance.
from posts.serializers import PopulatedPostSerializer
User = get_user_model()
# importing the Post model to create a post searlizer here. Importing the exisiting one from the posts project would again cause circular import issues.
Post = apps.get_model('posts', 'Post')

Chat = apps.get_model('chats', 'Chat')


# We make this quick little serializer to populate a posts field on our user. This gives the nice functionality on the profile route that return our user object, along with all the posts they've made
class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'content', 'image')


class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ('id', 'content', 'image')


# Our user serializer, as well as converting our user objects to and from JSON we use a custom validate method inside here to check that the pasword and confirmation match when a User tries to sign up
class UserSerializer(serializers.ModelSerializer):

    # the write only parts on these fields ensure our password and confirmation will never be sent out wiht he profile or login views.
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    # registering the post serializer so we can show a nested list of populated posts.

    def validate(self, data):  # the validate method user on our passwords to see if they match

        password = data.pop('password')  # get the password from the request
        password_confirmation = data.pop(
            'password_confirmation')  # and the confirmtion fields

        if password != password_confirmation:  # If they don't match, we send back an error to the client
            raise ValidationError({'password_confirmation': 'does not match'})

        try:  # This uses the inbuilt django password validator, checks length and commonality.
            validations.validate_password(password=password)
        except ValidationError as err:  # if it doesnt pass, we send back the errors
            raise serializers.ValidationError({'password': err.messages})

        # IF all was good, we hash the password with the inbuilt make_password function
        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        # the fields for our user model, password amnd password confirmation are included as they need to be there when we create a user, but they are never sent in a request for one. Note we also include the posts field to show the users posts.
        fields = ('id', 'username', 'email', 'password',
                  'password_confirmation', 'profile_image', 'bio', 'posts', 'chats')
        # this lines tell the serializer that sometimes, posts wont be there, and thats fine. This is important otherwise when we create a user. it would say we need to make posts along with it. Again this is a USE CASE idea. Maybe you have a nested field that you would want to be required on creation. This just doesn't make sense for comments. we would want to make a post, and then allow users to make comments on that post

        extra_kwargs = {'posts': {'required': False},
                        'chats': {'required': False}}


class PopulatedUserSerializer(UserSerializer):

    # any user on the post will be seralized and nested(like .populate() in mongoose)
    post = PopulatedPostSerializer(
        source='posts', read_only=True, many=True)

    class Meta(UserSerializer.Meta):
        fields = ('id', 'username', 'profile_image', 'email', 'bio', 'post')
    # same with comments, but in this case, we let the serializer know there will be a list of comments to seralize not just one.
    # comments = PopulatedCommentSerializer(many=True)
    # # and adding out cxategory serliazer
    # categories = CategorySerializer(many=True)
