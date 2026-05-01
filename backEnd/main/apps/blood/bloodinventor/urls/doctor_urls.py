from django.urls import path

from ..services.doctor import doctor_request_service

urlpatterns = [
    path('requests/', doctor_request_service.doctor_blood_requests, name='doctor_blood_requests'),
]
