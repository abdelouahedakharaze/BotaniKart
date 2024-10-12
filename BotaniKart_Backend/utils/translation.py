from django.utils.translation import gettext as _
from rest_framework.views import APIView
from rest_framework.response import Response

class LanguageView(APIView):
    def get(self, request):
        return Response({
            "message": _("Hello, world!")
        })

def get_translated_fields(obj, fields):
    result = {}
    for field in fields:
        result[field] = _(getattr(obj, field))
    return result