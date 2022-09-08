from django.conf import settings
from django.db import models
from django.utils import timezone

class Status(models.Model):
    name = models.CharField(max_length=100)
    order = models.IntegerField(null=True)
    
    def __str__(self):
        return self.name
    
class User(models.Model):    
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
        
class Task(models.Model):
    author = models.ManyToManyField(User,through='User_Task')
    title = models.CharField(max_length=200)
    description = models.TextField()
    initial_date = models.DateTimeField()
    final_date = models.DateTimeField()
    
    def __str__(self):
        return self.title
    
class User_Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    status= models.ForeignKey(Status,related_name='user_tasks', on_delete=models.CASCADE)    
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    finished_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return "{}_{}".format(self.task.__str__(), self.user.__str__())
    