from django.db import models

# Create your models here.
class courseModle(models.Model):
    title = models.CharField(max_length=200)
    poster = models.ImageField(upload_to='posters', blank=True, null=True)
    description = models.TextField()
    price = models.FloatField()
    totalstudents = models.IntegerField(default=0)

    