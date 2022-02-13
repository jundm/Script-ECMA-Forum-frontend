from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 30

class PostPageNumberPagination(PageNumberPagination):
    page = DEFAULT_PAGE
    page_size = DEFAULT_PAGE_SIZE
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'page_size': int(self.request.GET.get('page_size', self.page_size)),
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'current_page': int(self.request.GET.get('page', DEFAULT_PAGE)), # can not set default = self.page
            # 'current_page':int(self.page.number), #덜 유연한 코드
            'total': self.page.paginator.count,
            'last_page': self.page.paginator.num_pages,
            'results': data
        })