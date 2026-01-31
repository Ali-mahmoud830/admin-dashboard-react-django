from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()

class EmailOrUsernameModelBackend(ModelBackend):
    """
    This is a custom authentication backend that allows users to log in
    using either their email address or their username.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        # If the backend is called with 'email' (from SimpleJWT serializer), use it as username
        if username is None:
            username = kwargs.get('email')
        
        if username is None:
            return None

        try:
            # Check if the username matches an email or a username in the DB
            user = User.objects.get(Q(username=username) | Q(email=username))
        except User.DoesNotExist:
            return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
