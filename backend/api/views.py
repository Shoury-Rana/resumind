from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import ResumeAnalysis
from .serializers import (
    UserSerializer,
    ResumeAnalysisListSerializer,
    ResumeAnalysisDetailSerializer,
    ResumeAnalysisCreateSerializer,
)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class ResumeAnalysisViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ResumeAnalysis.objects.filter(user=self.request.user).order_by('-created_at')

    def get_serializer_class(self):
        if self.action == 'list':
            return ResumeAnalysisListSerializer
        if self.action == 'create':
            return ResumeAnalysisCreateSerializer
        return ResumeAnalysisDetailSerializer 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)