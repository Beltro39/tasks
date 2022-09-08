from django.urls import path
from .views import Status_APIView, TaskCRUD_APIView, TaskCRUDDetail_APIView, User_Tasks_APIView, User_TasksDetail_APIView,User_APIView

app_name = 'api'
urlpatterns = [
    path('users', User_APIView.as_view(), name='users'), 
    path('status', Status_APIView.as_view(), name='status'), 
    path('user_tasks', User_Tasks_APIView.as_view(), name='user_task'), 
    path('user_task/<int:pk>/', User_TasksDetail_APIView.as_view(), name='user_task'), 
    path('tasks', TaskCRUD_APIView.as_view(), name='tasks'), 
    path('task/<int:pk>/', TaskCRUDDetail_APIView.as_view(), name='task_detail'), 
 
]