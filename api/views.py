from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

# Create your views here.

@api_view(["GET"])
def getRoutes(request):
    """This is to show all endpoints on the home page"""
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


# /notes GET => gets all notes
# /notes POST => creates a note
# /notes/<id> GET => gets only one note
# /notes/<id> PUT => updates only one note
# /notes/<id> DELETE => deletes only one note

@api_view(["GET", "POST"])
def getNotes(request):
    """To get all notes. ''api/notes/  """
    if request.method == "GET":
        notes = Note.objects.all().order_by('-updated')
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        data = request.data #Already Json #data is json here
        # ORM
        note = Note.objects.create(body = data['body']) #'body' here is from the Json sent from the front {"body": "from django rest framework"}
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)
    



@api_view(["GET", "PUT", "DELETE"])
def getNote(request, pk):
    """To get one note using id"""
    if request.method == "GET":
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)

    if request.method == "PUT":
        data = request.data #Already Json
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance= note, data=data)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)
    
    if request.method == "DELETE":
        note = Note.objects.get(id=pk)
        note.delete()
        return Response("Note was deleted!")



# @api_view(['POST'])
# def createNote(request):
#     data = request.data #Already Json #data is json here
#     # ORM
#     note = Note.objects.create(body = data['body']) #'body' here is from the Json sent from the front {"body": "from django rest framework"}
#     serializer = NoteSerializer(note, many=False)
#     return Response(serializer.data)

# @api_view(['PUT'])
# def updateNote(request, pk):
#     data = request.data #Already Json
#     note = Note.objects.get(id=pk)
#     serializer = NoteSerializer(instance= note, data=data)

#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)

# @api_view(["DELETE"])
# def deleteNote(request, pk):
#     """To get one note using id"""
#     note = Note.objects.get(id=pk)
#     note.delete()
#     return Response("Note was deleted!")





# This also works
# @api_view(['POST'])
# def createNote(request):
#     # data = request.data #Already Json
#     serializer = NoteSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)


