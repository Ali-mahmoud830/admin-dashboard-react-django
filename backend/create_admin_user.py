import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

username = 'admin'
email = 'admin@example.com'
password = 'adminpassword123'

try:
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username=username, email=email, password=password)
        print(f"SUCCESS: Superuser created.\nUsername: {username}\nEmail: {email}\nPassword: {password}")
    else:
        print(f"INFO: Superuser '{username}' already exists.")
except Exception as e:
    print(f"ERROR: {e}")
