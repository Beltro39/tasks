from os import stat
from rest_framework import serializers
from .models import User, Status, User_Task, Task
class UserSerializer(serializers.ModelSerializer):
    value= serializers.ReadOnlyField(source='id')
    label= serializers.ReadOnlyField(source='name')
    class Meta:
        model = User
        fields= "__all__"
 
class UserSerializerID(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = User
        fields = ['id']
        
class TaskCRUDSerializer(serializers.ModelSerializer):
    author = UserSerializerID(many=True)
    title = serializers.CharField(max_length=200)
    description = serializers.CharField(max_length=200)
    initial_date= serializers.DateField()
    final_date = serializers.DateField()
    class Meta:
        model = Task
        fields = ['id','author', 'title', 'description', 'initial_date', 'final_date', 'author']   
        
    def to_internal_value(self, data):
        if data.get('author', None) == []:
            data.pop('author')
        return super(TaskCRUDSerializer, self).to_internal_value(data)
         
    def create(self, validated_data):
        user_tasks_data = validated_data.pop('author')
        print('*****************')
        print(validated_data)
        task= Task.objects.create(**validated_data)
        for user_task_data in user_tasks_data:
            first_status = Status.objects.order_by('order')[0]
            print(task)
            print(first_status)
            print(user_tasks_data)
            print(user_task_data.items())
            for key, value in user_task_data.items():
                #user= User.objects.get(value)
                print(value)
                user= User.objects.get(id= value)
                User_Task.objects.create(task= task, user= user,status=first_status)
            
        return task
    
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["title", "description", "initial_date", "final_date"]      
    
class User_TaskSerializer(serializers.ModelSerializer):
    user= UserSerializer()
    task= TaskSerializer()  
    class Meta:
        model = User_Task
        fields = "__all__"
        
class User_TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Task
        fields = ["id",  "created_at", "finished_at", "status"]   
        
class StatusSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100)
    user_tasks= User_TaskSerializer(many=True, read_only=True)
    class Meta:
        model = Status
        fields = ['id','order','name', 'user_tasks']