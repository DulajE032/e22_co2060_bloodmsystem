from rest_framework import serializers

from ...models.donorDetails import DonorDetails


class PublicDonorSerializer(serializers.ModelSerializer):
    donor_name = serializers.CharField(source="user.profile.fullName", read_only=True)
    blood_group = serializers.CharField(source="user.profile.blood_group", read_only=True)
    is_eligible = serializers.ReadOnlyField()

    class Meta:
        model = DonorDetails
        fields = [
            "qr_id",
            "donor_name",
            "blood_group",
            "is_available",
            "is_eligible",
            "last_donation_date",
            "total_donations",
            "profile_image",
        ]
