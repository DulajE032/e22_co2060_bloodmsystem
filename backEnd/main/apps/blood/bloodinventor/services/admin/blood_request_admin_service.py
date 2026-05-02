from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.medicalOfficers.models.hospitalStaff import StaffProfile
from ...models.bloodRequest import BloodRequest
from ...permissions.inventory_permissions import IsAdminRole
from rest_framework import serializers


class AdminBloodRequestSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)
    hospital = serializers.CharField(source='doctor.hospital', read_only=True)

    class Meta:
        model = BloodRequest
        fields = '__all__'
        read_only_fields = ('doctor', 'created_at', 'updated_at')


class AdminBloodRequestListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsAdminRole]
    serializer_class = AdminBloodRequestSerializer

    def get_queryset(self):
        return BloodRequest.objects.all().order_by('-created_at')


@api_view(["PATCH"])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_review_blood_request(request, id):
    try:
        obj = BloodRequest.objects.get(id=id)
    except BloodRequest.DoesNotExist:
        return Response({"error": "Request not found"}, status=status.HTTP_404_NOT_FOUND)

    req_status = request.data.get('status')
    if req_status not in dict(BloodRequest.Status.choices):
        return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

    obj.status = req_status
    
    # Try to get StaffProfile for approved_by
    try:
        staff_profile = StaffProfile.objects.get(user=request.user)
        obj.approved_by = staff_profile
    except StaffProfile.DoesNotExist:
        pass # If admin doesn't have a staff profile, leave it empty or handle it

    if req_status == 'REJECTED':
        obj.rejection_note = request.data.get('rejection_note', '')
    elif req_status == 'APPROVED':
        obj.approval_note = request.data.get('approval_note', '')
        obj.units_approved = request.data.get('units_approved', 0)

    obj.save(update_fields=['status', 'approved_by', 'rejection_note', 'approval_note', 'units_approved', 'updated_at'])

    serializer = AdminBloodRequestSerializer(obj)
    return Response(serializer.data, status=status.HTTP_200_OK)
