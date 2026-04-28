from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from ..models.donorDetails import DonorDetails
from ..serializers.donorProfile import (
    DonorProfileSerializer,
    DonorProfileUpdateSerializer,
)


class DonorProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return DonorProfileUpdateSerializer
        return DonorProfileSerializer

    def get_object(self):
        if self.request.user.role != "donor":
            raise PermissionDenied("Unauthorized")

        donor_detail, _ = DonorDetails.objects.select_related(
            "user",
            "user__profile",
            "user__profile__country",
            "user__profile__district",
            "user__profile__hospital",
        ).get_or_create(user=self.request.user)
        return donor_detail
