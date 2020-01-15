# pylint: disable = no-member
# DRFs generic api view, we then right our own post methods for both a login adn register view
from rest_framework.views import APIView
from rest_framework.response import Response  # to send json responses
# some errors, to send when people send the wrong credentials
from rest_framework.exceptions import PermissionDenied
# our is authenticated permission, using this on the PROFILE ROUTE ONLY, if you are not doing that you do not need this
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED

# To get the user model with our custom fields
from django.contrib.auth import get_user_model
# to get our randomly generated secret key from 'project/settings.py'. Going to use this to encode our jwt tokens
from django.conf import settings
import jwt  # the jwt token library for python, 'pipenv install pyjwt', so we can generate a token to send back on login
# user serializer, used to make users on register, and send users as json for profile route
from .serializers import UserSerializer, PopulatedUserSerializer
# invoking the get user model function to get a user model instance
User = get_user_model()

# The views here our very similar to how we did it in Class, but I have added a profile route for getting a user profile


# the register route, only has one method, post, as that is all you cna do with register.
class RegisterView(APIView):

    def post(self, request):  # post method handler '/register'
        # send the data provided in the request to the user seraliser
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():  # see if it creates a user, so does it have all the correct and required fields
            serializer.save()  # if it does save it
            # and send a message back of registration successful
            return Response({'message': 'Registration Successful'})
        # otherwise, if the data was wrong, send back the errors
        return Response(serializer.errors, status=422)


class LoginView(APIView):  # login view, only has a post method for a request too, also made a custom get user, to check if they user trying to login in exists

    def get_user(self, email):  # passing the user attempting to login in the email we have been sent, but this could be by an field, such as username
        try:
            # trying to find the user id by the supllied email, retuning it if found
            return User.objects.get(email=email)
        except User.DoesNotExist:
            # if not found, send a permission denied response and dont send back a token.
            raise PermissionDenied({'message': 'Invalid Credentilais'})

    def post(self, request):  # post request for '/login', user provides credentials in JSON format of email and password. If they are correct with will return a JSON webtoken so they can then make authenticated requests to our protected routes. If not we will send back permission denied

        # getting the email sent in the request
        email = request.data.get('email')
        password = request.data.get('password')  # and the password

        # trying to find the user using our method directly above.
        user = self.get_user(email)

        # assuming the user was found, checking that the password is correct for that user
        if not user.check_password(password):
            # if it isnt correct, send back invalid credentials message, dont send a token
            raise PermissionDenied({'message': 'Invalid Credentails'})

        # If password was correct, we generate a token with the users id, our random secret and the standard jwt algorithim to encode it.
        token = jwt.encode(
            {'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')

        # send back that token with a welcome message, concatenting in the username to makle it feel personalised.
        return Response({'token': token, 'message': f'Welcome back {user.username}'})


class ProfileView(APIView):  # one route GET '/profile'

    # permission_classes = (IsAuthenticated, ) # profile route requires a user to be signed in, otherwise we would not know which users profile to get. We work out who they are from the token send with the request for the profile

    def get(self, request):  # get method to return the user object
        # find the user by their id(primary key, pk). We get the user from the request.user.id. This is set in 'jwt/authentication.py' and is worked out by decoding the jwt token send with the request
        user = User.objects.get(pk=request.user.id)
        # running that found user through the serialiser to turn it into JSON
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data)  # sending that JSON data


# Our List view methods, GET and POST, we have to define these ourselves when just using DRF APIView, url would be just '/posts'
class ProfileListView(APIView):

    # permission_classes = (IsAuthenticated, ) # is a built in Django permission, means all actions require a token passed, again, this is use case specific

    def get(self, _request):  # as stated just a GET (index) for this view
        users = User.objects.all()  # get  all the categories
        serialized_users = PopulatedUserSerializer(
            users, many=True)  # serialize them
        # send them back to the client
        return Response(serialized_users.data)


class ProfileDetailListView(APIView):

    # permission_classes = (IsAuthenticated, )

   # GET method for 'posts/id' this is our show route, getting one post.
    def get(self, _request, pk):
        # ffind the post though its primary key, this is passed from the url in the request, see 'posts/urls.py' for more
        user = User.objects.get(pk=pk)
        # run the found post through the serializer to turn it to json
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data)  # send that json back to client

    # permission_classes = (IsAuthenticated, )

    def put(self, request, pk):
        # since all the information must be present for a put request, we have to attach the user as the owner
        request.data['user'] = request.user.id
        # finding the post we want to update by its primary key (if from the URL)
        user = User.objects.get(pk=pk)
        if user.id != request.user.id:  # quick check to see if the user making the request is the same user who created the post, if not don't allow updates
            return Response(status=HTTP_401_UNAUTHORIZED)
        # we run that post through the seraliser, with the data from the reuqet(the fields to change), this merges the changes in and validates them for us
        updated_user = UserSerializer(user, data=request.data)
        if updated_user.is_valid():  # again we check to see if that updated version is valid (ie follows all the rules of the model, what is/isnt required)
            updated_user.save()  # save that updated post if it was valid
            return Response(updated_user.data)  # and send it back to client
        # if it wasnt valid , send back the errors in response with a 422 status
        return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
       # And our delete method for 'posts/id', deleting one post
        request.data['user'] = request.user.id
        user = User.objects.get(pk=pk)
        if user.id != request.user.id:  # quick check to see if the user making the request if the same user who created the post, if not don't allow deletes
            return Response(status=HTTP_401_UNAUTHORIZED)
        user.delete()  # call the inbuilt delete method on it
        # send a 204 no content response to the client to show it has been deleted
        return Response(status=HTTP_204_NO_CONTENT)
