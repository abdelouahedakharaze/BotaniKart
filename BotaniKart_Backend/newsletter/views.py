from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Subscriber, Newsletter
from .serializers import SubscriberSerializer, NewsletterSerializer
from django.core.mail import send_mass_mail
from django.utils import timezone

class SubscribeView(generics.CreateAPIView):
    serializer_class = SubscriberSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"message": "Successfully subscribed to the newsletter"}, status=status.HTTP_201_CREATED, headers=headers)

class UnsubscribeView(generics.DestroyAPIView):
    queryset = Subscriber.objects.all()
    lookup_field = 'email'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Successfully unsubscribed from the newsletter"}, status=status.HTTP_200_OK)

class CreateNewsletterView(generics.CreateAPIView):
    serializer_class = NewsletterSerializer
    permission_classes = [permissions.IsAdminUser]

class SendNewsletterView(generics.UpdateAPIView):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        newsletter = self.get_object()
        active_subscribers = Subscriber.objects.filter(is_active=True)
        
        messages = [(
            newsletter.title,
            newsletter.content,
            'noreply@example.com',
            [subscriber.email]
        ) for subscriber in active_subscribers]

        send_mass_mail(messages, fail_silently=False)
        
        newsletter.sent_at = timezone.now()
        newsletter.save()

        return Response({"message": f"Newsletter sent to {len(messages)} subscribers"}, status=status.HTTP_200_OK)