from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ...models.donorDetails import DonorDetails
from ...serializers.public.donorQr import PublicDonorSerializer


class PublicDonorByQrView(APIView):
    permission_classes = []  # public endpoint
    authentication_classes = []

    def get(self, request, qr_id):
        donor = get_object_or_404(DonorDetails, qr_id=qr_id, is_available=True)
        serializer = PublicDonorSerializer(donor)
        return Response(serializer.data, status=status.HTTP_200_OK)
