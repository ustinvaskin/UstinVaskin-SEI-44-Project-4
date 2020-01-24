!['Sign-Up-Flow'](https://i.imgur.com/Ur5P2xx.png )

### Deployed project here: 
https://qbloggen.herokuapp.com/#/

### Final Product: 

!['Prewiew'](https://i.imgur.com/yEqP0vH.png)
---


# Start: 
# Installation
    Clone or download the repo
    Run 'pipenv shell' in the CLI
    Run 'pip3 install django'
    Run 'yarn serve:backend ', 'arn serve:frontend' in the CLI
    
---
## Timeframe
7 days | Individual Project 

---

### Overview 

######  Q Gen is a Social Network platform where users can publish, discuss and share ideas, make friends and create chats. A CRUD application built with ReactJS on the Front-End and Python and Django on the Back-End, using SQL database and Django REST framework. 

### Technologies used:
Adobe Illustrator, API, axios, Bulma, CSS, Git, Github, Node.js, Django, Python, React, SCSS, UX, Webpack 

---
### File Structure: 

```
├── Pipfile
├── Pipfile.lock
├── README.md
├── Screenshot\ 2020-01-10\ at\ 19.48.33.png
├── Screenshot\ 2020-01-10\ at\ 19.49.35.png
├── chats
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-37.pyc
│   │   ├── admin.cpython-37.pyc
│   │   ├── models.cpython-37.pyc
│   │   ├── serializers.cpython-37.pyc
│   │   ├── urls.cpython-37.pyc
│   │   └── views.cpython-37.pyc
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   ├── 0001_initial.py
│   │   ├── 0002_auto_20200114_1738.py
│   │   ├── __init__.py
│   │   └── __pycache__
│   │       ├── 0001_initial.cpython-37.pyc
│   │       ├── 0002_auto_20200114_1738.cpython-37.pyc
│   │       ├── 0002_comment.cpython-37.pyc
│   │       ├── 0003_auto_20191118_0931.cpython-37.pyc
│   │       ├── 0004_post_created_at.cpython-37.pyc
│   │       ├── 0005_auto_20200111_0049.cpython-37.pyc
│   │       ├── 0006_auto_20200113_1615.cpython-37.pyc
│   │       ├── 0007_auto_20200114_1345.cpython-37.pyc
│   │       └── __init__.cpython-37.pyc
│   ├── models.py
│   ├── posts.json
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── frontend
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-37.pyc
│   │   ├── urls.cpython-37.pyc
│   │   └── views.cpython-37.pyc
│   ├── apps.py
│   ├── dist
│   │   ├── bundle.js
│   │   ├── bundle.js.map
│   │   └── index.html
│   ├── src
│   │   ├── app.js
│   │   ├── components
│   │   │   ├── auth
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── chats
│   │   │   │   ├── Card.js
│   │   │   │   ├── ChatShow.js
│   │   │   │   ├── Form.js
│   │   │   │   ├── MainChat.js
│   │   │   │   ├── NewChat.js
│   │   │   │   └── createChat.js
│   │   │   ├── common
│   │   │   │   ├── Feed.js
│   │   │   │   ├── FlashMessages.js
│   │   │   │   ├── Home.js
│   │   │   │   ├── Loading.js
│   │   │   │   ├── Main.js
│   │   │   │   ├── Navbar.js
│   │   │   │   ├── SecureRoute.js
│   │   │   │   ├── SideBarNav.js
│   │   │   │   └── Team.js
│   │   │   ├── posts
│   │   │   │   ├── Card.js
│   │   │   │   ├── CardSimular.js
│   │   │   │   ├── Edit.js
│   │   │   │   ├── Form.js
│   │   │   │   ├── FormEdit.js
│   │   │   │   ├── NewPost.js
│   │   │   │   └── Show.js
│   │   │   └── users
│   │   │       ├── Edit.js
│   │   │       └── Show.js
│   │   ├── index.html
│   │   ├── lib
│   │   │   ├── Auth.js
│   │   │   ├── Flash.js
│   │   │   └── genres.js
│   │   └── style.scss
│   ├── urls.py
│   └── views.py
├── jwt_auth
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-37.pyc
│   │   ├── admin.cpython-37.pyc
│   │   ├── authentication.cpython-37.pyc
│   │   ├── models.cpython-37.pyc
│   │   ├── serializers.cpython-37.pyc
│   │   ├── urls.cpython-37.pyc
│   │   └── views.cpython-37.pyc
│   ├── admin.py
│   ├── apps.py
│   ├── authentication.py
│   ├── migrations
│   │   ├── 0001_initial.py
│   │   ├── __init__.py
│   │   └── __pycache__
│   │       ├── 0001_initial.cpython-37.pyc
│   │       ├── 0002_auto_20191113_1343.cpython-37.pyc
│   │       ├── 0003_auto_20191118_0931.cpython-37.pyc
│   │       ├── 0004_auto_20200111_0049.cpython-37.pyc
│   │       └── __init__.cpython-37.pyc
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── manage.py
├── package-lock.json
├── package.json
├── posts
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-37.pyc
│   │   ├── admin.cpython-37.pyc
│   │   ├── models.cpython-37.pyc
│   │   ├── serializers.cpython-37.pyc
│   │   ├── urls.cpython-37.pyc
│   │   └── views.cpython-37.pyc
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   ├── 0001_initial.py
│   │   ├── 0002_comment.py
│   │   ├── 0003_auto_20191118_0931.py
│   │   ├── 0004_post_created_at.py
│   │   ├── 0005_auto_20200111_0049.py
│   │   ├── 0006_auto_20200113_1615.py
│   │   ├── 0007_auto_20200114_1345.py
│   │   ├── __init__.py
│   │   └── __pycache__
│   │       ├── 0001_initial.cpython-37.pyc
│   │       ├── 0002_comment.cpython-37.pyc
│   │       ├── 0003_auto_20191118_0931.cpython-37.pyc
│   │       ├── 0004_post_created_at.cpython-37.pyc
│   │       ├── 0005_auto_20200111_0049.cpython-37.pyc
│   │       ├── 0006_auto_20200113_1615.cpython-37.pyc
│   │       ├── 0007_auto_20200114_1345.cpython-37.pyc
│   │       └── __init__.cpython-37.pyc
│   ├── models.py
│   ├── posts.json
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── project
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-37.pyc
│   │   ├── settings.cpython-37.pyc
│   │   ├── urls.cpython-37.pyc
│   │   └── wsgi.cpython-37.pyc
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── requirements.txt
└── webpack.config.js
```



--- 
### Back End:

##### User Model: 
```
from django.db import models  
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    profile_image = models.CharField(max_length=500, blank=True)
    bio = models.CharField(max_length=250, blank=True)

```

##### Posts Models 

```

from django.utils import timezone
from django.db import models

from django.contrib.auth import get_user_model
User = get_user_model()  



class Category(models.Model):
    name = models.CharField(max_length=50)  

    def __str__(self):
        return self.name


class Post(models.Model):
    
    content = models.CharField(max_length=500)
    
    image = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(  
        User,  
        related_name='posts',  
        on_delete=models.CASCADE  
    )
    created_at = models.DateField(auto_now_add=True)

    categories = models.ManyToManyField(  
        Category,
        
        related_name='posts',
        blank=True
    )

    def __str__(self):
       
        
        return f'Post {self.id} - {self.owner}'


class Comment(models.Model):  
    
    text = models.CharField(max_length=300)
    owner = models.ForeignKey(  
        User,
        related_name='comments',  
        
        on_delete=models.CASCADE
    )
    post = models.ForeignKey(  
        Post,
        related_name='comments',  
        on_delete=models.CASCADE,  
        blank=True,
        null=True
    )

    def __str__(self):
        return f'{self.text} - {self.owner}'

```


##### Chats Models: 
```


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

```

## API Endpoint Documentation

#### Chats: 
path('chats/', ChatListView.as_view()): GET, POST 
path('chats/<int:pk>/', ChatDetailView.as_view()): GET, PUT, DELETE
path('chats/<int:pk>/messages/', MessageListView.as_view()): GET, POST 
path('chats/<int:pk>/messages/<int:message_pk>/': DELETE

#### Posts: 
path('posts/', PostListView.as_view()): GET, POST 
path('posts/<int:pk>/', PostDetailView.as_view()): GET, PUT, DELETE
path('posts/<int:pk>/comments/', CommentListView.as_view()): GET, POST 
path('posts/<int:pk>/comments/<int:comment_pk>/', CommentDetailView.as_view()): DELETE
path('categories/', CategoryListView.as_view()): GET

#### Auth: 
path('register/', RegisterView.as_view()): POST
path('login/', LoginView.as_view()): POST
path('profile/', ProfileView.as_view()):  GET 
path('profile-all/', ProfileListView.as_view()): GET
path('profile-all/<int:pk>/', ProfileDetailListV iew.as_view()): GET, PUT, DELETE

---
### Wireframes:
!['Wireframes']()

---

### Comments and Messages 

I added a Bulma media object. I then attached an event listener to push the content to the book comment property via our commentCreate route before displaying it on the page. I also attached a `commentDelete` event listener to the cross icon. Inside this handler I wrote an `'if statement'` to ensure that users could only delete their own comments and not those of other users. Finally I added a reload method, so that the new comments would display on the page after the user posted a comment.

---

### User Register / Login

In the right hand side of the screen there is a register button, which redirects to the register page. Once the user has entered in a username, email, password and password confirmation, the user will be redirected to the login page, where they will be prompted to log in.

---

### User Profile page / Edit

After log in has been completed with the correct credentials, the user gets redirected to the feed page so they can further browse the posts and create their own. 

---


# Modifications:

##### Moving forward with this project I would like to implement more features and fix few bugs: 
Fix authorization and POST for messages, Responsive Design, Password reset. 



