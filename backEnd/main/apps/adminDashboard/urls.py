from apps.medicalOfficers.services.docterViews.doctor_management import DoctorViewSet
from django.urls import path

from .serviceses.staffService import StaffList, StaffManageApiView, getTotalStaff

# Map DoctorViewSet to specific paths for frontend compatibility
doctor_list = DoctorViewSet.as_view({'get': 'list'})
doctor_create = DoctorViewSet.as_view({'post': 'create'})
doctor_detail = DoctorViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
doctor_credentials = DoctorViewSet.as_view({'post': 'create_credentials'})
doctor_reset_password = DoctorViewSet.as_view({'post': 'reset_password'})
doctor_message = DoctorViewSet.as_view({'post': 'send_message'})
doctor_stats = DoctorViewSet.as_view({'get': 'stats'})

urlpatterns = [
    # Doctor Management
    path("doctors/list/", doctor_list, name="doctor_list"),
    path("doctor/create/", doctor_create, name="create_doctor"),
    path("doctor/profile/<int:pk>/", doctor_detail, name="doctor_detail"),
    path("doctors/<int:pk>/create-credentials/", doctor_credentials, name="doctor_credentials"),
    path("doctors/<int:pk>/reset-password/", doctor_reset_password, name="doctor_reset_password"),
    path("doctors/<int:pk>/send-message/", doctor_message, name="doctor_message"),
    path("doctor/total/", doctor_stats, name="doctor_total"),

    # Staff Management
    path("staff/profile/<int:id>/", StaffManageApiView.as_view(), name="staff_profile_manage"),
    path("staff/list/", StaffList.as_view(), name="staff_list"),
    path("staff/total/", getTotalStaff, name="staff_total"),
]
