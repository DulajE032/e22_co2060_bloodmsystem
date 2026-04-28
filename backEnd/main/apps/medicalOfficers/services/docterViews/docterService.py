#docter can change their profile pic



from rest_framework import generics, parsers
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from ...serializers.request.docterRequest import Imagechange


class UpdateDoctorImageView(generics.UpdateAPIView):
    serializer_class = Imagechange
    permission_classes = [IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get_object(self):
        user = self.request.user

        if not hasattr(user, "doctor_profile"):
            raise NotFound("Doctor profile not found")

        return user.doctor_profile

