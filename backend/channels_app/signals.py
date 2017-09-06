from django.contrib.auth import get_user_model, user_logged_in, user_logged_out
from django.dispatch import receiver

User = get_user_model()

@receiver(user_logged_in)
def on_user_login(sender, user, **kwargs):
    user.is_logged_in = True
    user.save()


@receiver(user_logged_out)
def on_user_logout(sender, user, **kwargs):
    user.is_logged_in = False
    user.save()
