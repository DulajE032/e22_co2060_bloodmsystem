
from django.urls import path
from ..services.donorService import DonorProfileView

urlpatterns = [
    path('profile/', DonorProfileView.as_view(), name='donor-profile-dashboard'),
]
