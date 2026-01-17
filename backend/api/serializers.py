import os
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import ResumeAnalysis
from .services import generate_preview_image, parse_pdf_to_text, get_feedback_from_gemini
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'])
        return user

class ResumeAnalysisListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeAnalysis
        fields = ('id', 'company_name', 'job_title', 'preview_image', 'overall_score', 'created_at')

class ResumeAnalysisDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeAnalysis
        fields = '__all__'
        read_only_fields = ('user',)

class ResumeAnalysisCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeAnalysis
        fields = ('id', 'resume_file', 'company_name', 'job_title', 'job_description')
        read_only_fields = ('id',)

    def create(self, validated_data):
        analysis = ResumeAnalysis.objects.create(**validated_data)
        
        pdf_full_path = analysis.resume_file.path
        pdf_relative_path = analysis.resume_file.name
        
        preview_relative_path_no_ext, _ = os.path.splitext(pdf_relative_path.replace('resumes', 'previews', 1))
        preview_relative_path = f"{preview_relative_path_no_ext}.png"
        
        preview_full_path = os.path.join(settings.MEDIA_ROOT, preview_relative_path)
        os.makedirs(os.path.dirname(preview_full_path), exist_ok=True)
        
        if generate_preview_image(pdf_full_path, preview_full_path):
            analysis.preview_image.name = preview_relative_path

        resume_text = parse_pdf_to_text(pdf_full_path)

        if resume_text:
            feedback_data = get_feedback_from_gemini(resume_text, validated_data.get('job_title', ''), validated_data.get('job_description', ''))
            if feedback_data:
                analysis.feedback = feedback_data
                analysis.overall_score = feedback_data.get('overallScore')

        analysis.save()
        return analysis