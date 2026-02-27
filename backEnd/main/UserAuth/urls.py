from django.urls import path

from .login.loginView import (
    # HTML views
    UserLogin,
    api_check_auth,
    # API views
    api_login,
    api_logout,
    api_register,
    api_user,

)

urlpatterns = [


    # REST API routes for React
    path('api/login', api_login, name='api_login'),
    path('api/register/', api_register, name='api_register'),
    path('api/logout/', api_logout, name='api_logout'),
    path('api/user/', api_user, name='api_user'),
    path('api/check-auth/', api_check_auth, name='api_check_auth'),
]

