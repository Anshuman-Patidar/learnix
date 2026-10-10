from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import courseModle
from .serializer import courseSerializer


@api_view(['GET'])
def greetUser(request):
    return Response({
        'status': "success",
        'massage': 'welcom to our website learnix',
        'data': {
            'massage': 'Hello User',
            'status': 'happy',
        }
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllCourses(request):
    courses = courseModle.objects.all()
    serializer = courseSerializer(courses, many=True)
    return Response({
        'status': "success",
        'massage': 'Get all courses successfully',
        'totalCourses': courses.count(),
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def getCourseById(request, id):
    try:
        course = courseModle.objects.get(id=id)
    except courseModle.DoesNotExist:
        return Response({
            'status': "error",
            'massage': 'Course not found',
            'data': None
        }, status=status.HTTP_404_NOT_FOUND)
    serializer = courseSerializer(course)
    return Response({
        'status': "success",
        'massage': 'Get course successfully',
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def addCourse(request):
    serializer = courseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'status': 'success',
            'massage': 'Course added successfully',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'status': 'error',
        'massage': 'Invalid data',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateCourse(request, id):
    try:
        course = courseModle.objects.get(id=id)
    except courseModle.DoesNotExist:
        return Response({
            'status': 'error',
            'massage': 'Course not found'
        }, status=status.HTTP_404_NOT_FOUND)
    serializer = courseSerializer(course, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'status': 'success',
            'massage': 'Course updated successfully',
            'data': serializer.data
        })
    return Response({
        'status': 'error',
        'massage': 'Invalid data',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteCourse(request, id):
    try:
        course = courseModle.objects.get(id=id)
    except courseModle.DoesNotExist:
        return Response({
            'status': 'error',
            'massage': 'Course not found'
        }, status=status.HTTP_404_NOT_FOUND)
    course.delete()
    return Response({
        'status': 'success',
        'massage': 'Course deleted successfully'
    })
