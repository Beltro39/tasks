#from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404

from .models import Task, Status, User, User_Task
from .serializers import UserSerializer, StatusSerializer, User_TaskSerializer, TaskCRUDSerializer, TaskSerializer, User_TaskUpdateSerializer

class User_APIView(APIView):

    def get(self, request, format=None, *args, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

""" 

  
class User_tasks_APIView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        user_tasks = User_Task.objects.all()
        serializer = User_TaskSerializer(user_tasks, many=True)
        return Response(serializer.data)   
"""      

class Status_APIView(APIView):

    def get(self, request, format=None, *args, **kwargs):
        status = Status.objects.all()
        serializer = StatusSerializer(status, many=True)
        return Response(serializer.data)    
    
class TaskCRUD_APIView(APIView):    
    def get(self, request, format=None, *args, **kwargs):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)   
    
    def post(self, request, format=None):
        serializer = TaskCRUDSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
class TaskCRUDDetail_APIView(APIView):
    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = TaskCRUDSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        task = self.get_object(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    
    
class User_Tasks_APIView(APIView):         
    def get(self, request, format=None, *args, **kwargs):
        user_tasks = User_Task.objects.all()
        serializer = User_TaskSerializer(user_tasks, many=True)
        return Response(serializer.data)      
    
class User_TasksDetail_APIView(APIView):    
    def get_object(self, pk):
        try:
            return User_Task.objects.get(pk=pk)
        except User_Task.DoesNotExist:
            raise Http40
        
    def get(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = User_TaskSerializer(task)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        user_task = self.get_object(pk)
        serializer = User_TaskUpdateSerializer(user_task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        user_task = self.get_object(pk)
        user_task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    

    
    