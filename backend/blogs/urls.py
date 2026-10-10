
from django.urls import path
from . import views

urlpatterns = [
    # for greet user
    path('blogs/',views.getAllBlogs),
    path('blogs/<int:id>/',views.getBlogById),
    path('addblogs/',views.addBlog),
    path('updateblog/<int:id>/',views.updateBlog),
    path('deleteblog/<int:id>/',views.deleteBlog),
]
