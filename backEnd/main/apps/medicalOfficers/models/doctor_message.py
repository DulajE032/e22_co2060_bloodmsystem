from django.conf import settings
from django.db import models

from .doctor import Doctor


class DoctorMessage(models.Model):
    """Messages sent to doctors by admin"""

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name='messages'
    )
    sent_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='sent_messages'
    )

    subject = models.CharField(max_length=255)
    message = models.TextField()

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Doctor Message'
        verbose_name_plural = 'Doctor Messages'

    def __str__(self):
        return f"{self.subject} - {self.doctor.full_name}"
