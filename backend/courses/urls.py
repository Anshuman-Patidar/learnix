
from django.urls import path
from . import views

urlpatterns = [
    # for greet user
    path('',views.greetUser),
    path('greet/',views.greetUser),


    # for courses
    path('getcourses/', views.getAllCourses),
    path('getcourse/<int:id>/', views.getCourseById),
    path('addcourse/', views.addCourse),
    path('updatecourse/<int:id>/', views.updateCourse),
    path('deletecourse/<int:id>/', views.deleteCourse),
]
