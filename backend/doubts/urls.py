from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.urls import path
from utils import askAi as Myai

@api_view(['POST'])
def askAI(request):
   question= request.data.get('question')
   res=Myai.askAi(question)
   return Response({
    'status':'success',
    'message':'Ask AI successfully',
    'data':res
   },status=status.HTTP_200_OK)



urlpatterns = [
    # for greet user
    path('ask',askAI),
    path('ask/',askAI)
]