"""
URL configuration for main project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include



urlpatterns = [
    path('admin/', admin.site.urls),
    path('owner/',include('Admin.urls')),
    path('appointment/',include('Appointment.urls')),
    path('inventory/',include('BloodInventory.urls')),
    path('BRequest/',include('BloodRequest.urls')),
    path('host/',include('CampHost.urls')),
    path('volunteers/',include('CampVolunteers.urls')),
    path('Certificate/',include('Certificate.urls')),
    path('Donationcamp/',include('DonationCamp.urls')),
    path('Donationrecord/',include('DonationRecord.urls')),
    path('Donor/',include('Donor.urls')),
    path('Donationcamp/',include('DonationCamp.urls')),


]
