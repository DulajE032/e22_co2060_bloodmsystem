from rest_framework import serializers

from ..models.doctor import Doctor
from ..models.doctor_message import DoctorMessage


class DoctorSerializer(serializers.ModelSerializer):
    """Serializer for Doctor model - converts model to JSON"""

    class Meta:
        model = Doctor
        fields = [
            'id',
            'username',
            'email',
            'full_name',
            'phone',
            'specialization',
            'license_number',
            'hospital',
            'is_active',
            'credentials_created',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'id']
        extra_kwargs = {
            'username': {
                'required': True,
                'min_length': 3
            },
            'email': {
                'required': True
            },
            'full_name': {
                'required': True
            },
            'phone': {
                'required': True
            },
            'specialization': {
                'required': True
            }
        }

    def validate_email(self, value):
        """Validate email is unique"""
        if Doctor.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def validate_username(self, value):
        """Validate username is unique"""
        if Doctor.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value


class DoctorMessageSerializer(serializers.ModelSerializer):
    """Serializer for DoctorMessage model"""

    class Meta:
        model = DoctorMessage
        fields = ['id', 'doctor', 'subject', 'message', 'is_read', 'created_at']
        read_only_fields = ['created_at', 'id']
