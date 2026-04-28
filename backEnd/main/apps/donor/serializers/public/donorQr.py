from rest_framework import serializers

from ...models.donorDetails import DonorDetails


class PublicDonorSerializer(serializers.ModelSerializer):
    donor_name = serializers.CharField(source="user.get_full_name", read_only=True)
    blood_group = serializers.CharField(source="user.blood_group", read_only=True)  # adjust if stored elsewhere

    class Meta:
        model = DonorDetails
        fields = [
            "qr_id",
            "donor_name",
            "blood_group",
            "is_available",
            "last_donation_date",
            "total_donations",
            "profile_image",
        ]
