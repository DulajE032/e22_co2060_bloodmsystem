from rest_framework import serializers
from ...models.doctor import Doctor

class Imagechange(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('profilePhoto',)
