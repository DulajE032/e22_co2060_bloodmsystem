from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ...models.doctor import Doctor
from ...models.doctor_message import DoctorMessage
from ...serializers.doctor_serializers import DoctorSerializer

User = get_user_model()

class DoctorViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Doctor operations
    Provides CRUD operations and custom actions for doctor management
    """

    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated] # Or IsAdminUser depending on needs

    def get_queryset(self):
        """
        Filter doctors based on query parameters
        Supports search by ID, name, or email
        """
        queryset = Doctor.objects.all()
        search_term = self.request.query_params.get('search', None)

        if search_term:
            queryset = queryset.filter(
                Q(id__icontains=search_term) |
                Q(full_name__icontains=search_term) |
                Q(email__icontains=search_term)
            )

        return queryset

    # Custom actions to match frontend expectations if needed,
    # but ModelViewSet already provides list, create, retrieve, update, destroy.

    @action(detail=True, methods=['post'], url_path='create-credentials')
    def create_credentials(self, request, pk=None):
        doctor = self.get_object()
        password = request.data.get('password')

        if not password:
            return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create or get User account
            user, created = User.objects.get_or_create(
                email=doctor.email,
                defaults={
                    'username': doctor.username, # Use doctor's username
                    'role': User.DOCTOR
                }
            )

            user.set_password(password)
            user.save()

            doctor.user = user
            doctor.credentials_created = True
            doctor.save()

            return Response({
                'username': doctor.username,
                'message': 'Credentials created successfully',
                'credentials_created': True
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='reset-password')
    def reset_password(self, request, pk=None):
        doctor = self.get_object()
        new_password = request.data.get('new_password')

        if not new_password:
            return Response({'error': 'New password is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not doctor.user:
            return Response({'error': 'Doctor has no user account'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            doctor.user.set_password(new_password)
            doctor.user.save()
            return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='send-message')
    def send_message(self, request, pk=None):
        doctor = self.get_object()
        subject = request.data.get('subject')
        message = request.data.get('message')

        if not subject or not message:
            return Response({'error': 'Subject and message are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            DoctorMessage.objects.create(
                doctor=doctor,
                sent_by=request.user,
                subject=subject,
                message=message
            )
            return Response({'status': 'sent'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='stats')
    def stats(self, request):
        total = Doctor.objects.count()
        active = Doctor.objects.filter(is_active=True).count()
        inactive = Doctor.objects.filter(is_active=False).count()
        return Response({
            'total_doctors': total,
            'active_doctors': active,
            'inactive_doctors': inactive
        }, status=status.HTTP_200_OK)
