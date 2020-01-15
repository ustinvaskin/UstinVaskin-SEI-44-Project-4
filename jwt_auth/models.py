from django.db import models  # normal model import from django
# This allows us to extend the default user model given to us by Django
from django.contrib.auth.models import AbstractUser

# from posts.models import Post


class User(AbstractUser):

    #  overwriting the already exisiting email method, to make it required and need tobe unique
    email = models.CharField(max_length=50, unique=True)
    profile_image = models.CharField(max_length=500, blank=True)
    # post = models.ManyToManyField(Post, blank=True)
    bio = models.CharField(max_length=250, blank=True)
