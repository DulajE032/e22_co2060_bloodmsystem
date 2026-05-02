from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .....medicalOfficers.models.doctor import Doctor
from ...models.bloodRequest import BloodRequest

class BloodRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = '__all__'
        read_only_fields = ('doctor', 'status', 'verified_by', 'approved_by', 'verification_note', 'approval_note', 'rejection_note', 'units_approved')

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def doctor_blood_requests(request):
    try:
        doctor = Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        return Response({"error": "You are not registered as a doctor."}, status=403)

    if request.method == 'GET':
        requests = BloodRequest.objects.filter(doctor=doctor).order_by('-created_at')
        serializer = BloodRequestSerializer(requests, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BloodRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(doctor=doctor)

            # If priority is HIGH or CRITICAL, we can trigger the donor alert service here.
            priority = serializer.validated_data.get('priority_level', 'NORMAL')
            if priority in ['HIGH', 'CRITICAL']:
                # Import and trigger alert service
                from .....donor.services.donor_alert_service import (
                    trigger_emergency_alerts,
                )
                trigger_emergency_alerts(
                    blood_group=serializer.validated_data.get('blood_group'),
                    request_id=serializer.instance.id
                )

            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
