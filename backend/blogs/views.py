from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import blogModel
from .serializer import blogSerializer


@api_view(['GET'])
def getAllBlogs(request):
    blogs = blogModel.objects.all()
    serializer = blogSerializer(blogs, many=True)
    return Response({
        'status': 'success',
        'totalBlogs': blogs.count(),
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def getBlogById(request, id):
    try:
        blog = blogModel.objects.get(id=id)
    except blogModel.DoesNotExist:
        return Response({
            'status': 'error',
            'massage': 'Blog not found'
        }, status=status.HTTP_404_NOT_FOUND)
    serializer = blogSerializer(blog)
    return Response({
        'status': 'success',
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def addBlog(request):
    serializer = blogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'status': 'success',
            'massage': 'Blog added successfully',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'status': 'error',
        'massage': 'Invalid data',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateBlog(request, id):
    try:
        blog = blogModel.objects.get(id=id)
    except blogModel.DoesNotExist:
        return Response({
            'status': 'error',
            'massage': 'Blog not found'
        }, status=status.HTTP_404_NOT_FOUND)
    serializer = blogSerializer(blog, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'status': 'success',
            'massage': 'Blog updated successfully',
            'data': serializer.data
        })
    return Response({
        'status': 'error',
        'massage': 'Invalid data',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteBlog(request, id):
    try:
        blog = blogModel.objects.get(id=id)
    except blogModel.DoesNotExist:
        return Response({
            'status': 'error',
            'massage': 'Blog not found'
        }, status=status.HTTP_404_NOT_FOUND)
    blog.delete()
    return Response({
        'status': 'success',
        'massage': 'Blog deleted successfully'
    })
