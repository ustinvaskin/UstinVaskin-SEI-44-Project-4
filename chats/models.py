# pylint: disable=no-member
# importing the model module from django so we can create model classes
from django.utils import timezone
from django.db import models
# importing our user model through the get_user_model method. Again this is project specific, in this case I'vwe imported the user so I can attach it an an Owner field on a post and a comment, If you did not want/need to attach the creating user to your resource, would would not do this.
from django.contrib.auth import get_user_model
User = get_user_model()  # using that get user model function.


class Chat(models.Model):
    # Basic text field, setting fields on models is very similar to what we have done before.
    content = models.CharField(max_length=500)
    # Biggest dofference is that in Django, fields are required by default, we must specifiy if we dont wnat them to be with either blank=True or null=True
    image = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(  # Attaching the owner to the model, this is makiing a one to many forgeign key realtionship to the user table. A user can have many posts but a post may only have one user. That is why the user id is stored here in the post model
        User,  # the model to use to make relationship
        related_name='chats',  # optional, this is the name the field will get on the corresponing model if you would like to show it. For example you may want to have a route that returns a Users profile information, including the posts they have made. That field on User, must be called 'posts' as that is what it has been set as here on the related name
        on_delete=models.CASCADE  # what to do if the relation is delete. In this case, if the user deletes their account, we want to delete all the posts associatd with thmm too
    )
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
       # str mthod for our class simply makes the name more readable in the django admin panel
        # with make it appear as post id and post owners name in admin. Again this is case specific
        return f'Chat {self.id} - {self.owner}'


class Message(models.Model):  # Our comment model for commenting on Posts
    # really just has one text field for the suer, 'text', the rest we get from the token/url when trying to create one.
    text = models.CharField(max_length=300)
    owner = models.ForeignKey(  # One to many relationship with User, A user can have many messages, a comment can only be made by one User
        User,
        related_name='messages',  # same as above model for related name
        # we would delete the comment if the user deleted their account
        on_delete=models.CASCADE
    )
    chat = models.ForeignKey(  # One to many with Posts as well, A Post can have many messages, but a comment can only belong to one Post
        Chat,
        related_name='messages',  # So we can see the messages on a post.
        on_delete=models.CASCADE,  # we would delete the comment if to post was deleted
        blank=True,
        null=True
    )

    def __str__(self):
        return f'{self.text} - {self.owner}'
