from .common import *

# django-debug-toolbar https://django-debug-toolbar.readthedocs.io/en/latest/
# django-extensions https://django-extensions.readthedocs.io/en/latest/installation_instructions.html
# drf-yasg https://drf-yasg.readthedocs.io/en/stable/readme.html#usage

INSTALLED_APPS += [
    "debug_toolbar",
    "django_extensions",
    "drf_yasg",
]
MIDDLEWARE = [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
] + MIDDLEWARE
INTERNAL_IPS = ["127.0.0.1"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
SWAGGER_SETTINGS = {
    "LOGIN_URL": "/admin/login",
    "USE_SESSION_AUTH": True,
    "SECURITY_DEFINITIONS": {
        # 'Token': {'type': 'apiKey', 'name': 'Authorization', 'in': 'header'}, # 토큰 사용시
        # "basic": {
        #     "type": "basic", # id, password 그러나 셋팅을 바꿔야할듯
        # },
        "JWT": {"type": "apiKey", "name": "Authorization", "in": "header"},
    },
    "JSON_EDITOR": True,
    "SHOW_REQUEST_HEADERS": True,
    "OPERATIONS_SORTER": "alpha",
    "PERSIST_AUTH": True,
}
