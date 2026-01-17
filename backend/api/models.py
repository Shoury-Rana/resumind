import uuid
from django.db import models
from django.contrib.auth.models import User

class ResumeAnalysis(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='analyses')
    
    company_name = models.CharField(max_length=255, blank=True, null=True)
    job_title = models.CharField(max_length=255, blank=True, null=True)
    job_description = models.TextField(blank=True, null=True)
    
    resume_file = models.FileField(upload_to='resumes/%Y/%m/%d/')
    preview_image = models.ImageField(upload_to='previews/%Y/%m/%d/', null=True, blank=True)
    
    feedback = models.JSONField(null=True, blank=True)
    overall_score = models.IntegerField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Analysis for {self.job_title or 'Resume'} by {self.user.username}"