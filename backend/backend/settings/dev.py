from .common import *


INSTALLED_APPS += [
    "debug_toolbar",
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
