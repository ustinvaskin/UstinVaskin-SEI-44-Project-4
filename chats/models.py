from django.utils import timezone
from django.db import models

from django.contrib.auth import get_user_model
User = get_user_model()  


class Chat(models.Model):
    content = models.CharField(max_length=500)
    image = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(  
        User,  
        related_name='chats',  
        on_delete=models.CASCADE  
    )
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'Chat {self.id} - {self.owner}'



class Message(models.Model):  
    text = models.CharField(max_length=300)
    owner = models.ForeignKey(  
        User,
        related_name='messages',  
        on_delete=models.CASCADE
    )
    chat = models.ForeignKey(  
        Chat,
        related_name='messages',  
        on_delete=models.CASCADE,  
        blank=True,
        null=True
    )
    
    def __str__(self):
        return f'{self.text} - {self.owner}'
