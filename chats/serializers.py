# importing ability to make serializers from Django Rest Framework. Serailizers our what allow us to convert data coming from our database into JSON that we can then send back in a response to the client. They also handle converting the JSON data we are sent in POST(create) and PUT(update) requests to data than can be saved in our database.
from rest_framework import serializers
# importing our custom User model, we need this to create a UserSerializer which will be used to make sure the owners of our posts and messages are populated so we see the whole user
from django.contrib.auth import get_user_model
# and getting our post and messages models to make serializers for them, adding Category
from .models import Chat, Message
User = get_user_model()  # invoking that get user model function


# This user serializer is used to populate a nested owner on a post or comment
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'profile_image')


# This comment serializer does the same for messages on a post, serializes and populates them, if we didnt do tbhis we would just see a list of comment IDs returned on a post, instead of the full objects in a list.
class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ('id', 'text', 'owner', 'chat')


# We use this on comment population to show the owner as a seraoilized nested field. note how this is inherting directly from the comment serializer above, and there for has all its meta class and feilds infromation automatically added
class PopulatedMessageSerializer(MessageSerializer):

    owner = UserSerializer()  # use the owner serializer on the owner field of messages


class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ('id', 'content', 'image', 'owner', 'created_at',
                  'messages')
        # this lines tell the serializer that sometimes, messages wont be there, and thats fine. This is important otherwise when we create a post. it would say we need to make messages along with it. Again this is a USE CASE idea. Maybe you have a nested field that you would want to be required on creation. This just doesn't make sense for messages. we would want to make a post, and then allow users to make messages on that post
        extra_kwargs = {'messages': {'required': False},
                        'categories': {'required': False}}


# again same idea as with the populated comment serilaizer, it inherits from Chat Serializer and gets all the meta class and fields from that
class PopulatedChatSerializer(ChatSerializer):

    # any user on the post will be seralized and nested(like .populate() in mongoose)
    owner = UserSerializer()
    # same with messages, but in this case, we let the serializer know there will be a list of messages to seralize not just one.
    messages = PopulatedMessageSerializer(many=True)
    # and adding out cxategory serliazer
