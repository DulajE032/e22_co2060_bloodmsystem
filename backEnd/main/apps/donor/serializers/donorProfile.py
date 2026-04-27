from rest_framework import serializers
from apps.UserAuth.models.hospital import Hospital
from ..models.donorDetails import DonorDetails


class DonorProfileSerializer(serializers.ModelSerializer):
    fullName = serializers.SerializerMethodField()
    nic_number = serializers.SerializerMethodField()
    blood_group = serializers.SerializerMethodField()
    phoneNumber = serializers.SerializerMethodField()
    country = serializers.SerializerMethodField()
    district = serializers.SerializerMethodField()
    hospital = serializers.SerializerMethodField()
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = DonorDetails
        fields = [
            "fullName",
            "nic_number",
            "blood_group",
            "phoneNumber",
            "country",
            "district",
            "hospital",
            "is_available",
            "total_donations",
            "last_donation_date",
            "total_events",
            "achievements",
            "profile_image",
            "qr_id",
        ]

    def _profile(self, obj):
        return getattr(obj.user, "profile", None)

    def get_fullName(self, obj):
        profile = self._profile(obj)
        return getattr(profile, "fullName", None)

    def get_nic_number(self, obj):
        profile = self._profile(obj)
        return getattr(profile, "nic_number", None)

    def get_blood_group(self, obj):
        profile = self._profile(obj)
        return getattr(profile, "blood_group", None)

    def get_phoneNumber(self, obj):
        profile = self._profile(obj)
        value = getattr(profile, "phoneNumber", None)
        return str(value) if value else None

    def get_country(self, obj):
        profile = self._profile(obj)
        country = getattr(profile, "country", None) if profile else None
        return getattr(country, "countryName", None)

    def get_district(self, obj):
        profile = self._profile(obj)
        district = getattr(profile, "district", None) if profile else None
        return getattr(district, "districtName", None)

    def get_hospital(self, obj):
        profile = self._profile(obj)
        hospital = getattr(profile, "hospital", None) if profile else None
        return getattr(hospital, "hosName", None)

    def get_profile_image(self, obj):
        if not obj.profile_image:
            return None

        request = self.context.get("request")
        image_url = obj.profile_image.url
        return request.build_absolute_uri(image_url) if request else image_url


class DonorProfileUpdateSerializer(serializers.ModelSerializer):
    phoneNumber = serializers.CharField(required=False, allow_blank=True, write_only=True)
    hospital = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = DonorDetails
        fields = ["phoneNumber", "hospital", "profile_image", "is_available"]

    def validate_hospital(self, value):
        hospital_value = value.strip()
        if not hospital_value:
            return None

        if hospital_value.isdigit():
            try:
                return Hospital.objects.get(pk=int(hospital_value))
            except Hospital.DoesNotExist as exc:
                raise serializers.ValidationError("Hospital id not found") from exc

        hospital = Hospital.objects.filter(hosName__iexact=hospital_value).first()
        if not hospital:
            raise serializers.ValidationError("Hospital not found")

        return hospital

    def update(self, instance, validated_data):
        phone_number = validated_data.pop("phoneNumber", serializers.empty)
        hospital = validated_data.pop("hospital", serializers.empty)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        profile = getattr(instance.user, "profile", None)
        if profile:
            profile_update_fields = []

            if phone_number is not serializers.empty:
                profile.phoneNumber = phone_number or None
                profile_update_fields.append("phoneNumber")

            if hospital is not serializers.empty:
                profile.hospital = hospital
                profile_update_fields.append("hospital")

            if profile_update_fields:
                profile.save(update_fields=profile_update_fields)

        return instance
