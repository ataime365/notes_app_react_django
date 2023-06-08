from rest_framework import serializers

from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    """Serializers takes python model objects and turns them to JSON"""
    class Meta:
        model = Note
        fields = "__all__" #instead of ("id", "body", "updated")