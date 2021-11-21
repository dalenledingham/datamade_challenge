import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import ParseError


class Home(TemplateView):
    template_name = 'parserator_web/index.html'


class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        # TODO: Flesh out this method to parse an address string using the
        # parse() method and return the parsed components to the frontend.
        try:
            input_string = request.GET.get("address")
            parsed_address = AddressParse.parse(self, input_string)

            return Response(parsed_address)

        except usaddress.RepeatedLabelError:
            return Response(status=400)

    def parse(self, address):
        # TODO: Implement this method to return the parsed components of a
        # given address using usaddress: https://github.com/datamade/usaddress
        parsed_address = usaddress.tag(address)
        address_components = []

        for component in parsed_address:
            address_components.append(component)

        return address_components
