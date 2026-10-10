from django.db import models

# Create your models here.
class blogModel(models.Model):
    type_choices = [
        ('Tech', 'Tech'),
        ('Non_Tech', 'Non_Tech'),
        ('Job', 'Job'),
    ]
    title = models.CharField(max_length=200)
    poster = models.ImageField(upload_to='posters', blank=True, null=True)
    content = models.TextField()
    type = models.CharField(max_length=20, choices=type_choices, default='Tech')

    
    