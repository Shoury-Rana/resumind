from django.contrib import admin

# Register your models here.

from .models import ResumeAnalysis
@admin.register(ResumeAnalysis)
class ResumeAnalysisAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'company_name', 'job_title', 'overall_score', 'created_at')
    search_fields = ('company_name', 'job_title', 'user__username', 'user__email')
    list_filter = ('created_at',)