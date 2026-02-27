from django.db import models


class User(models.Model):

    email=models.EmailField(unique=True)

    create_at=models.DateTimeField(
        auto_now_add=True
    )
    update_at=models.DateTimeField(auto_now=True)
    is_verified=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
