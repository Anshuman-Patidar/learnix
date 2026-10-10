from .models import courseModle
from rest_framework.serializers import ModelSerializer


class courseSerializer(ModelSerializer):
    class Meta:
        model = courseModle
        fields = '__all__'

