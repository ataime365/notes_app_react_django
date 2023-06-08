from django.db import models

# Create your models here.
class Note(models.Model):
    # pk
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True) #auto_now  updates the timestamp each time we save
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """Getting the first 50 characters for the string representation"""
        return self.body[0:50]
