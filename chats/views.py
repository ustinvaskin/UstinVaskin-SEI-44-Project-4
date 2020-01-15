# pylint: disable=no-member
# response function from DRF so we can send JSON responses
from rest_framework.response import Response
# instead of using the generic views from DRF, I'm using the basic API view, all though this means more work in writing out the controllers(remember in Django view = controlller from express, where the logic happens) it means more control over the functionality. Again this is a decision to make based on use case for YOUR app.
from rest_framework.views import APIView
# our IsAuthenticated permission import, there are a few different options here
from rest_framework.permissions import IsAuthenticated
# importing some custom response status codes from django
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from .models import Chat, Message
# And our serialisers
from .serializers import PopulatedChatSerializer, PopulatedMessageSerializer, ChatSerializer, MessageSerializer


class ChatListView(APIView):  # Our List view methods, GET and POST, we have to define these ourselves when just using DRF APIView, url would be just '/chats'

    # permission_classes = (IsAuthenticated, ) # is a built in Django permission, means all actions require a token passed, again, this is use case specific

    def get(self, _request):  # method to handle GET requests to the list view, the INDEX
        chats = Chat.objects.all()  # get all the chats from the DB
        # serialise those chats into JSON, letting it know to expect a list of chats as this is an INDEX route!!!!!
        serialized_chats = PopulatedChatSerializer(chats, many=True)
        # send that serialised list of chats back as the response to the client
        return Response(serialized_chats.data)

    # Note - don't get confused here by the fact the method is called chat and we are creating chats. The method name refers to HTTP verd POST, which is what we use to send a create request, our other chat, is because tht is the name of the chat resource of our blog app
    # method to handle POST requests to create a new chat.
    def post(self, request):
        # attach the owner id to the chat, we get this from the authentication class, our user it attached as request.user
        request.data['owner'] = request.user.id
        # we pass the data we have been send with the request(the json body of the POST request to '/chats', which should contain a valid object with all the correct fields)
        chat = ChatSerializer(data=request.data)
        if chat.is_valid():  # we can then use this in built is valid function, to see if your request data was right, and included everything it needed to
            chat.save()  # If is valid comes back as true, we save the chat. This creates it in the database
            # we then send back the newly created chat in the response to client, the data object of the chat is the JSON data
            return Response(chat.data, status=HTTP_201_CREATED)
        # if the chat is not valid, we send the chat with its errors object, this contains information about what fields would of been missing/have mistakes in them alone with a 422 sttus code
        return Response(chat.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class ChatDetailView(APIView):  # Our chat details view handles all methods that our about a specific chat, not the whole collection. So the url for these methods would be 'chats/id'

    # again using the same permission classes, so all routes must be authenticated with a token
    permission_classes = (IsAuthenticated, )

    # GET method for 'chats/id' this is our show route, getting one chat.
    def get(self, _request, pk):
        # ffind the chat though its primary key, this is passed from the url in the request, see 'chats/urls.py' for more
        chat = Chat.objects.get(pk=pk)
        # run the found chat through the serializer to turn it to json
        serialized_chat = PopulatedChatSerializer(chat)
        return Response(serialized_chat.data)  # send that json back to client

    def put(self, request, pk):
        # since all the information must be present for a put request, we have to attach the user as the owner
        request.data['owner'] = request.user.id
        # finding the chat we want to update by its primary key (if from the URL)
        chat = Chat.objects.get(pk=pk)
        if chat.owner.id != request.user.id:  # quick check to see if the user making the request is the same user who created the chat, if not don't allow updates
            return Response(status=HTTP_401_UNAUTHORIZED)
        # we run that chat through the seraliser, with the data from the reuqet(the fields to change), this merges the changes in and validates them for us
        updated_chat = ChatSerializer(chat, data=request.data)
        if updated_chat.is_valid():  # again we check to see if that updated version is valid (ie follows all the rules of the model, what is/isnt required)
            updated_chat.save()  # save that updated chat if it was valid
            return Response(updated_chat.data)  # and send it back to client
        # if it wasnt valid , send back the errors in response with a 422 status
        return Response(updated_chat.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):  # And our delete method for 'chats/id', deleting one chat
        chat = Chat.objects.get(pk=pk)  # find the chat to delete
        if chat.owner.id != request.user.id:  # quick check to see if the user making the request if the same user who created the chat, if not don't allow deletes
            return Response(status=HTTP_401_UNAUTHORIZED)
        chat.delete()  # call the inbuilt delete method on it
        # send a 204 no content response to the client to show it has been deleted
        return Response(status=HTTP_204_NO_CONTENT)


class MessageListView(APIView):  # Our messages view methods, I won't be making a get request to all messages, but will have a POST request method, the url for tbhis route will be thje same as messages from our express app. 'chats/:id/messages'. Although this isnt strictly neccesary and we could of not done it, I think this URL pattern looks familiar and explains what we are trying to effect.

    # same permission classes as the rest of our views, must be logged in
    permission_classes = (IsAuthenticated, )

    def get(self, _request, pk):
        # ffind the chat though its primary key, this is passed from the url in the request, see 'chats/urls.py' for more

        message = Message.objects.get(pk=pk)
        # run the found chat through the serializer to turn it to json
        serialized_message = PopulatedMessageSerializer(message)
        # send that json back to client
        return Response(serialized_message.data)

    def post(self, request, pk):  # chat request method to create a new message
        # attach the current user from the token to the message
        request.data['owner'] = request.user.id
        request.data['chat'] = pk  # attach the chat id from the url to message
        message = MessageSerializer(data=request.data)  # seralize the message
        if message.is_valid():  # if the message is valid
            message.save()  # save the message
            # find the chat attributed to the message
            chat = Chat.objects.get(pk=pk)
            serialized_chat = PopulatedChatSerializer(
                chat)  # serialise that chat
            # send back the chat with the new message attached
            return Response(serialized_chat.data)
        # send back any errors from the message if it wasnt valid
        return Response(message.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class MessageDetailView(APIView):

    permission_classes = (IsAuthenticated, )

    # The URL for this view is to 'api/chats/chat_id/messages/message_id', the message id is passed as a named argument
    # we can ignore the message and chat id here,
    def delete(self, request, message_pk, **kwargs):
        # find the message by its id
        message = Message.objects.get(pk=message_pk)
        if message.owner.id != request.user.id:  # check if the request came from the message owner
            # if not the message owner send back unauthorized
            return Response(status=HTTP_401_UNAUTHORIZED)
        message.delete()  # delete it
        # send back no content response to the client
        return Response(status=HTTP_204_NO_CONTENT)
