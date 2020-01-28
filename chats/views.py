from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from .models import Chat, Message
from .serializers import PopulatedChatSerializer, PopulatedMessageSerializer, ChatSerializer, MessageSerializer

class ChatListView(APIView):  
    def get(self, _request):  
        chats = Chat.objects.all()  
        serialized_chats = PopulatedChatSerializer(chats, many=True)
        return Response(serialized_chats.data)

    def post(self, request):
        request.data['owner'] = request.user.id
        chat = ChatSerializer(data=request.data)
        if chat.is_valid():  
            chat.save()  
            return Response(chat.data, status=HTTP_201_CREATED)
        return Response(chat.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)



class ChatDetailView(APIView):  
    permission_classes = (IsAuthenticated, )

    def get(self, _request, pk):
        chat = Chat.objects.get(pk=pk)
        serialized_chat = PopulatedChatSerializer(chat)
        return Response(serialized_chat.data)  

    def put(self, request, pk):
        request.data['owner'] = request.user.id
        chat = Chat.objects.get(pk=pk)
        if chat.owner.id != request.user.id:  
            return Response(status=HTTP_401_UNAUTHORIZED)
        updated_chat = ChatSerializer(chat, data=request.data)
        if updated_chat.is_valid():  
            updated_chat.save()  
            return Response(updated_chat.data)  
        return Response(updated_chat.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):  
        chat = Chat.objects.get(pk=pk)  
        if chat.owner.id != request.user.id:  
            return Response(status=HTTP_401_UNAUTHORIZED)
        chat.delete()  
        return Response(status=HTTP_204_NO_CONTENT)



class MessageListView(APIView):  
    permission_classes = (IsAuthenticated, )

    def get(self, _request, pk):
        message = Message.objects.get(pk=pk)
        serialized_message = PopulatedMessageSerializer(message)
        return Response(serialized_message.data)

    def post(self, request, pk):  
        request.data['owner'] = request.user.id
        request.data['chat'] = pk  
        message = MessageSerializer(data=request.data)  
        if message.is_valid():  
            message.save()  
            chat = Chat.objects.get(pk=pk)
            serialized_chat = PopulatedChatSerializer(
                chat)  
            return Response(serialized_chat.data)
        return Response(message.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class MessageDetailView(APIView):
    permission_classes = (IsAuthenticated, )
 
    def delete(self, request, message_pk, **kwargs):
        message = Message.objects.get(pk=message_pk)
        if message.owner.id != request.user.id:  
            return Response(status=HTTP_401_UNAUTHORIZED)
        message.delete()  
        return Response(status=HTTP_204_NO_CONTENT)
