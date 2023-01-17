from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    name = models.TextField(max_length=200)

    def __str__(self):
        return self.name

class Photo(models.Model):
    photo = models.ImageField(upload_to='media/api/images/', default=None)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    date = models.DateField()
    time = models.TimeField(blank=True, null=True)
    location = models.ForeignKey(Location, on_delete=models.PROTECT)