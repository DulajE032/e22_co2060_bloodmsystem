
from django.urls import path
from ..services.donorService import DonorProfileView
from ..services.public.donorQrService import PublicDonorByQrView
urlpatterns = [
    path('profile/', DonorProfileView.as_view(), name='donor-profile-dashboard'),
path("public/<uuid:qr_id>/", PublicDonorByQrView.as_view(), name="public-donor-by-qr")
]
