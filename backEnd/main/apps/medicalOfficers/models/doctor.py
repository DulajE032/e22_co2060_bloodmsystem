from django.conf import settings
from django.db import models


class Doctor(models.Model):
    """Doctor Profile Model"""

    # Authentication
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='doctor_profile'
    )

    # Basic Information
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)

    # Professional Information
    specialization = models.CharField(max_length=100)
    license_number = models.CharField(max_length=100, unique=True)
    hospital = models.CharField(max_length=255, blank=True, null=True)

    # System Status
    is_active = models.BooleanField(default=True)
    credentials_created = models.BooleanField(default=False)
    profilePhoto = models.ImageField(upload_to="doctor_profiles/", blank=True, null=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Doctor'
        verbose_name_plural = 'Doctors'

    def __str__(self):
        return self.full_name

# Alias for backward compatibility
DoctorProfile = Doctor
