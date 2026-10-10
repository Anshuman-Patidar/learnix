from rest_framework import serializers
from .models import blogModel


class blogSerializer(serializers.ModelSerializer):
    class Meta:
        model = blogModel
        fields = '__all__'
