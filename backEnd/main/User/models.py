from django.db import models


class Status(models.TextChoices):
    ADMIN="admin",
    STAFF='staff',
    NORMAL_USER="user"
class User(models.Model):

    email=models.EmailField(unique=True)
    role=models.CharField(
        max_length=3,
        choices=Status.choices,
        default=Status.NORMAL_USER
    )
    create_at=models.DateTimeField(
        auto_now_add=True
    )
    update_at=models.DateTimeField(auto_now=True)
    is_verified=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)