from email.policy import default
from users.models import Profile
from django.db import models

class UserAlert(models.Model):
  title = models.CharField(max_length=255)
  description = models.TextField()
  category = models.CharField(max_length=255,default="")
  initiator = models.ForeignKey(Profile,on_delete=models.CASCADE)
  
  def __str__(self):
    return f"{self.title[:50]}"

class GovAlert(models.Model):
  title = models.CharField(max_length=255)
  description = models.TextField()
  initiator = models.ForeignKey(Profile,on_delete=models.CASCADE)
  
  def __str__(self):
    return f"{self.title[:50]}"